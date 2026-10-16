package com.example.api.room.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.room.dto.SearchRoomsRequest;
import com.example.api.room.dto.SearchRoomsResponse;
import com.example.api.room.service.RoomSearchService;

@RestController
@RequestMapping("/api/rooms")
public class RoomSearchController {

    private final RoomSearchService roomSearchService;

    public RoomSearchController(RoomSearchService roomSearchService) {
        this.roomSearchService = roomSearchService;
    }

    @PostMapping(path = "/search", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SearchRoomsResponse search(@RequestBody SearchRoomsRequest request) {
        return roomSearchService.search(request);
    }
}
