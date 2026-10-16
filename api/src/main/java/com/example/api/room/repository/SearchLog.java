package com.example.api.room.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "search_logs")
public class SearchLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @Column(name = "guests_adults")
    private Integer guestsAdults;

    @Column(name = "guests_children")
    private Integer guestsChildren;

    @Column(name = "guests_rooms")
    private Integer guestsRooms;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    protected SearchLog() {
    }

    public SearchLog(String location, LocalDate checkInDate, LocalDate checkOutDate,
                     Integer guestsAdults, Integer guestsChildren, Integer guestsRooms) {
        this.location = location;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guestsAdults = guestsAdults;
        this.guestsChildren = guestsChildren;
        this.guestsRooms = guestsRooms;
    }

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public Integer getGuestsAdults() {
        return guestsAdults;
    }

    public Integer getGuestsChildren() {
        return guestsChildren;
    }

    public Integer getGuestsRooms() {
        return guestsRooms;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
