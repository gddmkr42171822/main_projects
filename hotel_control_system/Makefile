CC = g++
CFLAGS = -Wall -c -g -std=c++14
LFLAGS = -Wall

AR = ar
ARFLAGS = -r -v
GTEST_INC = googletest/googletest/include
GTEST_ROOT = googletest/googletest

all: bin/server bin/client tests/main

tests/main: build/main.o build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o build/libgtest.a build/Utils.o
	$(CC) $(LFLAGS) $^ -o $@

build/main.o: src/main.cpp src/HotelControlSystem.h src/Utils.h src/Floor.h src/Elevator.h
	$(CC) $(CFLAGS) -I $(GTEST_INC) src/main.cpp -o build/main.o

build/HotelControlSystem.o: src/HotelControlSystem.cpp src/HotelControlSystem.h src/Elevator.h src/Floor.h src/Request.h src/Utils.h
	$(CC) $(CFLAGS) src/HotelControlSystem.cpp -o build/HotelControlSystem.o

build/Floor.o: src/Floor.cpp src/Floor.h
	$(CC) $(CFLAGS) src/Floor.cpp -o build/Floor.o

build/Elevator.o: src/Elevator.cpp src/Elevator.h src/Request.h
	$(CC) $(CFLAGS) src/Elevator.cpp -o build/Elevator.o

build/Request.o: src/Request.cpp src/Request.h
	$(CC) $(CFLAGS) src/Request.cpp -o build/Request.o

bin/client: build/client.o rpclib/build/output/lib/librpc.a build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o build/Utils.o
	$(CC) $(LFLAGS) $^ -o $@

build/client.o: src/client.cpp rpclib/include/rpc/client.h src/HotelControlSystem.h
	$(CC) $(CFLAGS) -I rpclib/include/ -c src/client.cpp -o build/client.o

bin/server: build/server.o rpclib/build/output/lib/librpc.a build/HotelControlSystem.o build/Floor.o build/Elevator.o build/Request.o build/Utils.o
	$(CC) $(LFLAGS) $^ -o $@

build/server.o: src/server.cpp rpclib/include/rpc/server.h src/HotelControlSystem.h
	$(CC) $(CFLAGS) -I rpclib/include/ -c src/server.cpp -o $@

build/Utils.o: src/Utils.cpp src/Utils.h
	$(CC) $(CFLAGS) -c src/Utils.cpp -o $@

build/libgtest.a: build/gtest-all.o
	$(AR) $(ARFLAGS) $@ $?

build/gtest-all.o: $(GTEST_ROOT)/src/gtest-all.cc
	$(CC) $(CFLAGS) -isystem $(GTEST_INC) -I $(GTEST_ROOT) \
	-pthread $^ -o $@

clean:
	rm -rf *.o *.dSYM bin/* build/* libgtest.a
