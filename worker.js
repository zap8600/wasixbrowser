import { WASI } from "./wasi.js"

onmessage = (e) => {
    const wasi = new WASI(e.data[1], e.data[4], e.data[5]);
    WebAssembly.instantiate(e.data[0], {
        "wasi_snapshot_preview1": wasi,
        "wasi": {
            "thread-spawn"() {
                throw new Error("thread-spawn");
            }
        },
        env: { memory: e.data[1] }
    }).then((instance) => {
        instance.exports.wasi_thread_start(e.data[2], e.data[3]);
    });
}