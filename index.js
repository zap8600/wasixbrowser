(async function () {
    const encoder = new TextEncoder();

    const args_array = [
        "./wasitests/printf.wasm",
    ];

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
                worker.postMessage([module, memory, e.data[0], e.data[1], args_array]);
                workers.push(worker);
                break;
            }
        }
    }
    main_worker.onerror = (d) => {
        console.error(d.message);
        throw d;
    }
    main_worker.postMessage([module, memory, args_array]);

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