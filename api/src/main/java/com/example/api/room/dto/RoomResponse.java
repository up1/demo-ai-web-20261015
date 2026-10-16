package com.example.api.room.dto;

import com.example.api.room.repository.Room;

public record RoomResponse(String id, String name, Integer price, Boolean availability) {

    public static RoomResponse from(Room room) {
        return new RoomResponse(room.getId(), room.getName(), room.getPrice(), room.getAvailability());
    }
}
