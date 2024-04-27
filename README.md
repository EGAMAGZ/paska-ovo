# Paska Ovo

A simple javascript library for adding easter eggs to web pages

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

```javascript
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
  })
  .addCode(
    HistoricalCodes.Iddqd,
    () => {
      alert("God Mode");
    },
    "doom",
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

## Credits

Inspired by the project [Egg.js](https://github.com/mikeflynn/egg.js). Created by [EGAMAGZ](https://github.com/EGAMAGZ).

## License

MIT License
