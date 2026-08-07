export const asyncHandler = (handler) => async (c, next) => {
  try {
    return await handler(c, next);
  } catch (error) {
    console.error('Handler error:', error);
    return c.json({ detail: error?.message || 'Internal Server Error' }, 500);
  }
};