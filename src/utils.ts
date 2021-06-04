export function sleep(timeMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, timeMs);
  });
}
