const max_fds = 25;

import { Mutex } from "./mutex.js";

(async function () {
    const encoder = new TextEncoder();

    const args_array = [
        "./wasitests/thread.wasm",
        "--sandwich",
        "beans",
    ];

    const open_fds_buf = new SharedArrayBuffer(3 * 4, {maxByteLength: max_fds * 4});
    const open_fds = new Int32Array(open_fds_buf);
    open_fds[0] = 0; // stdin
    open_fds[1] = 1; // stdout
    open_fds[2] = 2; // stderr
    const fds_mutex = new Mutex();

    const envs = {
        FOO: "limpbizkit",
        BARS: "sandwich" // intentionally mispelled
    };

    const module = await WebAssembly.compileStreaming(fetch(args_array[0]));
    const memory = new WebAssembly.Memory({ initial: 2, maximum: 1024, shared: true })

    const main_worker = new Worker("./mainworker.js", { type: "module" });
    const workers = [];
    main_worker.onmessage = (e) => {
        // const worker = new Worker("./worker.js", { type: "module" });
        // worker.postMessage([module, memory, e.data[0], e.data[1]]);
        // workers.push(worker);
        switch(e.data.method) {
            case "log": {
                console.log(e.data.message);
                break;
            }
            case "error": {
                console.error(e.data.message);
                break;
            }
            case "thread": {
                const worker = new Worker("./worker.js", { type: "module" });
                worker.onmessage = (d) => {
                    switch(d.data.method) {
                        case "log": {
                            console.log(d.data.message);
                            break;
                        }
                        case "error": {
                            console.error(d.data.message);
                            break;
                        }
                    }
                }
                worker.onerror = (f) => {
                    console.error(f.message);
                    throw f;
                }
                worker.postMessage([module, memory, e.data.id, e.data.args, args_array, envs, open_fds_buf, fds_mutex._sab]);
                workers.push(worker);
                break;
            }
        }
    }
    main_worker.onerror = (d) => {
        console.error(d.message);
        throw d;
    }
    main_worker.postMessage([module, memory, args_array, envs, open_fds_buf, fds_mutex._sab]);
    // console.log(splitPath("/home/deck/deck-tailscale"));

    // WebAssembly.instantiate(module, {
    //     "wasi_snapshot_preview1": wasi,
    //     "wasi": {
    //         "thread-spawn"(start_args) {
    //             const worker = new Worker("./worker.js", { type: "module" });
    //             worker.postMessage([module, memory, start_args]);
    //             return 5;
    //         }
    //     },
    //     env: { memory: memory }
    // }).then((instance) => {
    //     instance.exports._start();
    // });
})();