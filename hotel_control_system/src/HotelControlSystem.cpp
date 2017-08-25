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

Elevator* HotelControlSystem::get_elevators() {
    return this->elevators;
}

Floor* HotelControlSystem::get_floors() {
    return this->floors;
}

// Initialize the elevators and floors for the hotel control system object
void HotelControlSystem::initialize_members(std::queue<Request*> *request_queue) {
    int i;
    for (i = 0; i < 3; i++) {
        this->elevators[i] = Elevator();
        this->elevators[i].initialize_members(i, request_queue);
    }
    for (i = 0; i < 21; i++) {
        this->floors[i] = Floor();
        this->floors[i].initialize_members(i);
    }

    this->request_queue = request_queue;
}

// Prints out where all the elevators are and what direciton they are travelling
void HotelControlSystem::display_current_elevator_information() {
    int i;
    for (i = 0; i < 3; i++) {
        printf("Elevator %d is at floor %d heading %s.\n",
               this->elevators[i].get_elevator_id(),
               this->elevators[i].get_current_floor(),
               this->elevators[i].get_direction_of_travel().c_str());
    }
}

// Prints out the current floor given an elevator
void HotelControlSystem::show_elevators_current_floor(Elevator &e) {
    std::cout << "Elevators current floor is " << e.get_current_floor() << std::endl;
}

// Method determines which elevator to send to the floor
void HotelControlSystem::dispatch_elevator_to_floor(Floor &f, std::string direction) {
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
                printf("Up: Added floor %d to elevator %d.\n", floor_id, i);
                this->elevators[i].add_floor_to_destination_floors_queue(floor_id);
                return;
            // If the elevator is above or on the floor and the person wants to go down
            } else if (direction == "down" && elevator_closeness[i] >= 0) {
                printf("Down: Added floor %d to elevator %d.\n", floor_id, i);
                this->elevators[i].add_floor_to_destination_floors_queue(floor_id);
                return;
            // The elevator is passed the floor the person wants to go to
            } else {
                printf("Elevator %d is passed floor %d.", i, floor_id);
            }
        }
    }

    // No elevators are moving in the same direction as the floor check if any
    // are stopped and then dispatch that one
    for (i = 0; i < 3; i++) {
        if (elevator_direction[i] == "stopped") {
            printf("Stopped: Added floor %d to elevator %d.\n", floor_id, i);
            this->elevators[i].add_floor_to_destination_floors_queue(floor_id);
            return;
        }
    }

    // No elevators are moving in the same direction as the floor, none are stopped either,
    // add the floor to the elevator that will be done the soonest
    int elevator_with_smallest_queue = index_of_smallest_element(elevator_queue_size, 3);
    this->elevators[elevator_with_smallest_queue].add_floor_to_destination_floors_queue(floor_id);
    printf("Smallest Queue: Added floor %d to elevator %d.\n", floor_id, elevator_with_smallest_queue);
    return;
}

// Method is called when a person presses the up or down arrows for an elevator on a certain floor
void HotelControlSystem::press_elevator_button_from_floor(Floor &f, std::string direction) {
    printf("%s button pressed on floor %d.\n", direction.c_str(), f.get_floor_id());

    // Change the direction button for the floor to what they user pressed
    // If the button was not pressed already for the floor, dispatch an elevator
    if (!f.floor_direction_button_already_set(direction)) {
        std::cout << "Button has not been pressed for that floor yet." << std::endl;
        f.set_floor_direction_button(direction);

        // Determine which elevator to dispatch to the floor
        this->dispatch_elevator_to_floor(f, direction);
    }
}

// Method is called when a person presses the specific floor button on an elevator
void HotelControlSystem::press_floor_button_from_elevator(Elevator &e, int selected_floor) {
    // Push the selected floor into the destination queue of the elevator
    e.add_floor_to_destination_floors_queue(selected_floor);
}

Request* HotelControlSystem::get_request_from_queue() {
    Request *request = this->request_queue->front();
    this->request_queue->pop();
    return request;
}

int HotelControlSystem::get_request_queue_size() {
    return (int)this->request_queue->size();
}
