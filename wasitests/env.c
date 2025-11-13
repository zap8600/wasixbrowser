#include <string.h>
#include <unistd.h>
#include <stdlib.h>

// Made so that I only need fd_write to get console output
void print_str(const char* s) {
    write(STDOUT_FILENO, s, strlen(s));
}

void print_err(const char* s) {
    write(STDERR_FILENO, s, strlen(s));
}

int main() {
    char* foo = getenv("FOO");
    if(!foo) {
        print_err("no env var named FOO");
        return 1;
    }
    print_str(foo);
    char* bar = getenv("BAR");
    if(!bar) {
        print_err("no env var named BAR");
        return 1;
    }
    print_str(bar);
    return 0;
}