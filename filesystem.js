class FileData {
    path;
    cursor;

    constructor(path) {
        this.path = path;
        this.cursor = 0;
    }
}

export class Filesystem {
    // This map is basically like root /
    // Keys are strings representing an entry
    // If the type of the value of a key is a map, it's a directory
    // Else, it's a file and the type will be a Uint8Array
    fs_map;

    constructor() {
        this.fs_map = new Map();
    }

    // Ancient ass code I once wrote for a private project.
    // Splits a file path (e.g. /home/deck/deck-tailscale) into an array (e.g. ["home", "deck", "deck-tailscale"])
    splitPath(filepath) {
        let array = [];
        let newfp = filepath;
        if(newfp.charAt(0) === "/") {
            newfp = newfp.slice(1);
        }
        let slloc = newfp.indexOf("/");

        while(slloc !== -1) {
            let segmentfp = newfp.slice(0, slloc);
            array.push(segmentfp);
            newfp = newfp.slice(slloc + 1);
            slloc = newfp.indexOf("/");
        }
        array.push(newfp);

        return array;
    }

    // Ancient ass code I once wrote for a private project.
    // Return true if the file exists, false if not
    findfile(filepatharray) {
        let currdir = filesystem;
        for(let i = 0; i < filepatharray.length; i++) {
            if(!(currdir.has(filepatharray[i]))) {
                return false;
            }

            let valueofai = currdir.get(filepatharray[i]);

            if(!(valueofai instanceof Map)) {
                return true;
            }

            currdir = valueofai;
        }
    }
}