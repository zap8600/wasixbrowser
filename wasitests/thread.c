#include <unistd.h>
#include <string.h>
#include <pthread.h>
// #include <errno.h>

// Made so that I only need fd_write to get console output
void print_str(const char* s) {
    write(STDOUT_FILENO, s, strlen(s));
}

void print_err(const char* s) {
    write(STDERR_FILENO, s, strlen(s));
}

void* thread(void* ptr) {
    print_str("thread!\n");
    for(int i = 0; i < 100; i++) {
        print_str("thread loop!\n");
    }
}

int main() {
    pthread_t the_thread;
    int create_return = pthread_create(&the_thread, NULL, thread, NULL);
    if(create_return) {
        print_err("failed to create thread!\n");
        return create_return;
    }
    // pthread_join(the_thread, NULL);
    for(int i = 0; i < 100; i++) {
        print_str("main loop!\n");
        if(!i) pthread_join(the_thread, NULL);
    }
    print_str("thread finished!\n");
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