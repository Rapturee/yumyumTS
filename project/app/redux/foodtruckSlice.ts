"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../types/index";
import type { Wonton, Dip, Drink, Order, ReceiptItem } from "../types/index";

const API_KEY = "yum-tBCC15CdlDcqTJ4b";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const fetchProductsByType = createAsyncThunk(
  "products/fetchProductsByType",
  async (type: "wonton" | "dip" | "drink") => {
    const urlMap = {
      wonton:
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=wonton",
      dip: "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=dip",
      drink:
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=drink",
    };

    try {
      const response = await fetch(urlMap[type], {
        method: "GET",
        headers: { "x-zocom": `${API_KEY}` },
      });

      if (!response.ok) {
        throw new Error("response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return { type, data: data.items };
    } catch (error) {
      console.error("There was a problem fetching data:", error);
      throw error;
    }
  }
);

export const SubmitOrder = createAsyncThunk<Order, ReceiptItem[]>(
  "order/submitOrder",
  async (items: ReceiptItem[], { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/xbkk/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
          body: JSON.stringify({ items: items.map((item) => item.id) }),
        }
      );
      if (!response.ok) {
        throw new Error("Faield to submit order");
      }
      const data = await response.json();
      console.log("Submit order response:", data); // Kontrollera vad API-svaret innehåller
      console.log("submit data: " + JSON.stringify(data));
      return data.order as Order;
    } catch (error) {
      console.error("Failed to submit order:", error);
      return rejectWithValue("Failed to submit order");
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/xbkk/orders/${orderId}`,
        {
          headers: { "Content-Type": "application/json", "x-zocom": API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error("Error fetchinig order:", error);
      return rejectWithValue("Failed to fetch order data");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    wontons: [] as Wonton[],
    dips: [] as Dip[],
    drinks: [] as Drink[],
    order: [] as ReceiptItem[],
    orderId: null as string | null,
    orderDetails: null as Order | null,
    status: "idle",
    error: null as string | null,
  },
  reducers: {
    addToOrder: (state, action: PayloadAction<Wonton | Dip | Drink>) => {
      const existingItem = state.order.find(
        (item) =>
          item.id === action.payload.id && item.type === action.payload.type
      );
      console.log("Adding to order:", action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.order.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.order.find((product) => product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.order.find((product) => product.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.order = state.order.filter(
            (product) => product.id !== action.payload
          );
        }
      }
    },
    removeFromOrder: (state, action: PayloadAction<number>) => {
      state.order = state.order.filter(
        (product) => product.id !== action.payload
      );
    },
    clearOrder: (state) => {
      state.order = [];
    },
    placeOrder: (state) => {
      if (state.order.length > 0) {
        const newOrder: Order = {
          id: String(new Date().getTime()), // unikt ID för ordern
          items: [...state.order],
          orderValue: state.order.reduce(
            (total, item) => total + item.price,
            0
          ),
          eta: 20,
          timestamp: new Date().toISOString(),
          state: OrderState.Done,
        };

        state.order = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { type, data } = action.payload;
        if (type === "wonton") {
          state.wontons = data;
        } else if (type === "dip") {
          state.dips = data;
        } else if (type === "drink") {
          state.drinks = data;
        }
      })
      .addCase(fetchProductsByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        console.log("Fetched order details:", action.payload);
        state.status = "succeeded";
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(SubmitOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderId = action.payload.id; // Sätt orderId från API-svaret
      })
      .addCase(SubmitOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const {
  addToOrder,
  removeFromOrder,
  placeOrder,
  incrementQuantity,
  decrementQuantity,
  clearOrder,
} = productsSlice.actions;

export default productsSlice.reducer;
