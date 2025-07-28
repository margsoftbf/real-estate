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

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export const getPaginationParams = (
  page: number = 1,
  limit: number = 10,
): { skip: number; take: number; page: number; limit: number } => {
  const normalizedPage = Math.max(1, page);
  const normalizedLimit = Math.min(100, Math.max(1, limit));
  
  return {
    skip: (normalizedPage - 1) * normalizedLimit,
    take: normalizedLimit,
    page: normalizedPage,
    limit: normalizedLimit,
  };
};

export const createPaginationMeta = (
  total: number,
  page: number,
  limit: number,
) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};
