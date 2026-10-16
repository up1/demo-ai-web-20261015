package com.example.api.room.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureTestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.example.api.common.exception.ErrorResponse;
import com.example.api.room.repository.RoomRepository;
import com.example.api.room.repository.SearchLogRepository;
import com.example.api.support.FixedClockConfig;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestRestTemplate
@Import(FixedClockConfig.class)
class RoomSearchFailureControllerTest {

    private static final String VALID_BODY = """
            { "location": "Bangkok", "check_in_date": "2025-10-16", "check_out_date": "2025-10-20",
              "guests": { "adults": 2, "children": 1, "rooms": 1 } }
            """;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SearchLogRepository searchLogRepository;

    @MockitoBean
    private RoomRepository roomRepository;

    @ParameterizedTest(name = "{0}")
    @CsvSource(delimiter = '|', textBlock = """
            TC-API_002 invalid location       | InvalidCity | 2024-07-01 | 2024-07-05 | 2 | 1  | 1 | Invalid location
            TC-API_003 check-in in the past   | Bangkok     | 2023-07-01 | 2024-07-05 | 2 | 1  | 1 | Invalid check-in date
            TC-API_004 check-out before in    | Bangkok     | 2024-07-05 | 2024-07-01 | 2 | 1  | 1 | Invalid check-out date
            bad check-in format               | Bangkok     | 01-07-2024 | 2024-07-05 | 2 | 1  | 1 | Invalid check-in date
            zero adults                       | Bangkok     | 2024-07-01 | 2024-07-05 | 0 | 1  | 1 | Invalid number of adults
            negative children                 | Bangkok     | 2024-07-01 | 2024-07-05 | 2 | -1 | 1 | Invalid number of children
            zero rooms                        | Bangkok     | 2024-07-01 | 2024-07-05 | 2 | 1  | 0 | Invalid number of rooms
            """)
    void invalidRequestReturnsBadRequest(String testCase, String location, String checkIn, String checkOut,
                                         int adults, int children, int rooms, String expectedMessage) {
        String body = """
                { "location": "%s", "check_in_date": "%s", "check_out_date": "%s",
                  "guests": { "adults": %d, "children": %d, "rooms": %d } }
                """.formatted(location, checkIn, checkOut, adults, children, rooms);

        ResponseEntity<ErrorResponse> response = post(body);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getHeaders().getContentType()).isEqualTo(MediaType.APPLICATION_JSON);
        assertThat(response.getBody()).isEqualTo(new ErrorResponse(expectedMessage));
    }

    @Test
    void malformedJsonReturnsBadRequest() {
        ResponseEntity<ErrorResponse> response = post("{ \"location\": ");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(new ErrorResponse("Invalid request parameters."));
    }

    @Test
    void wrongFieldTypeReturnsBadRequest() {
        ResponseEntity<ErrorResponse> response = post("""
                { "location": "Bangkok", "check_in_date": "2025-10-16", "check_out_date": "2025-10-20",
                  "guests": { "adults": "two", "rooms": 1 } }
                """);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(new ErrorResponse("Invalid request parameters."));
    }

    @Test
    void noRoomsReturnsNotFoundWithoutWritingLog() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc()).thenReturn(List.of());
        long logsBefore = searchLogRepository.count();

        ResponseEntity<ErrorResponse> response = post(VALID_BODY);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getHeaders().getContentType()).isEqualTo(MediaType.APPLICATION_JSON);
        assertThat(response.getBody()).isEqualTo(new ErrorResponse("No rooms found for the given criteria."));
        assertThat(searchLogRepository.count()).isEqualTo(logsBefore);
    }

    @Test
    void unexpectedErrorReturnsInternalServerError() {
        when(roomRepository.findByAvailabilityTrueOrderByIdAsc()).thenThrow(new IllegalStateException("db down"));

        ResponseEntity<ErrorResponse> response = post(VALID_BODY);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getHeaders().getContentType()).isEqualTo(MediaType.APPLICATION_JSON);
        assertThat(response.getBody()).isEqualTo(new ErrorResponse("An unexpected error occurred."));
    }

    private ResponseEntity<ErrorResponse> post(String body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return restTemplate.postForEntity("/api/rooms/search", new HttpEntity<>(body, headers), ErrorResponse.class);
    }
}
