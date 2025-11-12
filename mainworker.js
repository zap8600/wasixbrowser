import { WASI } from "./wasi.js";

onmessage = (e) => {
    const wasi = new WASI(e.data[1]);
    WebAssembly.instantiate(e.data[0], {
        "wasi_snapshot_preview1": wasi,
        "wasi": {
            "thread-spawn"(start_args) {
                // throw new Error("thread-spawn");
                const thread_id = 5;
                postMessage([thread_id, start_args, "thread"]);
                return thread_id;
            }
        },
        env: { memory: e.data[1] }
    }).then((instance) => {
        instance.exports._start();
    });
}