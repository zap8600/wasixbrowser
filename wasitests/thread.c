#include <unistd.h>
#include <string.h>
#include <pthread.h>
#include <stdlib.h>
// #include <errno.h>

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

// Made so that I only need fd_write to get console output
void print_str(const char* s) {
    write(STDOUT_FILENO, s, strlen(s));
}

void print_err(const char* s) {
    write(STDERR_FILENO, s, strlen(s));
}

pthread_mutex_t the_mutex = PTHREAD_MUTEX_INITIALIZER;
int counter = 0;

void* thread(void* ptr) {
    print_str("thread!\n");
    char* msg = (char*)calloc(1, 11 + 10);
    if(*((int*)ptr) == 1) {
        memcpy(msg, "thread 1: ", 10);
    } else {
        memcpy(msg, "thread 2: ", 10);
    }
    for(int i = 0; i < 100; i++) {
        pthread_mutex_lock(&the_mutex);
        counter++;
        memcpy(msg + 10, hex_str(counter), 11);
        print_str(msg);
        pthread_mutex_unlock(&the_mutex);
    }
    free(msg);
}

int thread_id_wan = 1;
int thread_id_tu = 2;

int main() {
    pthread_t the_thread;
    pthread_t the_thread_again;
    int create_return = pthread_create(&the_thread, NULL, thread, (void*)&thread_id_wan);
    if(create_return) {
        print_err("failed to create thread 1!\n");
        return create_return;
    }
    create_return = pthread_create(&the_thread_again, NULL, thread, (void*)&thread_id_tu);
    if(create_return) {
        print_err("failed to create thread 2!\n");
        return create_return;
    }
    // pthread_join(the_thread, NULL);
    // pid_t pid = fork();
    // if(pid) {
    //     print_err("failed to create child!\n");
    //     return errno;
    // } else if(!pid) {
    //     print_str("thread!\n");
    //     return 42;
    // }
    return 0;
}