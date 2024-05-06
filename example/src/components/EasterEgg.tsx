import { useSignal, useSignalEffect } from "@preact/signals";
import { PaskaOvo, HistoricalCodes } from "@/../../mod";
import Title from "./Title";

enum EasterEggStatus {
    None,
    Konami,
    Awesome,
    BarrelRoll
}

export default function EasterEgg() {
    const easterEggStatus = useSignal(EasterEggStatus.None);

    useSignalEffect(() => {
        const paskaOvo = new PaskaOvo()
            .addCode({
                code: HistoricalCodes.BarrelRoll,
                onFound: () => {
                    easterEggStatus.value = EasterEggStatus.BarrelRoll
                },
                onFinish() {
                    easterEggStatus.value = EasterEggStatus.None
                },
                duration: 1000,
                tag: "Barrel Roll"
            })
            .addCode({
                code: HistoricalCodes.Konami,
                onFound: () => {
                    easterEggStatus.value = easterEggStatus.peek() === EasterEggStatus.Konami ? EasterEggStatus.None : EasterEggStatus.Konami
                },
                tag: "Konami"
            })
            .addCode({
                code: ["a", "w", "e", "s", "o", "m", "e"],
                onFound: () => {
                    easterEggStatus.value = easterEggStatus.peek() === EasterEggStatus.Awesome ? EasterEggStatus.None : EasterEggStatus.Awesome
                },
                tag: "Awesome"
            })
            .addCallback((easterEgg) => {
                alert(`You found the easter egg: ${easterEgg.tag}`)
            });

        paskaOvo.listen();

        return () => {
            paskaOvo.stop();
        }
    })

    return (
        <div class={`w-96 h-48 transition-all ${easterEggStatus.value === EasterEggStatus.Awesome ? "rainbow-border p-2" : ""} ${easterEggStatus.value === EasterEggStatus.BarrelRoll ? "animate-spin" : ""}`}>
            <Title showKonami={easterEggStatus.value === EasterEggStatus.Konami} />
        </div>
    );
}