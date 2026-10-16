import { Locator, Page, expect } from '@playwright/test';

export interface GuestCounts {
  readonly adults: number;
  readonly children: number;
  readonly rooms: number;
}

/**
 * Page object for the Search Rooms page (/search).
 * Elements are located by data-testid (see requirements/req_search_rooms.md).
 * The guests "done" button and the result list have no test id, so they use ARIA roles.
 */
export class SearchRoomsPage {
  readonly destinationSelect: Locator;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly guestsInput: Locator;
  readonly guestsPanel: Locator;
  readonly adultsInput: Locator;
  readonly childrenInput: Locator;
  readonly roomsInput: Locator;
  readonly guestsDoneButton: Locator;
  readonly searchButton: Locator;
  readonly priceRangeFilter: Locator;
  readonly freeCancellationFilter: Locator;
  readonly roomTypeFilter: Locator;
  readonly bedTypeFilter: Locator;
  readonly amenitiesFilter: Locator;
  readonly sortOrderDropdown: Locator;
  readonly resultList: Locator;
  readonly roomCards: Locator;

  constructor(private readonly page: Page) {
    this.destinationSelect = page.getByTestId('destination-input');
    this.checkInInput = page.getByTestId('checkin-date-input');
    this.checkOutInput = page.getByTestId('checkout-date-input');
    this.guestsInput = page.getByTestId('guests-input');
    this.guestsPanel = page.locator('#guests-panel');
    this.adultsInput = page.getByTestId('adults-input');
    this.childrenInput = page.getByTestId('children-input');
    this.roomsInput = page.getByTestId('rooms-input');
    this.guestsDoneButton = this.guestsPanel.getByRole('button', { name: 'เสร็จสิ้น' });
    this.searchButton = page.getByTestId('search-button');
    this.priceRangeFilter = page.getByTestId('price-range-filter');
    this.freeCancellationFilter = page.getByTestId('free-cancellation-filter');
    this.roomTypeFilter = page.getByTestId('room-type-filter');
    this.bedTypeFilter = page.getByTestId('bed-type-filter');
    this.amenitiesFilter = page.getByTestId('amenities-filter');
    this.sortOrderDropdown = page.getByTestId('sort-order-dropdown');
    this.resultList = page.getByRole('region', { name: 'รายการห้องพักว่าง' });
    this.roomCards = this.resultList.getByRole('article');
  }

  async goto(): Promise<void> {
    await this.page.goto('/search');
    await expect(this.searchButton).toBeVisible();
  }

  async selectDestination(destinationId: string): Promise<void> {
    await this.destinationSelect.selectOption(destinationId);
  }

  async selectDates(checkIn: string, checkOut: string): Promise<void> {
    await this.checkInInput.fill(checkIn);
    await this.checkOutInput.fill(checkOut);
  }

  async selectGuests({ adults, children, rooms }: GuestCounts): Promise<void> {
    await this.guestsInput.click();
    await expect(this.guestsPanel).toBeVisible();
    await this.adultsInput.fill(String(adults));
    await this.childrenInput.fill(String(children));
    await this.roomsInput.fill(String(rooms));
    await this.guestsDoneButton.click();
  }

  async search(): Promise<void> {
    await this.searchButton.click();
  }

  roomCard(name: string): Locator {
    return this.resultList.getByRole('article', { name });
  }
}
