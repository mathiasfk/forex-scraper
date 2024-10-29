import { formatDate, getFormattedDateRange } from '../dateUtils';

describe('Date Utils', () => {
  test('formatDate should return date in YYYY-MM-DD format', () => {
    const date = new Date('2023-10-15');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2023-10-15');
  });

  test('getFormattedDateRange should return start and end dates for last 7 days', () => {
    const { startDate, endDate } = getFormattedDateRange();

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = (new Date(endDate) - new Date(startDate))/millisecondsInADay;

    const yesterday = new Date().setDate(new Date().getDate() - 1);

    expect(differenceInDays).toBe(7);
    expect(endDate).toBe(formatDate(yesterday));
  });

  test('getFormattedDateRange should return custom start and end dates', () => {
    const { startDate, endDate } = getFormattedDateRange(-8, -3);

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = (new Date(endDate) - new Date(startDate))/millisecondsInADay;

    const expectedEnd = new Date().setDate(new Date().getDate() - 3);

    expect(differenceInDays).toBe(5);
    expect(endDate).toBe(formatDate(expectedEnd));
  });
});
