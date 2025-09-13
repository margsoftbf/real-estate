import { usePropertySearchWithURL } from './usePropertySearchWithURL';

export const useBuy = () => {
  return usePropertySearchWithURL({
    type: 'buy',
    routePath: 'buy',
    defaultLimit: 12,
  });
};
