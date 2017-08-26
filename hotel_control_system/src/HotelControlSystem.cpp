//
//  HotelControlSystem.cpp
//  HotelControlSystem
//

#include "HotelControlSystem.h"
#include <stdio.h>
#include <iostream>
#include <stdlib.h>

int index_of_smallest_element(int array[], int size)
{
    int index = 0;
    for (int i = 1; i < size; i++)
    {
        if(array[i] < array[index]) {
            index = i;
        }
    }
    return index;
}

void HotelControlSystem::manage_request_queue() {
    Request *r;
    while (true) {
        if (!this->request_queue->empty()) {
            this->request_queue_mutex->lock();
            std::cout << "HOTELCONTROLSYSTEM: mutex locked." << std::endl;
            r = this->get_request_from_queue();
            this->reset_floor_button(r->get_floor(), r->get_direction());
            this->request_queue_mutex->unlock();
            std::cout << "HOTELCONTROLSYSTEM: mutex unlocked." << std::endl;
        }
    }
}

void HotelControlSystem::reset_floor_button(int floor, std::string direction) {
    // Only reset the floor direction button if it has been pressed for the floor
    if (this->floors[floor].floor_direction_button_already_set(direction)) {
        this->floors[floor].reset_floor_direction_button(direction);
        printf("Reset floor direction button %s for floor %d.\n", direction.c_str(), floor);
    }
}

Elevator* HotelControlSystem::get_elevators() {
    return this->elevators;
}

Floor* HotelControlSystem::get_floors() {
    return this->floors;
}

// Initialize the elevators and floors for the hotel control system object
void HotelControlSystem::initialize_members(std::queue<Request*> *request_queue, std::mutex *request_queue_mutex) {
    int i;
    for (i = 0; i < 3; i++) {
        this->elevators[i] = Elevator();
        this->elevators[i].initialize_members(i, request_queue, request_queue_mutex);
    }
    for (i = 0; i < 21; i++) {
        this->floors[i] = Floor();
        this->floors[i].initialize_members(i);
    }

    this->request_queue = request_queue;
    this->request_queue_mutex = request_queue_mutex;
}

// Prints out where all the elevators are and what direciton they are travelling
void HotelControlSystem::display_current_elevator_information() {
    int i;
    for (i = 0; i < 3; i++) {
        printf("DCEI: Elevator %d is at floor %d heading %s.\n",
               this->elevators[i].get_elevator_id(),
               this->elevators[i].get_current_floor(),
               this->elevators[i].get_direction_of_travel().c_str());
    }
}

// Prints out the current floor given an elevator
void HotelControlSystem::show_elevators_current_floor(Elevator &e) {
    printf("SECF: Elevators current floor is %d.\n", e.get_current_floor());
}

// Method determines which elevator to send to the floor
int HotelControlSystem::dispatch_elevator_to_floor(Floor &f, std::string direction) {
    int i;
    int floor_id = f.get_floor_id();
    int elevator_closeness[3];
    std::string elevator_direction[3];
    int elevator_queue_size[3];

    for (i = 0; i < 3; i++) {
        elevator_closeness[i] = this->elevators[i].get_current_floor() - floor_id;
        elevator_direction[i] = this->elevators[i].get_direction_of_travel();
        elevator_queue_size[i] = this->elevators[i].destination_floors_queue_size();
    }

    // If elevator is moving towards floor and in the same direction
    // the person wants to go then send the first available elevator to the floor
    for (i = 0; i < 3; i++) {
        // If the elevator is heading in the same direction the person
        // on the floor wants to go
        if (elevator_direction[i] == direction) {
            // If the elevator is below or on the floor the person wants to go up
            if (direction == "up" && elevator_closeness[i] <= 0) {
                printf("DETF: Added floor %d to elevator %d.\n", floor_id, i);
                this->elevators[i].add_request_to_destination_floors_queue(new Request(floor_id, direction));
                return i;
            // If the elevator is above or on the floor and the person wants to go down
            } else if (direction == "down" && elevator_closeness[i] >= 0) {
                printf("DETF: Added floor %d to elevator %d.\n", floor_id, i);
                this->elevators[i].add_request_to_destination_floors_queue(new Request(floor_id, direction));
                return i;
            // The elevator is passed the floor the person wants to go to
            } else {
                printf("DETF: Elevator %d is passed floor %d.", i, floor_id);
            }
        }
    }

    // No elevators are moving in the same direction as the floor check if any
    // are stopped and then dispatch that one
    for (i = 0; i < 3; i++) {
        if (elevator_direction[i] == "stopped") {
            printf("DETF: Added floor %d to elevator %d.\n", floor_id, i);
            this->elevators[i].add_request_to_destination_floors_queue(new Request(floor_id, direction));
            return i;
        }
    }

    // No elevators are moving in the same direction as the floor, none are stopped either,
    // add the floor to the elevator that will be done the soonest
    int elevator_with_smallest_queue = index_of_smallest_element(elevator_queue_size, 3);
    this->elevators[elevator_with_smallest_queue].add_request_to_destination_floors_queue(new Request(floor_id, direction));
    printf("DETF: Added floor %d to elevator %d.\n", floor_id, elevator_with_smallest_queue);
    return elevator_with_smallest_queue;
}

// Method is called when a person presses the up or down arrows for an elevator on a certain floor
int HotelControlSystem::press_elevator_button_from_floor(Floor &f, std::string direction) {
    int elevator = 0;
    printf("PEBFF: %s button pressed on floor %d.\n", direction.c_str(), f.get_floor_id());

    // Change the direction button for the floor to what they user pressed
    // If the button was not pressed already for the floor, dispatch an elevator
    if (!f.floor_direction_button_already_set(direction)) {
        std::cout << "PEBFF: Button has not been pressed for that floor yet." << std::endl;
        f.set_floor_direction_button(direction);

        // Determine which elevator to dispatch to the floor
        elevator = this->dispatch_elevator_to_floor(f, direction);
    } else {
        std::cout << "PEBFF: Button has already been pressed for that floor." << std::endl;
    }
    return elevator;
}

// Method is called when a person presses the specific floor button on an elevator
void HotelControlSystem::press_floor_button_from_elevator(Elevator &e, int selected_floor) {
    // Push the selected floor into the destination queue of the elevator
    e.add_request_to_destination_floors_queue(new Request(selected_floor, "destination"));
}

Request* HotelControlSystem::get_request_from_queue() {
    Request *request = this->request_queue->front();
    this->request_queue->pop();
    return request;
}

int HotelControlSystem::get_request_queue_size() {
    return (int)this->request_queue->size();
}
