package com.example.api.room.service;

import java.time.Clock;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.api.common.exception.InvalidRequestException;
import com.example.api.room.dto.GuestsRequest;
import com.example.api.room.dto.SearchRoomsRequest;

/**
 * Validates search requests in the order listed in the spec, so the first failing field wins.
 */
@Component
public class SearchRoomsValidator {

    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("uuuu-MM-dd").withResolverStyle(ResolverStyle.STRICT);

    private final Clock clock;
    private final List<String> validLocations;

    public SearchRoomsValidator(Clock clock, @Value("${app.rooms.valid-locations}") List<String> validLocations) {
        this.clock = clock;
        this.validLocations = validLocations;
    }

    public SearchCriteria validate(SearchRoomsRequest request) {
        if (request == null) {
            throw new InvalidRequestException("Invalid request parameters.");
        }

        String location = Optional.ofNullable(request.location())
                .map(String::trim)
                .flatMap(this::findValidLocation)
                .orElseThrow(() -> new InvalidRequestException("Invalid location"));

        LocalDate today = LocalDate.now(clock);
        LocalDate checkIn = parseDate(request.checkInDate())
                .filter(date -> !date.isBefore(today))
                .orElseThrow(() -> new InvalidRequestException("Invalid check-in date"));

        LocalDate checkOut = parseDate(request.checkOutDate())
                .filter(date -> date.isAfter(checkIn))
                .orElseThrow(() -> new InvalidRequestException("Invalid check-out date"));

        Optional<GuestsRequest> guests = Optional.ofNullable(request.guests());

        int adults = guests.map(GuestsRequest::adults)
                .filter(value -> value > 0)
                .orElseThrow(() -> new InvalidRequestException("Invalid number of adults"));

        int children = guests.map(GuestsRequest::children)
                .map(value -> {
                    if (value < 0) {
                        throw new InvalidRequestException("Invalid number of children");
                    }
                    return value;
                })
                .orElse(0);

        int rooms = guests.map(GuestsRequest::rooms)
                .filter(value -> value > 0)
                .orElseThrow(() -> new InvalidRequestException("Invalid number of rooms"));

        return new SearchCriteria(location, checkIn, checkOut, adults, children, rooms);
    }

    private Optional<String> findValidLocation(String location) {
        return validLocations.stream()
                .map(String::trim)
                .filter(city -> city.equalsIgnoreCase(location))
                .findFirst();
    }

    private Optional<LocalDate> parseDate(String value) {
        if (value == null) {
            return Optional.empty();
        }
        try {
            return Optional.of(LocalDate.parse(value, DATE_FORMAT));
        } catch (DateTimeParseException ex) {
            return Optional.empty();
        }
    }
}
