import { assertEquals } from "@std/testing";

import { codeToChars } from "../src/util/code.ts";
import { HistoricalCodes } from "../src/historical-codes.ts"

Deno.test("codeToChars - Valid code structure", () => {

    assertEquals(
        codeToChars("up,up,down,down, left,right,left,right,b,a"),
        "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a"
    );

    assertEquals(
        codeToChars("up,down,left,right,enter,space,ctrl,alt,tab,esc,slash"),
        "ArrowUp,ArrowDown,ArrowLeft,ArrowRight,Enter,Space,Control,Alt,Tab,Escape,/"
    );

    assertEquals(
        codeToChars("a,b,c,d,e,A,B,C,D,E"),
        "a,b,c,d,e,a,b,c,d,e"
    );
});

Deno.test("codeToChars - Invalid code structure", () => {
    assertEquals(
        codeToChars("up,down,left,right,,space,ctrl,alt,tab,esc,"),
        "ArrowUp,ArrowDown,ArrowLeft,ArrowRight,Space,Control,Alt,Tab,Escape"
    );

    assertEquals(
        codeToChars(",,,,up,up,down,down, left,right,left,right,b,a"),
        "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a"
    )
});

Deno.test("codeToChars - Historical codes", () => {
    assertEquals(codeToChars(HistoricalCodes.Iddqd), "i,d,d,q,d");

    assertEquals(
        codeToChars(HistoricalCodes.Konami),
        "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a"
    );
});
