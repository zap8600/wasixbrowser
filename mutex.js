// https://blogtitle.github.io/using-javascript-sharedarraybuffers-and-atomics/

const locked = 1;
const unlocked = 0;

export class Mutex {
    constructor(optional_sab) {
        this._sab = optional_sab || new SharedArrayBuffer(4);
        this._mu = new Int32Array(this._sab);
    }

    static connect(mu) {
        return new Mutex(mu._sab);
    }

    lock() {
        for(;;) {
            if(Atomics.compareExchange(this._mu, 0, unlocked, locked) == unlocked) {
                return;
            }

            Atomics.wait(this._mu, 0, locked);
        }
    }

    unlock() {
        if(Atomics.compareExchange(this._mu, 0, locked, unlocked) != locked) {
            throw new Error("unlock on unlocked mutex");
        }

        Atomics.notify(this._mu, 0, 1);
    }
}