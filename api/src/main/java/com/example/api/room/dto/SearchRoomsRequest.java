package com.example.api.room.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SearchRoomsRequest(
        String location,
        @JsonProperty("check_in_date") String checkInDate,
        @JsonProperty("check_out_date") String checkOutDate,
        GuestsRequest guests) {
}
