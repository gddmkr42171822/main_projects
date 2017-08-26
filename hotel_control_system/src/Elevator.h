//
//  Elevator.h
//  HotelControlSystem
//

#ifndef Elevator_h
#define Elevator_h

#include "Request.h"

#include <string>
#include <queue>
#include <mutex>

class Elevator {
    int elevator_id;
    int current_floor;
    int destination_floor;
    std::queue<Request*> destination_floors_queue;
    bool floor_indicators_pressed[21];
    std::string direction_of_travel;
    std::queue<Request*> *request_queue;
    std::mutex *request_queue_mutex;
public:
    void initialize_members(int i, std::queue<Request*> *request_queue, std::mutex *request_queue_mutex);
    void determine_direction_of_travel();
    int get_current_floor();
    void set_current_floor(int i);
    int get_elevator_id();
    std::string get_direction_of_travel();
    void add_request_to_destination_floors_queue(Request *r);
    Request* remove_floor_from_destination_floors_queue();
    int destination_floors_queue_size();
    void add_request_to_queue(Request *request);

    // TODO
    void arrival_at_floor();
    void advance_to_next_step();
};

#endif /* Elevator_h */
