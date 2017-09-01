#include <iostream>
#include "rpc/client.h"
#include "HotelControlSystem.h"

int main() {
    rpc::client client("127.0.0.1", rpc::constants::DEFAULT_PORT);

    int floor_number;
    std::string direction;
    while (true) {
        std::cout << "Please enter your current floor (0 - 20): " << std::endl;
        std::cin >> floor_number;
        std::cout << "Please enter a direction you would like to go (up or down): " << std::endl;
        std::cin >> direction;

        int elevator = client.call("press_elevator_button_from_floor", floor_number, direction).as<int>();
        std::cout << "The elevator dispatched to the floor is: " << elevator << std::endl;
    }
    return 0;
}
