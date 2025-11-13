class FileData {
    path;
    cursor;

    constructor(path) {
        this.path = path;
        this.cursor = 0;
    }
}

// This map is basically like root /
// Keys are strings representing an entry
// If the type of the value of a key is a map, it's a directory
// Else, it's a file and the type will be a Uint8Array
const filesystem = new Map();

(async function () {
    const encoder = new TextEncoder();

    const args_array = [
        "./wasitests/printf.wasm",
        "--sandwich",
        "beans",
    ];

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
        switch(e.data[2]) {
            case "log": {
                console.log(e.data[0]);
                break;
            }
            case "error": {
                console.error(e.data[0]);
                break;
            }
            case "thread": {
                const worker = new Worker("./worker.js", { type: "module" });
                worker.onmessage = (d) => {
                    switch(d.data[2]) {
                        case "log": {
                            console.log(d.data[0]);
                            break;
                        }
                        case "error": {
                            console.error(d.data[0]);
                            break;
                        }
                    }
                }
                worker.onerror = (f) => {
                    console.error(f.message);
                    throw f;
                }
                worker.postMessage([module, memory, e.data[0], e.data[1], args_array, envs]);
                workers.push(worker);
                break;
            }
        }
    }
    main_worker.onerror = (d) => {
        console.error(d.message);
        throw d;
    }
    main_worker.postMessage([module, memory, args_array, envs]);

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