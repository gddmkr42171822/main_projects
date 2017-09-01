#include <iostream>
#include <thread>
#include "rpc/server.h"
#include "HotelControlSystem.h"

void foo() { std::cout << "foo was called!" << std::endl; }

void bad(int x) {
    if (x == 5) {
        throw std::runtime_error("x == 5. I really don't like 5.");
    }
}

int main() {
    std::queue<Request*> *shared_queue = new std::queue<Request*>;
    std::mutex *request_queue_mutex = new std::mutex;
    HotelControlSystem h = HotelControlSystem();
    h.initialize_members(shared_queue, request_queue_mutex);

    Elevator* elevators = h.get_elevators();

    // Assign a thread to each elevator
    std::thread t1(&Elevator::advance_to_next_step, &elevators[0]);
    std::thread t2(&Elevator::advance_to_next_step, &elevators[1]);
    std::thread t3(&Elevator::advance_to_next_step, &elevators[2]);
    // Assign a thread to handle the arrival of elevators
    std::thread t4(&HotelControlSystem::manage_request_queue, &h);

    // Create a server that listens on port 8080, or whatever the user selected
    rpc::server srv("0.0.0.0", rpc::constants::DEFAULT_PORT);

    int press_elevator_button_from_floor(Floor &f, std::string direction);
    srv.bind("get_request_queue_size", [&h]() {return h.get_request_queue_size();});
    srv.bind("press_elevator_button_from_floor", [&h](int floor_number, std::string direction) {
        return h.press_elevator_button_from_floor(h.get_floors()[floor_number], direction);
    });

    // Run the server loop.
    srv.run();

    return 0;
}
