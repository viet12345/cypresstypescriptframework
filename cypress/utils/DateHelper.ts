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