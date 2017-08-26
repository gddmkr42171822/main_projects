//
//  HotelControlSystem.h
//  HotelControlSystem
//

#ifndef HotelControlSystem_h
#define HotelControlSystem_h

#include "Floor.h"
#include "Elevator.h"
#include "Request.h"

#include <queue>
#include <string>

class HotelControlSystem {
    Floor floors[21];
    Elevator elevators[3];
    std::queue<Request*> *request_queue;

public:

    void initialize_members(std::queue<Request*> *request_queue);

    // Displays for the floor and elevator
    void display_current_elevator_information();
    void show_elevators_current_floor(Elevator &e);

    // User interactions with the buttons on the floors and elevator
    int press_elevator_button_from_floor(Floor &f, std::string direction);
    void press_floor_button_from_elevator(Elevator &e, int selected_floor);

    int dispatch_elevator_to_floor(Floor &f, std::string direction);
    void reset_floor_button(Floor &f, std::string direction);

    Floor* get_floors();
    Elevator* get_elevators();

    Request* get_request_from_queue();
    int get_request_queue_size();

};

#endif /* HotelControlSystem_h */
