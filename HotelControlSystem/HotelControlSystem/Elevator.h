//
//  Elevator.h
//  HotelControlSystem
//

#ifndef Elevator_h
#define Elevator_h

#include <string>
#include <queue>

class Elevator {
    int elevator_id;
    int current_floor;
    std::queue<int> selected_floors;
    bool floor_indicators_pressed[21];
    std::string direction_of_travel;
public:
    void initialize_members(int i);
    void determine_direction_of_travel();
    int get_current_floor();
    void set_current_floor(int i);
    int get_elevator_id();
    std::string get_direction_of_travel();
    void add_floor_to_selected_floors(int floor);
    int remove_floor_from_selected_floors();
    int selected_floors_size();
};

#endif /* Elevator_h */
