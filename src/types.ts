export type EasterEgg = {
    code: string,
    callable: () => void,
    tag: string
};

export type Callback = (activeEasterEgg: EasterEgg) => void;