//
//  Request.cpp
//  HotelControlSystem
//

#include "Request.h"

void Request::initialize_members(Floor *f, std::string direction) {
    this->floor = f;
    this->direction = direction;
}
