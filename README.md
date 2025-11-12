# wallop

Kernel for running WASI applications in the browser, implemented in Javascript.

## Compiling WASI tests

The command below is only here for reference.

```shell
$WASI_SDK_PATH/bin/clang --target=wasm32-wasi-threads --sysroot=${WASI_SDK_PATH}/share/wasi-sysroot -Wl,--import-memory -Wl,--shared-memory -Wl,--max-memory=67108864 -matomics hello.c -o hello.wasm
```
