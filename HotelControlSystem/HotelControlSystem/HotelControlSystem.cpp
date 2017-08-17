//
//  HotelControlSystem.cpp
//  HotelControlSystem
//

#include "HotelControlSystem.h"
#include <stdio.h>
#include <iostream>
#include <stdlib.h>

int indexofSmallestElement(int array[], int size)
{
    int index = 0;
    
    for (int i = 1; i < size; i++)
    {
        if(array[i] < array[index])
            index = i;
    }
    
    return index;
}

// Initialize the elevators and floors for the hotel control system object
void HotelControlSystem::initialize_members() {
    int i;
    for (i = 0; i < 3; i++) {
        this->elevators[i] = Elevator();
        this->elevators[i].initialize_members(i);
    }
    for (i = 0; i < 21; i++) {
        this->floors[i] = Floor();
        this->floors[i].initialize_members(i);
    }
}

// Prints out where all the elevators are and what direciton they are travelling
void HotelControlSystem::display_current_elevator_information() {
    int i;
    for (i = 0; i < 3; i++) {
        printf("Elevator %d is at floor %d heading %s.\n",
               this->elevators[i].get_elevator_id(),
               this->elevators[i].get_current_floor(),
               this->elevators[i].get_direction_of_travel().c_str());
    }
}

// Prints out the current floor given an elevator
void HotelControlSystem::show_elevators_current_floor(Elevator &e) {
    std::cout << "Elevators current floor is " << e.get_current_floor() << std::endl;
}

// Method determines which elevator to send to the floor
void HotelControlSystem::dispatch_elevator_to_floor(Floor &f, std::string direction) {
    int i;
    int elevator_closeness[3];
    std::string elevator_direction[3];
    int elevator_queue_size[3];
    for (i = 0; i < 3; i++) {
        elevator_closeness[i] = abs(this->elevators[i].get_current_floor() - f.get_floor_id());
        elevator_direction[i] = this->elevators[i].get_direction_of_travel();
        elevator_queue_size[i] = this->elevators[i].selected_floors_size();
    }
    
    // If elevator is moving towards floor and in the same direction as
    // the person wanted then send that elevator to the floor
    
    
    // It the elevator is stopped with nothing in its queue send it to the floor
    
    // Otherwise just add the floor to the elevator with the smallest queue
    int elevator_with_smallest_queue = indexofSmallestElement(elevator_queue_size, 3);
    this->elevators[elevator_with_smallest_queue].add_floor_to_selected_floors(f.get_floor_id());
    printf("Added floor %d to elevator %d.\n", f.get_floor_id(), elevator_with_smallest_queue);
}

// Method is called when a person presses the up or down arrows for an elevator on a certain floor
void HotelControlSystem::press_elevator_button_from_floor(Floor &f, std::string direction) {
    printf("%s button pressed on floor %d.\n", direction.c_str(), f.get_floor_id());
    
    // Change the direction button for the floor to what they user pressed
    // If the button was not pressed already for the floor, dispatch an elevator
    if (!f.floor_direction_button_already_set(direction)) {
        std::cout << "Button has not been pressed for that floor yet." << std::endl;
        f.set_floor_direction_button(direction);
        
        // Determine which elevator to dispatch to the floor
        this->dispatch_elevator_to_floor(f, direction);
    }
}

// Method is called when a person presses the specific floor button on an elevator
void HotelControlSystem::press_floor_button_from_elevator(Elevator &e, int selected_floor) {
    // Push the selected floor into the destination queue of the elevator
    e.add_floor_to_selected_floors(selected_floor);
}
