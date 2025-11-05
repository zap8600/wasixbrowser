import { WASIXProcess } from "./wasix.js";

(async function () {
    const memory = new WebAssembly.Memory({initial: 200});
    const module = await WebAssembly.compileStreaming(fetch("./wasitests/hello.wasm"));

    const process = new WASIXProcess(module, memory);
})();