// Ancient ass code I once wrote for a private project.
// Splits a file path (e.g. /home/deck/deck-tailscale) into an array (e.g. ["home", "deck", "deck-tailscale"])
export function splitPath(filepath) {
    let array = [];
    let slloc = filepath.indexOf("/");
    let newfp = filepath;

    while(slloc !== -1) {
        let segmentfp = newfp.slice(0, slloc);
        array.push(segmentfp);
        newfp = newfp.slice(slloc + 1);
        slloc = newfp.indexOf("/");
    }
    array.push(newfp);

    return array;
}