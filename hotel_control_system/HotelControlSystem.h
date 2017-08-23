//
//  HotelControlSystem.h
//  HotelControlSystem
//

#ifndef HotelControlSystem_h
#define HotelControlSystem_h

#include "Floor.h"
#include "Elevator.h"

#include <string>

class HotelControlSystem {
    Floor floors[21];
    Elevator elevators[3];
public:

    void initialize_members();
    
    // Displays for the floor and elevator
    void display_current_elevator_information();
    void show_elevators_current_floor(Elevator &e);
    
    // User interactions with the buttons on the floors and elevator
    void press_elevator_button_from_floor(Floor &f, std::string direction);
    void press_floor_button_from_elevator(Elevator &e, int selected_floor);
    
    void dispatch_elevator_to_floor(Floor &f, std::string direction);

    Floor* get_floors();
    Elevator* get_elevators();
    
};

#endif /* HotelControlSystem_h */
