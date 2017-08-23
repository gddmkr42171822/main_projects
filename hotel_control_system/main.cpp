//
//  main.cpp
//  HotelControlSystem
//

#include "HotelControlSystem.h"
#include <iostream>

void assert(int test, std::string msg) {
    if (!test) {
        printf("FAILED: %s \n", msg.c_str());
    } else {
        printf("PASSED: %s \n", msg.c_str());
    }
}

void scenario_one() {
    /*
    Elevator 1 is stopped on the 5th floor heading up with requests for
    floors 10, 12 and 18.   Elevator two is heading down, moving, at the 14th floor, with a stop at 2
    and the lobby.   Elevator 3 is heading up, moving  with a stop at the 15th floor.
    Someone pushed the down button on the 13th floor.
     */
    HotelControlSystem h = HotelControlSystem();
    h.initialize_members();

    Floor* floors = h.get_floors();
    Elevator* elevators = h.get_elevators();

    elevators[0].add_floor_to_selected_floors(10);
    elevators[0].add_floor_to_selected_floors(12);
    elevators[0].add_floor_to_selected_floors(18);
    elevators[0].set_current_floor(5);
    elevators[0].determine_direction_of_travel();

    elevators[1].set_current_floor(14);
    elevators[1].add_floor_to_selected_floors(2);
    elevators[1].add_floor_to_selected_floors(0);
    elevators[1].determine_direction_of_travel();

    elevators[2].set_current_floor(0);
    elevators[2].add_floor_to_selected_floors(15);
    elevators[2].determine_direction_of_travel();

    h.display_current_elevator_information();

    h.press_elevator_button_from_floor(floors[12], "down");
    h.press_elevator_button_from_floor(floors[0], "up");

    assert(elevators[1].selected_floors_size() == 3, "Elevator 1 has 3 floors to go to.");
    assert(elevators[2].selected_floors_size() == 2, "Elevator 2 has 2 floors to go to.");
}

int main(int argc, const char * argv[]) {
    scenario_one();
    return 0;
}
