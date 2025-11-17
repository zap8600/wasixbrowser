#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>
#include <errno.h>

int main() {
    setbuf(stdout, NULL);
    setbuf(stderr, NULL);
    printf("Opening!\n");
    int fd = open("./beans.txt", (O_CREAT | O_RDWR | O_TRUNC), 0777);
    if(fd == -1) {
        fprintf(stderr, "./beans.txt: %s\n", strerror(errno));
        return 1;
    }
    printf("FD: %d\n", fd);
    close(fd);
    return 0;
}