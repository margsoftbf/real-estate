import { usePropertySearchWithURL } from './usePropertySearchWithURL';

export const useRent = () => {
  return usePropertySearchWithURL({
    type: 'rent',
    routePath: 'rent',
    defaultLimit: 12,
  });
};
