import { TestEnvironment, TestFeature, TestPersona } from '../models/test-session.model';

export const TEST_PERSONAS: readonly TestPersona[] = [
  {
    id: 'couple',
    name: 'คู่รักฮันนีมูน',
    description: 'ผู้ใหญ่ 2 คน, 1 ห้อง, ภูเก็ต 3 คืน',
    destinationId: 'phuket',
    checkInOffsetDays: 7,
    nights: 3,
    adults: 2,
    children: 0,
    rooms: 1,
  },
  {
    id: 'family',
    name: 'ครอบครัวพร้อมเด็ก',
    description: 'ผู้ใหญ่ 2 คน, เด็ก 2 คน, 1 ห้อง, เกาะสมุย 4 คืน',
    destinationId: 'samui',
    checkInOffsetDays: 14,
    nights: 4,
    adults: 2,
    children: 2,
    rooms: 1,
  },
  {
    id: 'business',
    name: 'นักธุรกิจเดินทางคนเดียว',
    description: 'ผู้ใหญ่ 1 คน, 1 ห้อง, เชียงใหม่ 1 คืน',
    destinationId: 'chiangmai',
    checkInOffsetDays: 1,
    nights: 1,
    adults: 1,
    children: 0,
    rooms: 1,
  },
  {
    id: 'group',
    name: 'กรุ๊ปเพื่อน',
    description: 'ผู้ใหญ่ 6 คน, 3 ห้อง, ภูเก็ต 2 คืน',
    destinationId: 'phuket',
    checkInOffsetDays: 21,
    nights: 2,
    adults: 6,
    children: 0,
    rooms: 3,
  },
];

export const TEST_ENVIRONMENTS: readonly TestEnvironment[] = [
  { id: 'dev', name: 'DEV', description: 'Development' },
  { id: 'qa', name: 'QA', description: 'Quality Assurance' },
  { id: 'sit', name: 'SIT', description: 'System Integration Test' },
  { id: 'uat', name: 'UAT', description: 'User Acceptance Test' },
];

export const TEST_FEATURES: readonly TestFeature[] = [
  {
    id: 'search-rooms',
    name: 'ค้นหาห้องพัก',
    description: 'ค้นหา กรอง และเรียงลำดับห้องพัก',
    route: '/search',
    available: true,
  },
  {
    id: 'promotions',
    name: 'โปรโมชั่นพิเศษ',
    description: 'ยังไม่พร้อมให้ทดสอบ',
    route: '/promotions',
    available: false,
  },
  {
    id: 'my-bookings',
    name: 'การจองของฉัน',
    description: 'ยังไม่พร้อมให้ทดสอบ',
    route: '/my-bookings',
    available: false,
  },
];
