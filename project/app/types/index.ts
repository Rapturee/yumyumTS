export type WontonType = "wonton" | "dip" | "drink";

export type Wonton = {
  id: number;
  type: WontonType;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
};

export type Dip = {
  id: number;
  type: WontonType;
  name: string;
  description: string;
  price: number;
};

export type Drink = {
  id: number;
  type: WontonType;
  name: string;
  description: string;
  price: number;
};

export type Products = {
  wontons: Wonton[];
  dips: Dip[];
  drinks: Drink[];
};

export type Additions = Exclude<
  CategoriesContainerProps["products"][number],
  Wonton
>;

export type AdditionsContainerProps = {
  title: string;
  products: Additions[];
};

export type Order = {
  id: string;
  items: (Wonton | Dip | Drink)[];
  orderValue: number;
  eta: number;
  timestamp: string;
  state: OrderState;
};

export type ReceiptItem = (Wonton | Dip | Drink) & { quantity: number };

export type Receipt = {
  id: string;
  orderValue: number;
  timestamp: string;
  items: ReceiptItem[];
};

export type CategoriesContainerProps = {
  title: string;
  products: (Wonton | Dip | Drink)[];
};

export type CartModalProps = {
  onClose: () => void;
};

// ENUMS
export enum OrderState {
  Waiting = "waiting",
  Processing = "processing",
  Done = "done",
}
