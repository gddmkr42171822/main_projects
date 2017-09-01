CC = g++
CFLAGS = -Wall -c -g -std=c++14
LFLAGS = -Wall

main.o: main.cc ../../include/rpc/server.h
	$(CC) $(CFLAGS) -c main.cc -I ../../include/rpc/server.h -o main.o
