// Function to generate an array with repeated values
export function generateArray<T>(length: number, value: T): T[] {
    return Array.from({ length }, () => value);
  }