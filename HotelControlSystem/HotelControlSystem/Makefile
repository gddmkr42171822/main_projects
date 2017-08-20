CC = g++
CFLAGS = -Wall -c
LFLAGS = -Wall

main: main.o HotelControlSystem.o Floor.o Elevator.o
	$(CC) $(LFLAGS) main.o HotelControlSystem.o Floor.o Elevator.o -o main

main.o: main.cpp HotelControlSystem.h
	g++ -c main.cpp

HotelControlSystem.o: HotelControlSystem.cpp HotelControlSystem.h Elevator.h Floor.h
	g++ -c  HotelControlSystem.cpp

Floor.o: Floor.cpp Floor.h
	g++ -c Floor.cpp

Elevator.o: Elevator.cpp Elevator.h
	g++ -c Elevator.cpp

clean:
	rm *.o main