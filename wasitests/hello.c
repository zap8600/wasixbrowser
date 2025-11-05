#include <unistd.h>
#include <string.h>

int main() {
    char* msg = "Hello, world!\n";
    write(STDOUT_FILENO, msg, strlen(msg));
    return 0;
}