interface Props {
    showKonami: boolean
}

export default function Title({ showKonami }: Props) {
    return (
        <svg width="100%" height="100%" viewBox="0 0 33 11" alt="Paska Ovo Logo">
            {/* P */}
            <g fill="black">
                <rect x="0" y="0" width="1" height="1"></rect>
                <rect x="0" y="1" width="1" height="1"></rect>
                <rect x="0" y="2" width="1" height="1"></rect>
                <rect x="0" y="3" width="1" height="1"></rect>
                <rect x="0" y="4" width="1" height="1"></rect>
                <rect x="1" y="2" width="1" height="1"></rect>
                <rect x={showKonami ? 2 : 1} y={showKonami ? 1 : 0} width="1" height="1"></rect>
                <rect x={showKonami ? 3 : 2} y="0" width="1" height="1"></rect>
                <rect x="2" y={showKonami ? 3 : 2} width="1" height="1" class="transition-all ease-in-out"></rect>

                <rect x="3" y={showKonami ? 4 : 1} width="1" height="1" class="transition-all ease-in-out"></rect>
            </g>
            {/* A */}
            <g fill="black">
                <rect x="5" y="1" width="1" height="1"></rect>
                <rect x="5" y="2" width="1" height="1"></rect>
                <rect x="5" y="3" width="1" height="1"></rect>
                <rect x={showKonami ? 10 : 5} y={showKonami ? 2 : 4} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="6" y="0" width="1" height="1"></rect>
                <rect x="6" y={showKonami ? 4 : 2} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="7" y="0" width="1" height="1"></rect>
                <rect x="7" y={showKonami ? 4 : 2} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="8" y="1" width="1" height="1"></rect>
                <rect x="8" y="2" width="1" height="1"></rect>
                <rect x="8" y="2" width="1" height="1"></rect>
                <rect x="8" y="3" width="1" height="1"></rect>
                <rect x={showKonami ? 13 : 8} y="4" width="1" height="1" class="transition-all ease-in-out"></rect>
            </g>
            {/* S */}
            <g fill="black">
                <rect x="10" y="1" width="1" height="1"></rect>
                <rect x="10" y="4" width="1" height="1"></rect>
                <rect x={showKonami ? 10 : 11} y="0" width="1" height="1"></rect>
                <rect x="11" y={showKonami ? 1 : 2} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 10 : 11} y={showKonami ? 3 : 4} width="1" height="1"></rect>
                <rect x={showKonami ? 13 : 12} y={showKonami ? 1 : 0} width="1" height="1"></rect>
                <rect x={showKonami ? 13 : 12} y="2" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="12" y={showKonami ? 2 : 4} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="13" y="0" width="1" height="1"></rect>
                <rect x="13" y="3" width="1" height="1"></rect>
            </g>
            {/* K */}
            <g fill="black">
                <rect x={showKonami ? 16 : 15} y="0" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="15" y="1" width="1" height="1"></rect>
                <rect x="15" y="2" width="1" height="1"></rect>
                <rect x="15" y="3" width="1" height="1"></rect>
                <rect x="15" y="4" width="1" height="1"></rect>
                <rect x="16" y="2" width="1" height="1"></rect>
                <rect x={showKonami ? 18 : 17} y="1" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="17" y={showKonami ? 2 : 3} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 17 : 18} y="0" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="18" y="4" width="1" height="1"></rect>
            </g>
            {/* A */}
            <g fill="black">
                <rect x={showKonami ? 15 : 20} y="1" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 15 : 20} y="2" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 15 : 20} y="3" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 15 : 20} y="4" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 16 : 21} y="0" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 16 : 21} y="2" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 17 : 22} y="0" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 17 : 22} y="2" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 18 : 23} y="1" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 18 : 23} y="2" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 18 : 23} y="2" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 18 : 23} y="3" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 18 : 23} y="4" width="1" height="1" class="transition-all ease-in-out"></rect>
            </g>
            {/* O */}
            <g fill="black">
                <rect x="0" y="7" width="1" height="1"></rect>
                <rect x="0" y="8" width="1" height="1"></rect>
                <rect x="0" y="9" width="1" height="1"></rect>
                <rect x={showKonami ? 0 : 1} y="6" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 0 : 1} y="10" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 1 : 2} y={showKonami ? 7 : 6} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="2" y={showKonami ? 8 : 10} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="3" y="7" width="1" height="1"></rect>
                <rect x={showKonami ? 4 : 3} y="8" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 4 : 3} y="9" width="1" height="1" class="transition-all ease-in-out"></rect>
            </g>
            {/* V */}
            <g fill="black">
                <rect x={showKonami ? 4 : 5} y="6" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 4 : 5} y="7" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 4 : 5} y="8" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 4 : 5} y="9" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 4 : 6} y="10" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 6 : 7} y="6" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 6 : 7} y="7" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 6 : 7} y="8" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 6 : 7} y="9" width="1" height="1" class="transition-all ease-in-out"></rect>
            </g>
            {/* O */}
            <g fill="black">
                <rect x={showKonami ? 8 : 9} y="7" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="9" y="8" width="1" height="1"></rect>
                <rect x={showKonami ? 10 : 9} y="9" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="10" y="6" width="1" height="1"></rect>
                <rect x={showKonami ? 12 : 11} y="6" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 6 : 10} y="10" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x="11" y={showKonami ? 9 : 10} width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 14 : 12} y="7" width="1" height="1" class="transition-all ease-in-out"></rect>
                <rect x={showKonami ? 13 : 12} y="8" width="1" height="1" class="transition-all ease-in-out"></rect>
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