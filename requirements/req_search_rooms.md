# Feature : Search Rooms

## User Interface
* Read from file `ui-mockup/page-01.html`

## Description
This feature allows users to search for available rooms based on their desired check-in and check-out dates, as well as room type preferences.

## Flow
- User selects destination/location.
- User selects check-in and check-out dates.
- User selects the number of guests.(adults and children and no. of rooms)
- User selects additional preferences or filters if available
    - price range
    - free cancellation
    - room type preferences. (Deluxe,Pool villa, Superior, Grand)
    - รูปแบบเตียง (เตียงเดี่ยว, เตียงคู่, เตียงใหญ่)
    - สิ่งอำนวยความสะดวก (Wi-Fi, ทีวี, ตู้เย็น, เครื่องปรับอากาศ)
- User applies the selected sorts to the available rooms based on the selected order
    - popularity
    - price (low to high)
    - price (high to low)
    - rating or review
- System displays a list of available rooms matching the criteria.

## Inputs validation in table format
| Input | Validation | Error message |
|--------|------------|----------------|
| Destination/Location | Required, must be a valid location | Please enter a valid location |
| Check-in Date | Required, must be a valid date, cannot be in the past | Please enter a valid check-in date |
| Check-out Date | Required, must be a valid date, must be after check-in date | Please enter a valid check-out date |
| Number of Guests | Required, must be a positive integer | Please enter a valid number of guests |
| Number of Rooms | Required, must be a positive integer | Please enter a valid number of rooms |
| Price Range | Optional, must be a valid range (min <= max) | Please enter a valid price range |
| Free Cancellation | Optional, must be a boolean value | Please select a valid option for free cancellation |
| Room Type Preferences | Optional, must be one of the predefined room types (Deluxe, Pool villa, Superior, Grand) | Please select a valid room type |
| Bed Type | Optional, must be one of the predefined bed types (เตียงเดี่ยว, เตียงคู่, เตียงใหญ่) | Please select a valid bed type |
| Amenities | Optional, must be a list of valid amenities (Wi-Fi, ทีวี, ตู้เย็น, เครื่องปรับอากาศ) | Please select valid amenities |
| Sort Order | Optional, must be one of the predefined sort options (popularity, price low to high, price high to low, rating or review) | Please select a valid sort order |