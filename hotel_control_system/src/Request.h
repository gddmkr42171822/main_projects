//
//  Request.h
//  HotelControlSystem
//

#ifndef Request_h
#define Request_h

#include <string>

class Request {
    int floor;
    std::string direction;
public:
    Request(int f, std::string direction);
    int get_floor();
    std::string get_direction();
};

#endif /* Request_h */
