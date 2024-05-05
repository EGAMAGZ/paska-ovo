import { useSignal, useSignalEffect, useComputed } from "@preact/signals";
import { PaskaOvo, HistoricalCodes } from "@/../../mod";
import Title from "./Title";

export default function EasterEgg() {
    const isSpinning = useSignal(false);
    const isKonami = useSignal(false);
    const isAwesome = useSignal(false);

    useSignalEffect(() => {
        const paskaOvo = new PaskaOvo()
            .addCode({
                code: HistoricalCodes.BarrelRoll,
                onFound: () => {
                    isSpinning.value = true
                },
                onFinish() {
                    isSpinning.value = false
                },
                duration: 1000,
                tag: "Barrel Roll"
            })
            .addCode({
                code: ["b", "a"],
                onFound: () => {
                    isKonami.value = !isKonami.value
                },
                tag: "Konami"
            })
            .addCode({
                code: ["a", "w", "e", "s", "o", "m", "e"],
                onFound: () => {
                    isAwesome.value = !isAwesome.value
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
        <div class="w-screen h-screen bg-red-300 flex flex-col justify-center items-center relative">
            <div class={`w-96 h-48 transition-all ${isAwesome.value ? "rainbow-border p-2" : ""}`}>
                <Title spinning={isSpinning.value} konami={isKonami.value} />
            </div>
            <span class="text-3xl font-thin">Find the easter eggs!</span>
        </div>
    );
}