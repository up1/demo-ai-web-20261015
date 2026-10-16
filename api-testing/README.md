# API testing with Bruno

Test cases for `POST /api/rooms/search` from [requirements/req_search_rooms_api.md](../requirements/req_search_rooms_api.md).

| Test case | File | Expected |
|-----------|------|----------|
| TC-API_001 : Valid request | `search_rooms_case_200.yml` | `200 OK` with rooms matching the JSON schema |
| TC-API_002 : Invalid location | `search_rooms_case_400_invalid_location.yml` | `400` with "Invalid location" |
| TC-API_003 : Invalid check-in date | `search_rooms_case_400_invalid_check_in_date.yml` | `400` with "Invalid check-in date" |
| TC-API_004 : Invalid check-out date | `search_rooms_case_400_invalid_check_out_date.yml` | `400` with "Invalid check-out date" |

## Run

Start the API on `http://localhost:8080`, then:

```
cd api-testing
bru run
```
