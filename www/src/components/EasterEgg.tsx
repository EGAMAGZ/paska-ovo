import { useSignal, useSignalEffect } from "@preact/signals";
import { type EasterEgg, HistoricalCodes, PaskaOvo } from "@/../../mod";
import Title from "./Title";

enum EasterEggStatus {
  None,
  Konami,
  Awesome,
  BarrelRoll,
}

export default function EasterEgg() {
  const easterEggStatus = useSignal(EasterEggStatus.None);

  useSignalEffect(() => {
    const paskaOvo = new PaskaOvo()
      .addEasterEgg({
        code: ["4", "1", "8"],
        onFound: () => {
          throw new Error("418 - I'm a teapot");
        },
        tag: "Example",
      })
      .addEasterEgg({
        code: HistoricalCodes.BarrelRoll,
        onFound: () => {
          easterEggStatus.value = EasterEggStatus.BarrelRoll;
        },
        onFinish() {
          easterEggStatus.value = EasterEggStatus.None;
        },
        duration: 1000,
        tag: "Barrel Roll",
      })
      .addEasterEgg({
        code: HistoricalCodes.Konami,
        onFound: () => {
          easterEggStatus.value =
            easterEggStatus.peek() === EasterEggStatus.Konami
              ? EasterEggStatus.None
              : EasterEggStatus.Konami;
        },
        tag: "Konami",
      })
      .addEasterEgg({
        code: [
          "up",
          "up",
          "down",
          "down",
          "left",
          "right",
          "left",
          "right",
          "b",
          "a",
          "c",
        ],
        onFound: () => {
          alert("Nothing to show here... Sorry :(");
        },
        tag: "Konami+C",
      })
      .addEasterEgg({
        code: ["a", "w", "e", "s", "o", "m", "e"],
        onFound: () => {
          easterEggStatus.value =
            easterEggStatus.peek() === EasterEggStatus.Awesome
              ? EasterEggStatus.None
              : EasterEggStatus.Awesome;
        },
        tag: "Awesome",
      })
      .addCallback((easterEgg: EasterEgg) => {
        alert(`You found the easter egg: ${easterEgg.tag}`);
      });

    paskaOvo.listen();

    return () => {
      paskaOvo.stop();
    };
  });

  return (
    <div
      class={`w-96 h-48 transition-all ${
        easterEggStatus.value === EasterEggStatus.Awesome
          ? "rainbow-border p-2"
          : ""
      } ${
        easterEggStatus.value === EasterEggStatus.BarrelRoll
          ? "animate-spin"
          : ""
      }`}
    >
      <Title showKonami={easterEggStatus.value === EasterEggStatus.Konami} />
    </div>
  );
}
