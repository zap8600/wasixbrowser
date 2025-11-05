function args_get(argv, argv_buf) {
    throw new Error("args_get"); // TODO
}

function args_sizes_get(argc, argv_buf_size) {
    throw new Error("args_sizes_get"); // TODO
}

function environ_get(env, env_buf) {
    throw new Error("environ_get"); // TODO
}

function environ_sizes_get(env_count, env_buf_size) {
    throw new Error("environ_sizes_get"); // TODO
}

function clock_get_res(clock_id, resolution) {
    throw new Error("clock_get_res"); // TODO
}

function clock_time_get(clock_id, precision, time) {
    const data_view = new DataView(instance.exports.memory.buffer);
    data_view.setBigUint64(time, BigInt(Date.now() * 1000000), true);
    return 0;
}

function fd_advise() {
    throw new Error("fd_advise");
}

function fd_allocate() {
    throw new Error("fd_allocate");
}

function fd_close() {
    throw new Error("fd_close");
}

function fd_datasync() {
    throw new Error("fd_datasync");
}

function fd_fdstat_get() {
    throw new Error("fd_fdstat_get");
}

function fd_fdstat_set_flags() {
    throw new Error("fd_fdstat_set_flags");
}

function fd_fdstat_set_rights() {
    throw new Error("fd_fdstat_set_rights");
}


function fd_filestat_get() {
    throw new Error("fd_filestat_get");
}

function fd_filestat_set_flags() {
    throw new Error("fd_filestat_set_size");
}

function fd_filestat_set_rights() {
    throw new Error("fd_filestat_set_times");
}

function fd_pread() {
    throw new Error("fd_pread");
}

function fd_prestat_get() {
    throw new Error("fd_prestat_get");
}

function fd_prestat_dir_name() {
    throw new Error("fd_prestat_dir_name");
}

function fd_pwrite() {
    throw new Error("fd_pwrite");
}

function fd_read() {
    throw new Error("fd_read");
}

function fd_readdir() {
    throw new Error("fd_readdir");
}

function fd_renumber() {
    throw new Error("fd_renumber");
}

function fd_seek() {
    throw new Error("fd_seek");
}

function fd_sync() {
    throw new Error("fd_sync");
}

function fd_tell() {
    throw new Error("fd_tell");
}

function fd_write() {
    throw new Error("fd_write");
}

function path_create_directory() {
    throw new Error("path_create_directory");
}

function path_filestat_get() {
    throw new Error("path_filestat_get");
}

function path_filestat_set_times() {
    throw new Error("path_filestat_set_times");
}

function path_link() {
    throw new Error("path_link");
}

function path_open() {
    throw new Error("path_open");
}

function path_readlink() {
    throw new Error("path_readlink");
}

function path_remove_directory() {
    throw new Error("path_remove_directory");
}

function path_rename() {
    throw new Error("path_rename");
}

function path_symlink() {
    throw new Error("path_symlink");
}

function path_unlink_file() {
    throw new Error("path_unlink_file");
}

function poll_oneoff() {
    throw new Error("poll_oneoff");
}

function proc_exit(code) {
    console.log("Process exited with exit code " + code);
}

function proc_raise() {
    throw new Error("proc_raise");
}

function sched_yield() {
    throw new Error("sched_yield");
}

function sock_accept() {
    throw new Error("sock_accept");
}

function sock_recv() {
    throw new Error("sock_recv");
}

function sock_send() {
    throw new Error("sock_send");
}

function sock_shutdown() {
    throw new Error("sock_shutdown");
}
