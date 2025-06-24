export const measurePerformance = async (fn, label = "API Call") => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;

    console.log(`[${label}] took ${duration.toFixed(2)}ms`);

    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`[${label}] failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
};
