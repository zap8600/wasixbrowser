#include <unistd.h>
#include <string.h>

// Made so that I only need fd_write to get console output
void print_str(const char* s) {
    write(STDOUT_FILENO, s, strlen(s));
}

// char* hex_str(unsigned int num) {
//     static char buf[11] = {0};
//     memcpy(buf, "0x", 2);
//     unsigned int i;
//     unsigned int j;
//     for(i = 0, j = 7; i < 8; i++, j--) {
//         buf[j + 2] = "0123456789abcdef"[(num >> (i * 4)) & 0xf];
//     }
//     return &(buf[0]);
// }

int main() {
    print_str("Hello, world!");
    return 0;
}