# Paska Ovo

![Paska](./img/paska-logo.png)

A simple javascript library for adding easter eggs to web pages

[![JSR](https://jsr.io/badges/@egamagz/paska-ovo)](https://jsr.io/@egamagz/paska-ovo)
![GitHub License](https://img.shields.io/github/license/egamagz/paska-ovo)
![GitHub Release](https://img.shields.io/github/v/release/egamagz/paska-ovo)

## Installation

### For Deno

```bash
deno add @egamagz/paska-ovo
```

### For Node.js

```bash
npx jsr add @egamagz/paska-ovo
```

### For Bun

```bash
bunx jsr add @egamagz/paska-ovo
```

### For other package managers

Check the [JSR page for more details](https://jsr.io/@egamagz/paska-ovo).

## Example

```typescript
import { HistoricalCodes, PaskaOvo } from "@egamagz/paska-ovo";

const paskaOvo = new PaskaOvo()
  .addCallback((easterEgg) => {
    console.log("Actual easter egg:", easterEgg.tag);
    console.log("Easter egg's code:", easterEgg.code);
  })
  .addCode(
    HistoricalCodes.Iddqd,
    () => {
      alert("God Mode");
    },
    "Doom",
  )
  .addCode("left,up,right,down", () => {
    alert("Do a Barrel Roll");
  }, "Barrel Roll");

// Listen to keyboard events
document.getElementById("add-easter-egg")
  .addEventListener("click", () => {
    paskaOvo.listen();
  });

// Stop listening to keyboard events
document.getElementById("remove-easter-egg")
  .addEventListener("click", () => {
    paskaOvo.stop();
  });

```

Alternatively, it's possible to define the easter egg using the constructor:

```typescript
import { HistoricalCodes, PaskaOvo } from "@egamagz/paska-ovo";

const paskaOvo = new PaskaOvo(
  HistoricalCodes.Konami,
  () => {
    alert("Gradius");
  },
  "konami-code",
)
  .addCallback((easterEgg) => {
    console.log("Actual easter egg:", easterEgg.tag);
    console.log("Easter egg's code:", easterEgg.code);
  });

paskaOvo.listen();
```

Check the [example](https://egamagz.github.io/paska-ovo/) with [source code](https://github.com/EGAMAGZ/paska-ovo/tree/master/example).

## Credits

Inspired by the project [Egg.js](https://github.com/mikeflynn/egg.js) and [La Velada Web](https://github.com/midudev/la-velada-web-oficial). Created by [EGAMAGZ](https://github.com/EGAMAGZ).

## License

MIT License
