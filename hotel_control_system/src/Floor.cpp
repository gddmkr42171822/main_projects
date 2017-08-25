//
//  Floor.cpp
//  HotelControlSystem
//

#include "Floor.h"
#include <stdio.h>

int Floor::get_floor_id() {
    return this->floor_id;
}

void Floor::set_floor_id(int i) {
    this->floor_id = i;
}

// Set the floor direction button the user pressed
// Return false if the button was not already pressed before for the floor
// Return true if the button was already pressed
void Floor::set_floor_direction_button(std::string direction) {
    if (direction == "up") {
        this->up_button_pressed = true;
    } else {
        this->down_button_pressed = true;
    }
}

bool Floor::floor_direction_button_already_set(std::string direction) {
    if (direction == "up") {
        if (this->up_button_pressed == true) {
            return true;
        } else {
            return false;
        }
    } else {
        if (this->down_button_pressed == true) {
            return true;
        } else {
            return false;
        }
    }
}

// The elevators seen on the floor do not have a direction when initialized
void Floor::initialize_members(int i, std::queue<int> *request_queue) {
    this->floor_id = i;
    this->down_button_pressed = false;
    this->up_button_pressed = false;
    this->request_queue = request_queue;
}

void Floor::add_request_to_queue(int request) {
    this->request_queue->push(request);
}
