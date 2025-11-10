const encoder = new TextEncoder();

(async function () {
    const args = ["./wasitests/hello.wasm"].map(s => encoder.encode(s + "\0"));
    const memory = new WebAssembly.Memory({initial: 2, maximum: 2, shared: true});
    const module = await WebAssembly.compileStreaming(fetch("./wasitests/hello.wasm"));

    // const process = new WASIXProcess(module, memory);
    const worker = new Worker("./process_worker.js", {type: "module"});
    worker.onmessage = (e) => {
        switch(e.data[0]) {
            case "fd_write": {
                const fd = e.data[1];
                const iovs_ptr = e.data[2];
                const iovs_len = e.data[3];
                const nwrittem = e.data[4];

                // TODO: Make this thread-safe
                const iovs = new Uint32Array(memory.buffer, iovs_ptr, iovs_len * 2);
                if(fd === 1) {
                    console.log("stdout");
                    let text = "";
                    let total_bytes = 0;
                    const decoder = new TextDecoder();
                    for(let i = 0; i < iovs_len * 2; i += 2) {
                        const offset = iovs[i];
                        const length = iovs[i + 1];

                        // We need to copy since text decoder wom't decode from a shared buffer
                        let chunk_copy = new ArrayBuffer(length);
                        new Uint8Array(chunk_copy).set(new Uint8Array(memory.buffer, offset, length));

                        const text_chunk = decoder.decode(new Int8Array(chunk_copy));
                        text += text_chunk;
                        total_bytes += length;
                    }
                    const data_view = new DataView(memory.buffer);
                    data_view.setInt32(nwrittem, total_bytes, true);
                    console.log(text);
                }
                return 0;
            }
            case "args_get": {
                //console.log(e.data[0]);
                const argv_ptr = e.data[1];
                const argv_buf_ptr = e.data[2];
                const argv = new Uint32Array(memory.buffer, argv_ptr, args.length);
                const argv_buf = new Uint8Array(memory.buffer, argv_buf_ptr);

                let offset = 0;
                for(let i = 0; i < args.length; i++) {
                    const current_ptr = argv_buf_ptr + offset;
                    argv[i] = current_ptr;
                    argv_buf.set(args[i], offset);
                    offset += args[i].byteLength;
                }

                return 0;
            }
            case "args_sizes_get": {
                //console.log(e.data[0]);
                const argc_ptr = e.data[1];
                const argv_buf_size_ptr = e.data[2];
                const data_view = new DataView(memory.buffer);
                data_view.setUint32(argc_ptr, args.length, true);
                data_view.setUint32(argv_buf_size_ptr, args.reduce((sum, value) => { sum + value.byteLength }, 0), true);
                return 0;
            }
            default: console.error(e.data[0]); throw new Error(e.data[0]);
        }
    }
    worker.postMessage(["start", module, memory]);
})();