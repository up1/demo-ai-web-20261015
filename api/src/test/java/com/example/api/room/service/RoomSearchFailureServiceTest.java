package com.example.api.room.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.api.common.exception.InvalidRequestException;
import com.example.api.common.exception.ResourceNotFoundException;
import com.example.api.room.dto.GuestsRequest;
import com.example.api.room.dto.SearchRoomsRequest;
import com.example.api.room.repository.RoomRepository;
import com.example.api.room.repository.SearchLog;
import com.example.api.room.repository.SearchLogRepository;
import com.example.api.support.FixedClockConfig;

@ExtendWith(MockitoExtension.class)
class RoomSearchFailureServiceTest {

    private static final GuestsRequest GUESTS = new GuestsRequest(2, 1, 1);

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

    static Stream<Arguments> invalidRequests() {
        return Stream.of(
                Arguments.of(new SearchRoomsRequest("InvalidCity", "2024-07-01", "2024-07-05", GUESTS), "Invalid location"),
                Arguments.of(new SearchRoomsRequest(null, "2024-07-01", "2024-07-05", GUESTS), "Invalid location"),
                Arguments.of(new SearchRoomsRequest("", "2024-07-01", "2024-07-05", GUESTS), "Invalid location"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2023-07-01", "2024-07-05", GUESTS), "Invalid check-in date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024/07/01", "2024-07-05", GUESTS), "Invalid check-in date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-02-30", "2024-07-05", GUESTS), "Invalid check-in date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", null, "2024-07-05", GUESTS), "Invalid check-in date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-05", "2024-07-01", GUESTS), "Invalid check-out date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-05", "2024-07-05", GUESTS), "Invalid check-out date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-05", "07-10-2024", GUESTS), "Invalid check-out date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-05", null, GUESTS), "Invalid check-out date"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-01", "2024-07-05", new GuestsRequest(0, 1, 1)), "Invalid number of adults"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-01", "2024-07-05", new GuestsRequest(null, 1, 1)), "Invalid number of adults"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-01", "2024-07-05", null), "Invalid number of adults"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-01", "2024-07-05", new GuestsRequest(2, -1, 1)), "Invalid number of children"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-01", "2024-07-05", new GuestsRequest(2, 1, 0)), "Invalid number of rooms"),
                Arguments.of(new SearchRoomsRequest("Bangkok", "2024-07-01", "2024-07-05", new GuestsRequest(2, 1, null)), "Invalid number of rooms"));
    }

    @ParameterizedTest
    @MethodSource("invalidRequests")
    void rejectsInvalidRequest(SearchRoomsRequest request, String expectedMessage) {
        assertThatThrownBy(() -> service.search(request))
                .isInstanceOf(InvalidRequestException.class)
                .hasMessage(expectedMessage);

        verifyNoInteractions(roomRepository, searchLogRepository);
    }

    @Test
    void throwsNotFoundWhenNoRoomsAvailableAndDoesNotWriteLog() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc()).thenReturn(List.of());

        assertThatThrownBy(() -> service.search(new SearchRoomsRequest("Bangkok", "2025-10-16", "2025-10-20", GUESTS)))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("No rooms found for the given criteria.");

        verify(searchLogRepository, never()).save(any(SearchLog.class));
    }

    @Test
    void propagatesRepositoryFailure() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc()).thenThrow(new IllegalStateException("db down"));

        assertThatThrownBy(() -> service.search(new SearchRoomsRequest("Bangkok", "2025-10-16", "2025-10-20", GUESTS)))
                .isInstanceOf(IllegalStateException.class);
    }
}
