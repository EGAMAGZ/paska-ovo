import { assertEquals } from "@std/testing";

import { codeToChars } from "../src/util/code.ts";

Deno.test("codeToChars", () => {
    assertEquals(codeToChars("up,down,left,right,enter,space,ctrl,alt,tab,esc"), "38,40,37,39,13,32,17,18,9,27");
    assertEquals(codeToChars("up,up,down,down,left,right,left,right,b,a"), "38,38,40,40,37,39,37,39,98,97");
    assertEquals(codeToChars("up,up,down,down,,left,right, left, right,b,"), "38,38,40,40,37,39,37,39,98");
});
