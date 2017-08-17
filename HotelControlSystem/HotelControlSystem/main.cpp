//
//  main.cpp
//  HotelControlSystem
//

#include "HotelControlSystem.h"
#include <iostream>

void scenario_one() {
    /* 
    Elevator 1 is stopped on the 5th floor heading up with requests for 
    floors 10, 12 and 18.   Elevator two is heading down, moving, at the 14th floor, with a stop at 2 
    and the lobby.   Elevator 3 is heading up, moving  with a stop at the 15th floor.
    Someone pushed the down button on the 13th floor.
     */
    HotelControlSystem h = HotelControlSystem();
    h.initialize_members();
    
    h.elevators[0].add_floor_to_selected_floors(10);
    h.elevators[0].add_floor_to_selected_floors(12);
    h.elevators[0].add_floor_to_selected_floors(18);
    h.elevators[0].set_current_floor(5);
    h.elevators[0].determine_direction_of_travel();
    
    h.elevators[1].set_current_floor(14);
    h.elevators[1].add_floor_to_selected_floors(2);
    h.elevators[1].add_floor_to_selected_floors(1);
    h.elevators[1].determine_direction_of_travel();
    
    h.elevators[2].set_current_floor(0);
    h.elevators[2].add_floor_to_selected_floors(15);
    h.elevators[2].determine_direction_of_travel();
    
    h.display_current_elevator_information();
    
    h.press_elevator_button_from_floor(h.floors[12], "down");

}

int main(int argc, const char * argv[]) {
    scenario_one();
    return 0;
}

