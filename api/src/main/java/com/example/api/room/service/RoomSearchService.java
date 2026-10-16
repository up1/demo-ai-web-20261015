package com.example.api.room.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.common.exception.ResourceNotFoundException;
import com.example.api.room.dto.RoomResponse;
import com.example.api.room.dto.SearchRoomsRequest;
import com.example.api.room.dto.SearchRoomsResponse;
import com.example.api.room.repository.RoomRepository;
import com.example.api.room.repository.SearchLog;
import com.example.api.room.repository.SearchLogRepository;

@Service
public class RoomSearchService {

    static final String NO_ROOMS_FOUND = "No rooms found for the given criteria.";

    private final SearchRoomsValidator validator;
    private final RoomRepository roomRepository;
    private final SearchLogRepository searchLogRepository;

    public RoomSearchService(SearchRoomsValidator validator, RoomRepository roomRepository,
                             SearchLogRepository searchLogRepository) {
        this.validator = validator;
        this.roomRepository = roomRepository;
        this.searchLogRepository = searchLogRepository;
    }

    @Transactional
    public SearchRoomsResponse search(SearchRoomsRequest request) {
        SearchCriteria criteria = validator.validate(request);

        List<RoomResponse> rooms = roomRepository.findByAvailabilityTrueOrderByIdAsc().stream()
                .map(RoomResponse::from)
                .toList();

        if (rooms.isEmpty()) {
            throw new ResourceNotFoundException(NO_ROOMS_FOUND);
        }

        searchLogRepository.save(new SearchLog(criteria.location(), criteria.checkInDate(),
                criteria.checkOutDate(), criteria.adults(), criteria.children(), criteria.rooms()));

        return new SearchRoomsResponse(rooms);
    }
}
