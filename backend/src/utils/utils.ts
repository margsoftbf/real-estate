export const getEnumValues = <T extends Record<string, string>>(
  enumObject: T,
): [string, ...string[]] => {
  const [value, ...rest] = Object.values(enumObject);
  return [value, ...rest];
};

export const generateRandomString = (length: number = 7): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
