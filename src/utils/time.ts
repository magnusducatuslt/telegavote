export const createExpirationTime = (hr: number): number => {
  const result = parseInt((hr * 60 * 60 * 1000).toFixed());
  return result;
};
