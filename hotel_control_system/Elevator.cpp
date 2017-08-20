//
//  Elevator.cpp
//  HotelControlSystem
//

#include "Elevator.h"
#include <iostream>



void Elevator::initialize_members(int i) {
    this->elevator_id = i;
    // Current floor and selected floor button are set to the bottom floor
    this->current_floor = 0;
    // The elevator has no direction to begin with
    this->direction_of_travel = "stopped";
    
    // Initialize the button board of floors to false which
    // mean they are illuminated
    for (i = 0; i < 21; i++) {
        this->floor_indicators_pressed[i] = false;
    }
    
}

void Elevator::determine_direction_of_travel() {
    // If the elevator has not floors to go to then it should be stopped
    if (this->selected_floors.empty()) {
        this->direction_of_travel = "stopped";
    } else if (this->current_floor < this->selected_floors.front()) {
    // The elevator must travel up if the floor in its queue to higher than its current floor
        this->direction_of_travel = "up";
    } else if (this->current_floor > this->selected_floors.front()) {
        // The elevator must travel down if the floor in its queue to lower than its current floor
        this->direction_of_travel = "down";
    } else {
    // If the elevators current floor is the one in its queue then remove the floor from its queue and
    // look at the next value
        this->selected_floors.pop();
        this->determine_direction_of_travel();
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

void Elevator::add_floor_to_selected_floors(int floor) {
    this->selected_floors.push(floor);
}

int Elevator::remove_floor_from_selected_floors() {
    int removed_floor = this->selected_floors.front();
    this->selected_floors.pop();
    return removed_floor;
}

int Elevator::selected_floors_size() {
    return (int)this->selected_floors.size();
}

