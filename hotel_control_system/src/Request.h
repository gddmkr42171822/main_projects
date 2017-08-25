//
//  Request.h
//  HotelControlSystem
//

#ifndef Request_h
#define Request_h

#include "Floor.h"
#include <string>

class Request {
    Floor *floor;
    std::string direction;
public:
    void initialize_members(Floor *f, std::string direction);
};

#endif /* Request_h */
