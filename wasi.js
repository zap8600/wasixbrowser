// https://web.dev/articles/webassembly-threads
// https://dev.to/ndesmic/building-a-minimal-wasi-polyfill-for-browsers-4nel
// https://web.dev/articles/asyncify

export class WASI {
    memory;
    args;
    envs;

    constructor(memory, args, envs) {
        const encoder = new TextEncoder();
        this.memory = memory;
        const env_strings = Object.entries(envs).map(([key, value]) => `${key}=${value}`);
        this.envs = env_strings.map(s => encoder.encode(s + "\0"));
        this.args = args.map(s => encoder.encode(s + "\0"));
        this.bind();
    }

    bind() {
        this.args_get = this.args_get.bind(this);
        this.args_sizes_get = this.args_sizes_get.bind(this);
        this.environ_get = this.environ_get.bind(this);
        this.environ_sizes_get = this.environ_sizes_get.bind(this);
        this.clock_get_res = this.clock_get_res.bind(this);
        this.clock_time_get = this.clock_time_get.bind(this);
        this.fd_advise = this.fd_advise.bind(this);
        this.fd_allocate = this.fd_allocate.bind(this);
        this.fd_close = this.fd_close.bind(this);
        this.fd_datasync = this.fd_datasync.bind(this);
        this.fd_fdstat_get = this.fd_fdstat_get.bind(this);
        this.fd_fdstat_set_flags = this.fd_fdstat_set_flags.bind(this);
        this.fd_fdstat_set_rights = this.fd_fdstat_set_rights.bind(this);
        this.fd_filestat_get = this.fd_filestat_get.bind(this);
        this.fd_filestat_set_flags = this.fd_filestat_set_flags.bind(this);
        this.fd_filestat_set_rights = this.fd_filestat_set_rights.bind(this);
        this.fd_pread = this.fd_pread.bind(this);
        this.fd_prestat_get = this.fd_prestat_get.bind(this);
        this.fd_prestat_dir_name = this.fd_prestat_dir_name.bind(this);
        this.fd_pwrite = this.fd_pwrite.bind(this);
        this.fd_read = this.fd_read.bind(this);
        this.fd_readdir = this.fd_readdir.bind(this);
        this.fd_renumber = this.fd_renumber.bind(this);
        this.fd_seek = this.fd_seek.bind(this);
        this.fd_sync = this.fd_sync.bind(this);
        this.fd_tell = this.fd_tell.bind(this);
        this.fd_write = this.fd_write.bind(this);
        this.path_create_directory = this.path_create_directory.bind(this);
        this.path_filestat_get = this.path_filestat_get.bind(this);
        this.path_filestat_set_times = this.path_filestat_set_times.bind(this);
        this.path_link = this.path_link.bind(this);
        this.path_open = this.path_open.bind(this);
        this.path_readlink = this.path_readlink.bind(this);
        this.path_remove_directory = this.path_remove_directory.bind(this);
        this.path_rename = this.path_rename.bind(this);
        this.path_symlink = this.path_symlink.bind(this);
        this.path_unlink_file = this.path_unlink_file.bind(this);
        this.poll_oneoff = this.poll_oneoff.bind(this);
        this.proc_exit = this.proc_exit.bind(this);
        this.proc_raise = this.proc_raise.bind(this);
        this.sched_yield = this.sched_yield.bind(this);
        this.sock_accept = this.sock_accept.bind(this);
        this.sock_recv = this.sock_recv.bind(this);
        this.sock_send = this.sock_send.bind(this);
        this.sock_shutdown = this.sock_shutdown.bind(this);
    }

    args_get(argv_ptr, argv_buf_ptr) {
        // postMessage(["args_get", 0, "log"]);
        const length = this.args.reduce((sum, value) => sum + value.byteLength, 0);
        const argv = new Uint32Array(this.memory.buffer, argv_ptr, this.args.length);
        const argv_buf = new Uint8Array(this.memory.buffer, argv_buf_ptr, length);

        let offset = 0;
        for(let i = 0; i < this.args.length; i++) {
            const current_ptr = argv_buf_ptr + offset;
            argv[i] = current_ptr;
            argv_buf.set(this.args[i], offset);
            offset += this.args[i].byteLength;
        }

        return 0;
    }

    args_sizes_get(argc_ptr, argv_buf_size_ptr) {
        // throw new Error("args_sizes_get");
        // postMessage(["args_sizes_get", 0, "log"]);
        const length = this.args.reduce((sum, value) => sum + value.byteLength, 0);
        const data_view = new DataView(this.memory.buffer);
        data_view.setUint32(argc_ptr, this.args.length, true);
        data_view.setUint32(argv_buf_size_ptr, length, true);
        return 0;
    }

    environ_get(environ_ptr, environ_buf_ptr) {
        // throw new Error("environ_get");
        // postMessage(["environ_get", 0, "log"]);
        const length = this.envs.map(s => s.byteLength).reduce((sum, value) => sum + value, 0);
        const environ = new Uint32Array(this.memory.buffer, environ_ptr, this.envs.length);
        const environ_buf = new Uint8Array(this.memory.buffer, environ_buf_ptr, length);

        let offset = 0;
        for(let i = 0; i < this.envs.length; i++) {
            const current_ptr = environ_buf_ptr + offset;
            environ[i] = current_ptr;
            environ_buf.set(this.envs[i], offset);
            offset += this.envs[i].byteLength;
        }

        return 0;
    }

    environ_sizes_get(environ_count_ptr, environ_buf_size_ptr) {
        // throw new Error("environ_sizes_get");
        // ostMessage(["environ__sizes_get", 0, "log"]);
        const length = this.envs.map(s => s.byteLength).reduce((sum, value) => sum + value, 0);
        const data_view = new DataView(this.memory.buffer);
        data_view.setUint32(environ_count_ptr, this.envs.length, true);
        data_view.setUint32(environ_buf_size_ptr, length, true);
        return 0;
    }

    clock_get_res(clock_id, resolution) {
        throw new Error("clock_get_res");
    }

    clock_time_get(clock_id, precision, time) {
        // throw new Error("clock_time_get");
        const data_view = new DataView(this.memory.buffer);
        data_view.setBigUint64(time, BigInt(Date.now() * 1000000), true);
        return 0;
    }

    fd_advise() {
        throw new Error("fd_advise");
    }

    fd_allocate() {
        throw new Error("fd_allocate");
    }

    fd_close() {
        throw new Error("fd_close");
    }

    fd_datasync() {
        throw new Error("fd_datasync");
    }

    fd_fdstat_get() {
        throw new Error("fd_fdstat_get");
    }

    fd_fdstat_set_flags() {
        throw new Error("fd_fdstat_set_flags");
    }

    fd_fdstat_set_rights() {
        throw new Error("fd_fdstat_set_rights");
    }


    fd_filestat_get() {
        throw new Error("fd_filestat_get");
    }

    fd_filestat_set_flags() {
        throw new Error("fd_filestat_set_size");
    }

    fd_filestat_set_rights() {
        throw new Error("fd_filestat_set_times");
    }

    fd_pread() {
        throw new Error("fd_pread");
    }

    fd_prestat_get() {
        throw new Error("fd_prestat_get");
    }

    fd_prestat_dir_name() {
        throw new Error("fd_prestat_dir_name");
    }

    fd_pwrite() {
        throw new Error("fd_pwrite");
    }

    fd_read() {
        throw new Error("fd_read");
    }

    fd_readdir() {
        throw new Error("fd_readdir");
    }

    fd_renumber() {
        throw new Error("fd_renumber");
    }

    fd_seek() {
        throw new Error("fd_seek");
    }

    fd_sync() {
        throw new Error("fd_sync");
    }

    fd_tell() {
        throw new Error("fd_tell");
    }

    fd_write(fd, iovs_ptr, iovs_len, nwritten) {
        // throw new Error("fd_write");
        const iovs = new Uint32Array(this.memory.buffer, iovs_ptr, iovs_len * 2);
        if(fd === 1 || fd === 2) {
            let text = "";
            let total = 0;
            const decoder = new TextDecoder();
            for(let i = 0; i < iovs_len * 2; i += 2) {
                const offset = iovs[i];
                const length = iovs[i + 1];
                const chunk_copy = new ArrayBuffer(length);
                new Uint8Array(chunk_copy).set(new Uint8Array(this.memory.buffer, offset, length));
                const text_chunk = decoder.decode(new Int8Array(chunk_copy));
                text += text_chunk;
                total += length;
            }
            const data_view = new DataView(this.memory.buffer);
            data_view.setInt32(nwritten, total, true);
            if(fd === 1) {
                // console.log(text);
                postMessage([text, 0, "log"]);
            } else {
                // console.error(text);
                postMessage([text, 0, "error"]);
            }
            return 0;
        }
    }

    path_create_directory() {
        throw new Error("path_create_directory");
    }

    path_filestat_get() {
        throw new Error("path_filestat_get");
    }

    path_filestat_set_times() {
        throw new Error("path_filestat_set_times");
    }

    path_link() {
        throw new Error("path_link");
    }

    path_open(dirfd, dirflags, path, path_len, o_flags, fs_rights_base, fs_rights_inheriting, fs_flags, fd) {
        // throw new Error("path_open");
        if(path_len >= 512) {
            return 28;
        }
    }

    path_readlink() {
        throw new Error("path_readlink");
    }

    path_remove_directory() {
        throw new Error("path_remove_directory");
    }

    path_rename() {
        throw new Error("path_rename");
    }

    path_symlink() {
        throw new Error("path_symlink");
    }

    path_unlink_file() {
        throw new Error("path_unlink_file");
    }

    poll_oneoff() {
        throw new Error("poll_oneoff");
    }

    proc_exit(code) {
        if(code === 0) {
            // console.log("Process exited with error code " + code + "!");
            postMessage(["Process exited with error code " + code + "!", 0, "log"]);
        } else {
            // console.error("Process exited with error code " + code + "!");
            postMessage(["Process exited with error code " + code + "!", 0, "error"]);
        }
    }

    proc_raise() {
        throw new Error("proc_raise");
    }

    sched_yield() {
        throw new Error("sched_yield");
    }

    sock_accept() {
        throw new Error("sock_accept");
    }

    sock_recv() {
        throw new Error("sock_recv");
    }

    sock_send() {
        throw new Error("sock_send");
    }

    sock_shutdown() {
        throw new Error("sock_shutdown");
    }
}