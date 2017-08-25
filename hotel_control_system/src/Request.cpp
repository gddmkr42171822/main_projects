//
//  Request.cpp
//  HotelControlSystem
//

#include "Request.h"

Request::Request(int f, std::string direction) {
    this->floor = f;
    this->direction = direction;
}

int Request::get_floor() {
    return this->floor;
}

std::string Request::get_direction() {
    return this->direction;
}
