CC = g++
CFLAGS = -Wall -c -g -std=c++14
LFLAGS = -Wall

all: bin/main bin/server bin/client

bin/main: build/main.o build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o
	$(CC) $(LFLAGS) build/main.o build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o -o bin/main

build/main.o: src/main.cpp src/HotelControlSystem.h
	$(CC) $(CFLAGS) src/main.cpp -o build/main.o

build/HotelControlSystem.o: src/HotelControlSystem.cpp src/HotelControlSystem.h src/Elevator.h src/Floor.h src/Request.h
	$(CC) $(CFLAGS) src/HotelControlSystem.cpp -o build/HotelControlSystem.o

build/Floor.o: src/Floor.cpp src/Floor.h
	$(CC) $(CFLAGS) src/Floor.cpp -o build/Floor.o

build/Elevator.o: src/Elevator.cpp src/Elevator.h src/Request.h
	$(CC) $(CFLAGS) src/Elevator.cpp -o build/Elevator.o

build/Request.o: src/Request.cpp src/Request.h
	$(CC) $(CFLAGS) src/Request.cpp -o build/Request.o

bin/client: build/client.o rpclib/build/output/lib/librpc.a build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o
	$(CC) $(LFLAGS) rpclib/build/output/lib/librpc.a build/client.o build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o -o bin/client

build/client.o: src/client.cpp rpclib/include/rpc/client.h src/HotelControlSystem.h
	$(CC) $(CFLAGS) -I rpclib/include/ -c src/client.cpp -o build/client.o

bin/server: build/server.o rpclib/build/output/lib/librpc.a build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o
	$(CC) $(LFLAGS) rpclib/build/output/lib/librpc.a build/server.o build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o -o bin/server

build/server.o: src/server.cpp rpclib/include/rpc/server.h src/HotelControlSystem.h
	$(CC) $(CFLAGS) -I rpclib/include/ -c src/server.cpp -o build/server.o

clean:
	rm -rf *.o *.dSYM bin/* build/*
