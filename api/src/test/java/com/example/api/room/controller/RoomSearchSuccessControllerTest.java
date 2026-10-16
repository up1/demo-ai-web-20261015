package com.example.api.room.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
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

import com.example.api.room.dto.RoomResponse;
import com.example.api.room.dto.SearchRoomsResponse;
import com.example.api.room.repository.SearchLogRepository;
import com.example.api.support.FixedClockConfig;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestRestTemplate
@Import(FixedClockConfig.class)
class RoomSearchSuccessControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SearchLogRepository searchLogRepository;

    @Test
    void tcApi001_validRequestReturnsAvailableRooms() {
        long logsBefore = searchLogRepository.count();
        String body = """
                { "location": "Bangkok", "check_in_date": "2025-10-16", "check_out_date": "2025-10-20",
                  "guests": { "adults": 2, "children": 1, "rooms": 1 } }
                """;

        ResponseEntity<SearchRoomsResponse> response = restTemplate.postForEntity("/api/rooms/search",
                jsonRequest(body), SearchRoomsResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getHeaders().getContentType()).isEqualTo(MediaType.APPLICATION_JSON);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().rooms()).containsExactly(
                new RoomResponse("room_1", "Deluxe Room", 2000, true),
                new RoomResponse("room_2", "Standard Room", 1500, true));
        assertThat(searchLogRepository.count()).isEqualTo(logsBefore + 1);
    }

    @Test
    @SuppressWarnings("unchecked")
    void responseJsonMatchesSpecShape() {
        String body = """
                { "location": "Bangkok", "check_in_date": "2025-10-16", "check_out_date": "2025-10-20",
                  "guests": { "adults": 2, "rooms": 1 } }
                """;

        ResponseEntity<Map> response = restTemplate.postForEntity("/api/rooms/search", jsonRequest(body), Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<Map<String, Object>> rooms = (List<Map<String, Object>>) response.getBody().get("rooms");
        assertThat(rooms.getFirst()).containsOnlyKeys("id", "name", "price", "availability");
    }

    private HttpEntity<String> jsonRequest(String body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>(body, headers);
    }
}
