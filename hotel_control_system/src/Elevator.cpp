//
//  Elevator.cpp
//  HotelControlSystem
//

#include "Elevator.h"
#include <iostream>
#include <chrono>
#include <thread>


void Elevator::advance_to_next_step() {
    while (true) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        // Check to see if the queue has some floors to go to
        if (!this->destination_floors_queue.empty()) {
            // printf("ATNS: Elevators %d current floor is %d.\n", this->elevator_id, this->current_floor);
          // If we are at the correct floor which means the elevators current floor
          // is the floor we were supposed to go to
          if (this->destination_floors_queue.front()->get_floor() == this->current_floor) {
              this->arrival_at_floor();
          // If we arent at the correct floor we need to go to the next floor (increment or decrement) depending on
          // the direction of travel we need to go
          } else {
              this->determine_direction_of_travel();
              if (this->direction_of_travel == "up") {
                  this->current_floor += 1;
              } else {
                  this->current_floor -= 1;
              }
          }
        // The destination floor queue is empty and direction of travel will be stopped
        } else {
            this->determine_direction_of_travel();
        }
    }
}

void Elevator::arrival_at_floor() {
    printf("AAF: Elevator %d arrived at floor %d.\n", this->elevator_id, this->current_floor);

    // Remove the floor from the desitination floors queue
    Request *df = this->remove_floor_from_destination_floors_queue();


    // Alert hotel control system to turn the floors lights off on that floor
    this->request_queue_mutex->lock();
    std::cout << "ELEVATOR: mutex locked." << std::endl;
    this->add_request_to_queue(df);
    this->request_queue_mutex->unlock();
    std::cout << "ELEVATOR: mutex unlocked." << std::endl;

    // Set the floor indicator to false if it pressed for that floor
    this->floor_indicators_pressed[this->current_floor] = false;

    // Determine direction of travel to go to the next floor
    this->determine_direction_of_travel();
}


void Elevator::initialize_members(int i, std::queue<Request*> *request_queue, std::mutex *request_queue_mutex) {
    this->elevator_id = i;
    // Set the current floor and destination floor button are set to the bottom floor
    this->current_floor = 0;
    this->destination_floor = 0;
    // The elevator has no direction to begin with
    this->direction_of_travel = "stopped";

    // Initialize the button board of floors to false which
    // means they are not illuminated
    for (i = 0; i < 21; i++) {
        this->floor_indicators_pressed[i] = false;
    }

    this->request_queue = request_queue;
    this->request_queue_mutex = request_queue_mutex;
}

void Elevator::determine_direction_of_travel() {
    // If the elevator has no floors to go to then it should be stopped
    if (this->destination_floors_queue.empty()) {
        this->direction_of_travel = "stopped";
    } else if (this->current_floor < this->destination_floors_queue.front()->get_floor()) {
    // The elevator must travel up if the floor in its queue to higher than its current floor
        this->direction_of_travel = "up";
    } else if (this->current_floor > this->destination_floors_queue.front()->get_floor()) {
        // The elevator must travel down if the floor in its queue to lower than its current floor
        this->direction_of_travel = "down";
    } else {

    }
}

int Elevator::get_current_floor() {
    return this->current_floor;
}

void Elevator::set_current_floor(int i) {
    this->current_floor = i;
}

int Elevator::get_elevator_id() {
    return this->elevator_id;
}

std::string Elevator::get_direction_of_travel() {
    return this->direction_of_travel;
}

void Elevator::add_request_to_destination_floors_queue(Request *r) {
    this->destination_floors_queue.push(r);
}

Request* Elevator::remove_floor_from_destination_floors_queue() {
    Request *r = this->destination_floors_queue.front();
    this->destination_floors_queue.pop();
    return r;
}

int Elevator::destination_floors_queue_size() {
    return (int)this->destination_floors_queue.size();
}

void Elevator::add_request_to_queue(Request *request) {
    this->request_queue->push(request);
}
