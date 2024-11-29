![poster](./poster.jpg)

# Individuell examination - Yum Yum Gim Mie Sum Foodtruck

Foodtrucken **Yum Yum Gim Mi Sum** har växt ur sitt tidigare analoga ordersystem ( sk. Post-its ), och vill nu ta klivet in i 2000-talet med ett modernt ordersystem i webbapplikationsform.

**Grattis!** Du har blivit anlitad som frontendutvecklare i teamet som tagit sig an detta uppdrag.

_Design_ och _backend_ är klara, och det är nu dags för dig att ta över och work your frontend magic!

## Kravspecifikation

För betyget godkänt ska er inlämning följa nedan krav:

- Applikationen ska se ut och fungera enligt specifikation ( mockup )
- Behöver endast vara anpassad för interaktion via mobilskärm
- Byggd med React ( alt. Next ) med _Typescript_
- Typade `modeller` som används ( finns dokumenterade i API:et )
- Typade props
- Typade events
- Inga `any`

_Förväntad tidsåtgång:_ ca **32h**.

> [!IMPORTANT]
> Du ska ["forka"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) detta repo och använda som inlämning. Använd den tomma mappen [project](./project) för ditt projekt.

## Assets

**Design och UX:aren** har utifrån sina samtal och process med Yum Yums VD samt användartester kommit fram till en design ni ska hålla er till.

[Här finns en Figma-mockup](https://www.figma.com/design/KPgi0MtbAGhkpSRrjyKOW8/Yum-yum-gimmi-sum?node-id=0-1&t=yMERp4Gfa6h5W1o4-1) hur applikationens olika vyer skall se ut.

I mappen [assets](./assets/) finns de exporterade assets som behövs.

## API

**Backendutvecklaren** har utvecklat ett API för applikationens backend. Detta API behöver er frontend prata sömlöst med.

API-specifikationen hittar ni på följande adress:

```
http://yumyum-assets.s3-website.eu-north-1.amazonaws.com/
```

API:et har följande basadress:

```
https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com
```

Samtliga anrop till API:et behöver en nyckel som ni kan hämta via `/keys` routen. Denna behöver ligga med i headern `x-zocom` vid varje anrop.

> [!NOTE]
> Yum yum har **flera** Food trucks, så varje food truck behöver registereras. En sk `tenant`. När ni gjort det får ni ett unikt ID som knyter just er Food truck till specifika beställningar.

## Inlämning och presentation

Inlämning sker **senast kl. 23.59, fredag 15 nov** via github ( pushat till ditt forkade repo ).

Din webbapplikation ska presenteras för beställaren ( läraren ) på fredag.
Din presentation ska vara ca 5 minuter och innehålla följande punkter:

- Din fungerade app ( samtliga vyer )
- Ev. VG-vy ( kvitto )
- Kort om vad du lärt dig i denna kurs / under examinationen

## Bedömning

**Godkänt**

Uppfyllt och genomfört uppgiftens samtliga krav ( givna i kravspec ).

**Väl Godkänt**

Utöver G-krav, även har en fungerande kvitto-vy med i sin applikation ( se figma mockup ).
