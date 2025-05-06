export const getToday = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getTomorrow = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export const getRandomFutureDate = (daysFromNow: number): string => {
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() + daysFromNow);
  return randomDate.toISOString().split('T')[0];
};

export const formatToMMMDDYYYY = (date: Date): string => {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day} ${year}`;
};

export function toYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng từ 0 → +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDateDiffNDays(days: number, fromDate = new Date()): Date {
  const result = new Date(fromDate);
  result.setDate(result.getDate() + days);
  return result;
}


export class FormatDateString {
  private dateString: string;
  private sYear: string;
  private sMonth: string;
  private sDay: string;

  constructor(dateString: string) {
    if (!FormatDateString.isValidDateString(dateString)) {
      throw new Error(`Invalid date string: "${dateString}". Format must be YYYY-MM-DD and must be a valid calendar date.`);
    }

    this.dateString = dateString;
    const [year, month, day] = dateString.split('-');
    this.sYear = year;
    this.sMonth = month;
    this.sDay = day;
  }

  get date(): Date {
    return new Date(Number(this.sYear), Number(this.sMonth) - 1, Number(this.sDay));
  }

  // Static validation method
  static isValidDateString(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const [yearStr, monthStr, dayStr] = dateString.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }
}