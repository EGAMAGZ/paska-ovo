export type EasterEgg = {
    code: string,
    fn: () => void,
    tag: string
};

export type Callback = (activeEasterEgg: EasterEgg) => void;