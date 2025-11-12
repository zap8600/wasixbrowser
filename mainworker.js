import { WASI } from "./wasi.js";

let thread_id = 5;

onmessage = (e) => {
    const wasi = new WASI(e.data[1]);
    WebAssembly.instantiate(e.data[0], {
        "wasi_snapshot_preview1": wasi,
        "wasi": {
            "thread-spawn"(start_args) {
                // throw new Error("thread-spawn");
                postMessage([thread_id, start_args, "thread"]);
                const return_value = thread_id;
                thread_id++;
                return return_value;
            }
        },
        env: { memory: e.data[1] }
    }).then((instance) => {
        instance.exports._start();
    });
}