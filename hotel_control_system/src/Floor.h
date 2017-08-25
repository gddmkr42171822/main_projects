//
//  Floor.h
//  HotelControlSystem
//

#ifndef Floor_h
#define Floor_h

#include <queue>
#include <string>

class Floor {
    int floor_id;
    bool down_button_pressed;
    bool up_button_pressed;
    std::queue<int> *request_queue;
public:
    int get_floor_id();
    void set_floor_id(int i);
    void set_floor_direction_button(std::string direction);
    bool floor_direction_button_already_set(std::string direction);
    void initialize_members(int i, std::queue<int> *request_queue);
    void add_request_to_queue(int request);
};

#endif /* Floor_h */
