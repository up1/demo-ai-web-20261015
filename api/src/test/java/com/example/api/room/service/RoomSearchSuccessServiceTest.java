package com.example.api.room.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.api.room.dto.GuestsRequest;
import com.example.api.room.dto.RoomResponse;
import com.example.api.room.dto.SearchRoomsRequest;
import com.example.api.room.dto.SearchRoomsResponse;
import com.example.api.room.repository.Room;
import com.example.api.room.repository.RoomRepository;
import com.example.api.room.repository.SearchLog;
import com.example.api.room.repository.SearchLogRepository;
import com.example.api.support.FixedClockConfig;

@ExtendWith(MockitoExtension.class)
class RoomSearchSuccessServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private SearchLogRepository searchLogRepository;

    private RoomSearchService service;

    @BeforeEach
    void setUp() {
        SearchRoomsValidator validator = new SearchRoomsValidator(FixedClockConfig.FIXED_CLOCK,
                List.of("Bangkok", "Chiang Mai"));
        service = new RoomSearchService(validator, roomRepository, searchLogRepository);
    }

    @Test
    void returnsAvailableRooms() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc()).thenReturn(List.of(
                new Room("room_1", "Deluxe Room", 2000, true),
                new Room("room_2", "Standard Room", 1500, true)));

        SearchRoomsResponse response = service.search(validRequest());

        assertThat(response.rooms()).containsExactly(
                new RoomResponse("room_1", "Deluxe Room", 2000, true),
                new RoomResponse("room_2", "Standard Room", 1500, true));
    }

    @Test
    void writesSearchLogWhenRoomsFound() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc())
                .thenReturn(List.of(new Room("room_1", "Deluxe Room", 2000, true)));

        service.search(validRequest());

        ArgumentCaptor<SearchLog> captor = ArgumentCaptor.forClass(SearchLog.class);
        verify(searchLogRepository).save(captor.capture());
        SearchLog log = captor.getValue();
        assertThat(log.getLocation()).isEqualTo("Bangkok");
        assertThat(log.getCheckInDate()).isEqualTo(LocalDate.of(2025, 10, 16));
        assertThat(log.getCheckOutDate()).isEqualTo(LocalDate.of(2025, 10, 20));
        assertThat(log.getGuestsAdults()).isEqualTo(2);
        assertThat(log.getGuestsChildren()).isEqualTo(1);
        assertThat(log.getGuestsRooms()).isEqualTo(1);
    }

    @Test
    void acceptsCheckInToday() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc())
                .thenReturn(List.of(new Room("room_1", "Deluxe Room", 2000, true)));

        SearchRoomsResponse response = service.search(new SearchRoomsRequest("Bangkok", "2024-06-01",
                "2024-06-02", new GuestsRequest(1, 0, 1)));

        assertThat(response.rooms()).hasSize(1);
    }

    @Test
    void defaultsChildrenToZeroWhenOmittedAndMatchesLocationCaseInsensitively() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc())
                .thenReturn(List.of(new Room("room_1", "Deluxe Room", 2000, true)));

        service.search(new SearchRoomsRequest("  chiang mai ", "2025-10-16", "2025-10-20",
                new GuestsRequest(2, null, 1)));

        ArgumentCaptor<SearchLog> captor = ArgumentCaptor.forClass(SearchLog.class);
        verify(searchLogRepository).save(captor.capture());
        assertThat(captor.getValue().getGuestsChildren()).isZero();
        assertThat(captor.getValue().getLocation()).isEqualTo("Chiang Mai");
    }

    private SearchRoomsRequest validRequest() {
        return new SearchRoomsRequest("Bangkok", "2025-10-16", "2025-10-20", new GuestsRequest(2, 1, 1));
    }
}
