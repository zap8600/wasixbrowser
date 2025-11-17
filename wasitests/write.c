#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <errno.h>
#include <fcntl.h>

int main() {
    int fd = open("./beans.txt", (O_RDWR | O_TRUNC), 0777);
    if(fd == -1) {
        fprintf(stderr, "./beans.txt: %s\n", strerror(errno));
        return 1;
    }
    char* msg = "Hello, files!\n";
    write(fd, msg, strlen(msg));
    close(fd);
    return 0;
}