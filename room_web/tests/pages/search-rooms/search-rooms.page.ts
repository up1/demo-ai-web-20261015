import { Locator, Page, expect } from '@playwright/test';

export interface GuestCounts {
  readonly adults: number;
  readonly children: number;
  readonly rooms: number;
}

/**
 * Page object for the Search Rooms page (/search).
 * The app has no data-testid attributes, so elements are located by their stable ids and ARIA roles.
 */
export class SearchRoomsPage {
  readonly destinationSelect: Locator;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly guestsToggle: Locator;
  readonly guestsPanel: Locator;
  readonly adultsInput: Locator;
  readonly childrenInput: Locator;
  readonly roomsInput: Locator;
  readonly guestsDoneButton: Locator;
  readonly searchButton: Locator;
  readonly resultList: Locator;
  readonly roomCards: Locator;

  constructor(private readonly page: Page) {
    this.destinationSelect = page.locator('#destination');
    this.checkInInput = page.locator('#check-in');
    this.checkOutInput = page.locator('#check-out');
    this.guestsToggle = page.locator('button[aria-controls="guests-panel"]');
    this.guestsPanel = page.locator('#guests-panel');
    this.adultsInput = page.locator('#adults');
    this.childrenInput = page.locator('#children');
    this.roomsInput = page.locator('#rooms');
    this.guestsDoneButton = this.guestsPanel.getByRole('button', { name: 'เสร็จสิ้น' });
    this.searchButton = page.getByRole('button', { name: 'ค้นหาห้องว่าง' });
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
    await this.guestsToggle.click();
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
