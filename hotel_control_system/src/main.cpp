//
//  main.cpp
//  HotelControlSystem
//

#include "gtest/gtest.h"
#include "Utils.h"
#include "HotelControlSystem.h"
#include "Floor.h"
#include "Elevator.h"

#include <iostream>
#include <thread>


using ::testing::InitGoogleTest;

namespace {

    TEST(UtilsTest, indexOfSmallestElement) {
        int arrayOfInts[] = {3, 4, 1, 5};
        EXPECT_EQ(Utils::indexOfSmallestElement(arrayOfInts, 4), 2);
    }

    TEST(FloorTest, FloorDirectionButtonAlreadySet) {
        Floor *f = new Floor();
        f->initialize_members(1);
        f->set_floor_direction_button("down");
        ASSERT_TRUE(f->floor_direction_button_already_set("down"));
    }

    TEST(FloorTest, ResetFloorDirectionButton) {
        Floor *f = new Floor();
        f->initialize_members(1);
        f->set_floor_direction_button("down");
        ASSERT_TRUE(f->floor_direction_button_already_set("down"));
        f->reset_floor_direction_button("down");
        ASSERT_FALSE(f->floor_direction_button_already_set("down"));
    }

    TEST(ElevatorTest, DestinationFloorsQueue) {
        Elevator *e = new Elevator();
        Request *r = new Request(15, "down");
        std::queue<Request*> *request_queue = new std::queue<Request*>;
        std::mutex *request_queue_mutex = new std::mutex;

        e->initialize_members(1, request_queue, request_queue_mutex);
        e->add_request_to_destination_floors_queue(r);

        EXPECT_EQ(e->destination_floors_queue_size(), 1);

        r = e->remove_floor_from_destination_floors_queue();
        EXPECT_EQ(e->destination_floors_queue_size(), 0);
        EXPECT_EQ(r->get_floor(), 15);
        EXPECT_EQ(r->get_direction(), "down");
    }

    TEST(ElevatorTest, DetermineDirectionOfTravel) {
        Elevator *e = new Elevator();
        Request *r = new Request(15, "down");
        std::queue<Request*> *request_queue = new std::queue<Request*>;
        std::mutex *request_queue_mutex = new std::mutex;
        e->initialize_members(18, request_queue, request_queue_mutex);
        e->set_current_floor(18);
        e->determine_direction_of_travel();

        EXPECT_EQ(e->get_direction_of_travel(), "stopped");

        e->add_request_to_destination_floors_queue(r);
        e->determine_direction_of_travel();
        EXPECT_EQ(e->get_direction_of_travel(), "down");

        e->remove_floor_from_destination_floors_queue();
        r = new Request(20, "down");
        e->add_request_to_destination_floors_queue(r);
        e->determine_direction_of_travel();
        EXPECT_EQ(e->get_direction_of_travel(), "up");
    }

}

int main(int argc, char **argv) {
    InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
