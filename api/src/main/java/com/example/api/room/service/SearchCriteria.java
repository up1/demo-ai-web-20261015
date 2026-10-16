package com.example.api.room.service;

import java.time.LocalDate;

/**
 * Validated and parsed search criteria.
 */
public record SearchCriteria(String location, LocalDate checkInDate, LocalDate checkOutDate,
                             int adults, int children, int rooms) {
}
