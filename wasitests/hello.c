#include <unistd.h>
#include <string.h>

// Made so that I only need fd_write to get console output
void print_str(const char* s) {
    write(STDOUT_FILENO, s, strlen(s));
}

void print_ch(const char c) {
    write(STDOUT_FILENO, &c, 1);
}

char* hex_str(unsigned int num) {
    static char buf[11] = {0};
    memcpy(buf, "0x", 2);
    unsigned int i;
    unsigned int j;
    for(i = 0, j = 7; i < 8; i++, j--) {
        buf[j + 2] = "0123456789abcdef"[(num >> (i * 4)) & 0xf];
    }
    return &(buf[0]);
}

int main(int argc, char** argv) {
    char* msg = "Hello, world!\n";
    print_str(hex_str(argc));
    if(argc) {
        print_str("Guh?\n");
    }
    // for(int i = 0; i < argc; i++) {
    //     print_str(argv[i]);
    //     print_ch('\n');
    // }
    return 0;
}