package com.example.api.support;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

/**
 * Pins "today" to 2024-06-01 so the dates used in the spec's API test cases stay valid.
 */
@TestConfiguration
public class FixedClockConfig {

    public static final Clock FIXED_CLOCK = Clock.fixed(Instant.parse("2024-06-01T00:00:00Z"), ZoneOffset.UTC);

    @Bean
    @Primary
    public Clock fixedClock() {
        return FIXED_CLOCK;
    }
}
