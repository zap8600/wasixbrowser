// https://web.dev/articles/webassembly-threads
// https://dev.to/ndesmic/building-a-minimal-wasi-polyfill-for-browsers-4nel
// https://web.dev/articles/asyncify

export class WASIXProcess {
    constructor(module, memory) {
        WebAssembly.instantiate(
            module,
            {
                // TODO: use worker postMessage to handle syscalls
                "wasi_snapshot_preview1": {
                    args_get(argv, argv_buf) {
                        // throw new Error("args_get"); // TODO
                        postMessage(["args_get", argv, argv_buf]);
                        return 0;
                    },

                    args_sizes_get(argc, argv_buf_size) {
                        // throw new Error("args_sizes_get"); // TODO
                        postMessage(["args_sizes_get", argc, argv_buf_size]);
                        return 0;
                    },

                    environ_get(env, env_buf) {
                        throw new Error("environ_get"); // TODO
                    },

                    environ_sizes_get(env_count, env_buf_size) {
                        throw new Error("environ_sizes_get"); // TODO
                    },

                    clock_get_res(clock_id, resolution) {
                        throw new Error("clock_get_res"); // TODO
                    },

                    clock_time_get(clock_id, precision, time) {
                        // const data_view = new DataView(instance.exports.memory.buffer);
                        // data_view.setBigUint64(time, BigInt(Date.now() * 1000000), true);
                        // return 0;
                        throw new Error("clock_time_get"); // TODO
                    },

                    fd_advise() {
                        throw new Error("fd_advise");
                    },

                    fd_allocate() {
                        throw new Error("fd_allocate");
                    },

                    fd_close() {
                        throw new Error("fd_close");
                    },

                    fd_datasync() {
                        throw new Error("fd_datasync");
                    },

                    fd_fdstat_get() {
                        throw new Error("fd_fdstat_get");
                    },

                    fd_fdstat_set_flags() {
                        throw new Error("fd_fdstat_set_flags");
                    },

                    fd_fdstat_set_rights() {
                        throw new Error("fd_fdstat_set_rights");
                    },


                    fd_filestat_get() {
                        throw new Error("fd_filestat_get");
                    },

                    fd_filestat_set_flags() {
                        throw new Error("fd_filestat_set_size");
                    },

                    fd_filestat_set_rights() {
                        throw new Error("fd_filestat_set_times");
                    },

                    fd_pread() {
                        throw new Error("fd_pread");
                    },

                    fd_prestat_get() {
                        throw new Error("fd_prestat_get");
                    },

                    fd_prestat_dir_name() {
                        throw new Error("fd_prestat_dir_name");
                    },

                    fd_pwrite() {
                        throw new Error("fd_pwrite");
                    },

                    fd_read() {
                        throw new Error("fd_read");
                    },

                    fd_readdir() {
                        throw new Error("fd_readdir");
                    },

                    fd_renumber() {
                        throw new Error("fd_renumber");
                    },

                    fd_seek() {
                        throw new Error("fd_seek");
                    },

                    fd_sync() {
                        throw new Error("fd_sync");
                    },

                    fd_tell() {
                        throw new Error("fd_tell");
                    },

                    fd_write(fd, iovs_ptr, iovs_len, nwritten) {
                        // throw new Error("fd_write");
                        postMessage(["fd_write", fd, iovs_ptr, iovs_len, nwritten]);
                        return 0;
                    },

                    path_create_directory() {
                        throw new Error("path_create_directory");
                    },

                    path_filestat_get() {
                        throw new Error("path_filestat_get");
                    },

                    path_filestat_set_times() {
                        throw new Error("path_filestat_set_times");
                    },

                    path_link() {
                        throw new Error("path_link");
                    },

                    path_open() {
                        throw new Error("path_open");
                    },

                    path_readlink() {
                        throw new Error("path_readlink");
                    },

                    path_remove_directory() {
                        throw new Error("path_remove_directory");
                    },

                    path_rename() {
                        throw new Error("path_rename");
                    },

                    path_symlink() {
                        throw new Error("path_symlink");
                    },

                    path_unlink_file() {
                        throw new Error("path_unlink_file");
                    },

                    poll_oneoff() {
                        throw new Error("poll_oneoff");
                    },

                    proc_exit(code) {
                        // console.log("Process exited with exit code " + code);
                        postMessage(["proc_exit", code]); // TODO
                    },

                    proc_raise() {
                        throw new Error("proc_raise");
                    },

                    sched_yield() {
                        throw new Error("sched_yield");
                    },

                    sock_accept() {
                        throw new Error("sock_accept");
                    },

                    sock_recv() {
                        throw new Error("sock_recv");
                    },

                    sock_send() {
                        throw new Error("sock_send");
                    },

                    sock_shutdown() {
                        throw new Error("sock_shutdown");
                    },
                },
                env: {
                    memory: memory,
                }
            }
        ).then((result) => {
            this.instance = result;
            this.instance.exports._start();
        });
    }
}