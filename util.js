export function find_first_missing_number(array) {
    const max = Math.max(...array);
    for(let i = 0; i <= max; i++) {
        if(array.indexOf(i) === -1) {
            return i;
        }
    }
    return -1;
}