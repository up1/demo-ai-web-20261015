import { expect, test } from '@playwright/test';
import { SearchRoomsPage } from '../pages/search-rooms/search-rooms.page';

test.describe('Search Rooms - success', () => {
  test('TC001: search with valid inputs displays available rooms', async ({ page }) => {
    const searchRoomsPage = new SearchRoomsPage(page);
    await searchRoomsPage.goto();

    await searchRoomsPage.selectDestination('samui');
    await searchRoomsPage.selectDates('2026-10-16', '2026-10-20');
    await searchRoomsPage.selectGuests({ adults: 2, children: 1, rooms: 1 });
    await searchRoomsPage.search();

    await expect(searchRoomsPage.guestsInput).toHaveText('2 ผู้ใหญ่, 1 เด็ก • 1 ห้อง');
    await expect(searchRoomsPage.roomCards).toHaveCount(2);
    await expect(searchRoomsPage.roomCard('Cliffside Infinity Pool Villa')).toBeVisible();
    await expect(searchRoomsPage.roomCard('Deluxe Sea View')).toBeVisible();
  });
});
