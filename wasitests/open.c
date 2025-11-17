#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>
#include <errno.h>
#include <stdlib.h>

int open_new_file(char* filename, int flags, int mode) {
    int fd = open(filename, flags, mode);
    if(fd == -1) {
        fprintf(stderr, "./beans.txt: %s\n", strerror(errno));
        exit(1);
    }
    return fd;
}

int main() {
    setbuf(stdout, NULL);
    setbuf(stderr, NULL);
    int fd = open_new_file("./beans.txt", (O_CREAT | O_RDWR | O_TRUNC), 0777);
    printf("FD: %d\n", fd);
    int fd1 = open_new_file("./limpbizkit.txt", (O_CREAT | O_RDWR | O_TRUNC), 0777);
    printf("FD1: %d\n", fd1);
    close(fd);
    int fd2 = open_new_file("./sandwich.txt", (O_CREAT | O_RDWR | O_TRUNC), 0777);
    printf("FD2: %d\n", fd2);
    close(fd1);
    close(fd2);
    return 0;
}