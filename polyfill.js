// ctx: pointer to context struct
// argv: pointer to argument string pointers
// argv_buf: pointer to string data buffer
function args_get(ctx, argv, argv_buf) {
    const data_view = new DataView(instance.exports.memory.buffer);
    const argc = data_view.getUint32(ctx + 4, true);
    const ctx_argv = data_view.getUint32(ctx + 8, true);
    for(let i = 0; i < argc; i++) {
        data_view.setUint32(argv + (i * 4), argv_buf, true);
        const argv_ptr = data_view.getUint32(ctx_argv + (i * 4), true);
        const len = (new Uint8Array(instance.exports.memory.buffer, argv_ptr)).indexOf(0);
        for(let j = 0; j < len; j++) {
            
        }
    }
}
