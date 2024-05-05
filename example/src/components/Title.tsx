interface Props {
    spinning: boolean
    konami: boolean
}

export default function Title({ spinning, konami }: Props) {
    return (
        <svg width="100%" height="100%" viewBox="0 0 33 11" class={`transition-all ${spinning ? "animate-spin" : ""}`} alt="Paska Ovo Logo">
            {/* P */}
            <g fill="black">
                <rect x="0" y="0" width="1" height="1"></rect>
                <rect x="0" y="1" width="1" height="1"></rect>
                <rect x="0" y="2" width="1" height="1"></rect>
                <rect x="0" y="3" width="1" height="1"></rect>
                <rect x="0" y="4" width="1" height="1"></rect>
                <rect x="1" y="0" width="1" height="1"></rect>
                <rect x="2" y="0" width="1" height="1"></rect>
                <rect x="1" y="2" width="1" height="1"></rect>
                <rect x="2" y="2" width="1" height="1"></rect>
                <rect x="3" y="1" width="1" height="1"></rect>
            </g>
            {/* A */}
            <g fill="black">
                <rect x="6" y="0" width="1" height="1"></rect>
                <rect x="7" y="0" width="1" height="1"></rect>
                <rect x="5" y="1" width="1" height="1"></rect>
                <rect x="5" y="2" width="1" height="1"></rect>
                <rect x="6" y="2" width="1" height="1"></rect>
                <rect x="7" y="2" width="1" height="1"></rect>
                <rect x="5" y="3" width="1" height="1"></rect>
                <rect x="5" y="4" width="1" height="1"></rect>
                <rect x="5" y="1" width="1" height="1"></rect>
                <rect x="8" y="1" width="1" height="1"></rect>
                <rect x="8" y="2" width="1" height="1"></rect>
                <rect x="8" y="2" width="1" height="1"></rect>
                <rect x="8" y="3" width="1" height="1"></rect>
                <rect x="8" y="4" width="1" height="1"></rect>
            </g>
            {/* S */}
            <g fill="black">
                <rect x="10" y="1" width="1" height="1"></rect>
                <rect x="10" y="4" width="1" height="1"></rect>
                <rect x="11" y="0" width="1" height="1"></rect>
                <rect x="11" y="2" width="1" height="1"></rect>
                <rect x="11" y="4" width="1" height="1"></rect>
                <rect x="12" y="0" width="1" height="1"></rect>
                <rect x="12" y="2" width="1" height="1"></rect>
                <rect x="12" y="4" width="1" height="1"></rect>
                <rect x="13" y="0" width="1" height="1"></rect>
                <rect x="13" y="3" width="1" height="1"></rect>
            </g>
            {/* K */}
            <g fill="black">
                <rect x="15" y="0" width="1" height="1"></rect>
                <rect x="15" y="1" width="1" height="1"></rect>
                <rect x="15" y="2" width="1" height="1"></rect>
                <rect x="15" y="3" width="1" height="1"></rect>
                <rect x="15" y="4" width="1" height="1"></rect>
                <rect x="16" y="2" width="1" height="1"></rect>
                <rect x="17" y="1" width="1" height="1"></rect>
                <rect x="17" y="3" width="1" height="1"></rect>
                <rect x="18" y="0" width="1" height="1"></rect>
                <rect x="18" y="4" width="1" height="1"></rect>
            </g>
            {/* A */}
            <g fill="black">
                <rect x="21" y="0" width="1" height="1"></rect>
                <rect x="22" y="0" width="1" height="1"></rect>
                <rect x="20" y="1" width="1" height="1"></rect>
                <rect x="20" y="2" width="1" height="1"></rect>
                <rect x="21" y="2" width="1" height="1"></rect>
                <rect x="22" y="2" width="1" height="1"></rect>
                <rect x="20" y="3" width="1" height="1"></rect>
                <rect x="20" y="4" width="1" height="1"></rect>
                <rect x="20" y="1" width="1" height="1"></rect>
                <rect x="23" y="1" width="1" height="1"></rect>
                <rect x="23" y="2" width="1" height="1"></rect>
                <rect x="23" y="2" width="1" height="1"></rect>
                <rect x="23" y="3" width="1" height="1"></rect>
                <rect x="23" y="4" width="1" height="1"></rect>
            </g>
            {/* O */}
            <g fill="black">
                <rect x="0" y="7" width="1" height="1"></rect>
                <rect x="0" y="8" width="1" height="1"></rect>
                <rect x="0" y="9" width="1" height="1"></rect>
                <rect x="1" y="6" width="1" height="1"></rect>
                <rect x="2" y="6" width="1" height="1"></rect>
                <rect x="1" y="10" width="1" height="1"></rect>
                <rect x="2" y="10" width="1" height="1"></rect>
                <rect x="3" y="7" width="1" height="1"></rect>
                <rect x="3" y="8" width="1" height="1"></rect>
                <rect x="3" y="9" width="1" height="1"></rect>
            </g>
            {/* V */}
            <g fill="black">
                <rect x="5" y="6" width="1" height="1"></rect>
                <rect x="5" y="7" width="1" height="1"></rect>
                <rect x="5" y="8" width="1" height="1"></rect>
                <rect x="5" y="9" width="1" height="1"></rect>
                <rect x="6" y="10" width="1" height="1"></rect>
                <rect x="7" y="6" width="1" height="1"></rect>
                <rect x="7" y="7" width="1" height="1"></rect>
                <rect x="7" y="8" width="1" height="1"></rect>
                <rect x="7" y="9" width="1" height="1"></rect>
            </g>
            {/* O */}
            <g fill="black">
                <rect x="9" y="7" width="1" height="1"></rect>
                <rect x="9" y="8" width="1" height="1"></rect>
                <rect x="9" y="9" width="1" height="1"></rect>
                <rect x="10" y="6" width="1" height="1"></rect>
                <rect x="11" y="6" width="1" height="1"></rect>
                <rect x="10" y="10" width="1" height="1"></rect>
                <rect x="11" y="10" width="1" height="1"></rect>
                <rect x="12" y="7" width="1" height="1"></rect>
                <rect x="12" y="8" width="1" height="1"></rect>
                <rect x="12" y="9" width="1" height="1"></rect>
            </g>
            {/* Egg */}
            <g>
                <rect x="25" y="5" width="1" height="1" fill="#646464"></rect>
                <rect x="25" y="6" width="1" height="1" fill="#646464"></rect>
                <rect x="25" y="7" width="1" height="1" fill="#646464"></rect>

                <rect x="26" y="3" width="1" height="1" fill="#646464"></rect>
                <rect x="26" y="4" width="1" height="1" fill="#646464"></rect>
                <rect x="26" y="5" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="26" y="6" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="26" y="7" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="26" y="8" width="1" height="1" fill="#646464"></rect>

                <rect x="27" y="2" width="1" height="1" fill="#646464"></rect>
                <rect x="27" y="3" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="27" y="4" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="27" y="5" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="27" y="6" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="27" y="7" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="27" y="8" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="27" y="9" width="1" height="1" fill="#646464"></rect>

                <rect x="28" y="1" width="1" height="1" fill="#646464"></rect>
                <rect x="28" y="2" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="28" y="3" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="28" y="4" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="28" y="5" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="28" y="6" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="28" y="7" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="28" y="8" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="28" y="9" width="1" height="1" fill="#646464"></rect>

                <rect x="29" y="1" width="1" height="1" fill="#646464"></rect>
                <rect x="29" y="2" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="29" y="3" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="29" y="4" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="29" y="5" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="29" y="6" width="1" height="1" fill="#EFEFEF"></rect>
                <rect x="29" y="7" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="29" y="8" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="29" y="9" width="1" height="1" fill="#646464"></rect>

                <rect x="30" y="2" width="1" height="1" fill="#646464"></rect>
                <rect x="30" y="3" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="30" y="4" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="30" y="5" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="30" y="6" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="30" y="7" width="1" height="1" fill="#C7C7C7"></rect>
                <rect x="30" y="8" width="1" height="1" fill="#A0A0A0"></rect>
                <rect x="30" y="9" width="1" height="1" fill="#646464"></rect>

                <rect x="31" y="3" width="1" height="1" fill="#646464"></rect>
                <rect x="31" y="4" width="1" height="1" fill="#646464"></rect>
                <rect x="31" y="5" width="1" height="1" fill="#A0A0A0"></rect>
                <rect x="31" y="6" width="1" height="1" fill="#A0A0A0"></rect>
                <rect x="31" y="7" width="1" height="1" fill="#A0A0A0"></rect>
                <rect x="31" y="8" width="1" height="1" fill="#646464"></rect>

                <rect x="32" y="5" width="1" height="1" fill="#646464"></rect>
                <rect x="32" y="6" width="1" height="1" fill="#646464"></rect>
                <rect x="32" y="7" width="1" height="1" fill="#646464"></rect>
            </g>
        </svg>
    );
}