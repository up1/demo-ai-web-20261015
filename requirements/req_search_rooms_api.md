# REST API :: Search rooms by criterias


## API Specification
### Endpoint
* `POST //api/rooms/search`
### Request Headers
* `Content-Type: application/json`
### Request Body in JSON format
```json
{
  "location": "Bangkok",
  "check_in_date": "2026-10-15",
  "check_out_date": "2026-10-20",
  "guests": {
    "adults": 2,
    "children": 1,
    "rooms": 1
  }
}
```

### Response with 200 OK
* Response Headers
    * `Content-Type: application/json`
* Response Body in JSON format
```json
{
  "rooms": [
    {
      "id": "room_1",
      "name": "Deluxe Room",
      "price": 2000,
      "availability": true
    },
    {
      "id": "room_2",
      "name": "Standard Room",
      "price": 1500,
      "availability": true
    }
  ]
}
```

### Response with 404 Not Found
* Response Headers
    * `Content-Type: application/json`
* Response Body in JSON format
```json
{
  "message": "No rooms found for the given criteria."
}
```

### Response with 400 Bad Request
* Response Headers
    * `Content-Type: application/json`
* Response Body in JSON format
```json
{
  "message": "Invalid request parameters."
}
```

### Response with 500 Internal Server Error
* Response Headers
    * `Content-Type: application/json`
* Response Body in JSON format
```json
{
  "message": "An unexpected error occurred."
}
```

## Input validations with error messages

| Field | Type | Required | Validation | Error message |
|-------|------|----------|------------|------------|
| location | string | yes | Must be a valid city name | "Invalid location" |
| check_in_date | string | yes | Must be in `YYYY-MM-DD` format and not in the past | "Invalid check-in date" |
| check_out_date | string | yes | Must be in `YYYY-MM-DD` format and after `check_in_date` | "Invalid check-out date" |
| guests.adults | integer | yes | Must be greater than 0 | "Invalid number of adults" |
| guests.children | integer | no | Must be 0 or greater | "Invalid number of children" |
| guests.rooms | integer | yes | Must be greater than 0 | "Invalid number of rooms" |


## Business rules


## Business flow
1. The client sends a `POST` request to `/api/rooms/search` with the search criteria in the request body.
2. The server validates the input parameters.
   - If any validation fails, the server responds with `400 Bad Request` and an appropriate error message.
3. The server searches for available rooms based on the criteria.
   - If no rooms are found, the server responds with `404 Not Found`.
4. If rooms are found, the server responds with `200 OK` and the list of available rooms.
   4.1 Write log to table `search_logs` in database
5. If an unexpected error occurs, the server responds with `500 Internal Server Error`. 

## Tables

## rooms

| Column | Type | Description |
|--------|------|-------------|
| id | string | Primary key |
| name | string | Name of the room |
| price | integer | Price of the room |
| availability | boolean | Availability status of the room |
| created_at | string | Timestamp when the room was created |
| updated_at | string | Timestamp when the room was last updated |

### search_logs
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| location | string | The location searched for |
| check_in_date | string | The check-in date |
| check_out_date | string | The check-out date |
| guests_adults | integer | Number of adults |
| guests_children | integer | Number of children |
| guests_rooms | integer | Number of rooms |
| created_at | string | Timestamp when the search was made |


## API testing :: test cases for search rooms API
| Test Case | Description | Request Body | Expected Response |
|-----------|-------------|--------------|----------------|
| TC-API_001 : Valid request | Search rooms with valid parameters | `{ "location": "Bangkok", "check_in_date": "2025-10-16", "check_out_date": "2025-10-20", "guests": { "adults": 2, "children": 1, "rooms": 1 } }` | `200 OK` with list of available rooms |
| TC-API_002 : Invalid location | Search rooms with an invalid location | `{ "location": "InvalidCity", "check_in_date": "2024-07-01", "check_out_date": "2024-07-05", "guests": { "adults": 2, "children": 1, "rooms": 1 } }` | `400 Bad Request` with "Invalid location" |
| TC-API_003 : Invalid check-in date | Search rooms with a check-in date in the past | `{ "location": "Bangkok", "check_in_date": "2023-07-01", "check_out_date": "2024-07-05", "guests": { "adults": 2, "children": 1, "rooms": 1 } }` | `400 Bad Request` with "Invalid check-in date" |
| TC-API_004 : Invalid check-out date | Search rooms with a check-out date before the check-in date | `{ "location": "Bangkok", "check_in_date": "2024-07-05", "check_out_date": "2024-07-01", "guests": { "adults": 2, "children": 1, "rooms": 1 } }` | `400 Bad Request` with "Invalid check-out date" |  
