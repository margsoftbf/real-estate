export const propertyQueryKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyQueryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...propertyQueryKeys.lists(), filters] as const,
  details: () => [...propertyQueryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...propertyQueryKeys.details(), slug] as const,
  
  rent: {
    all: () => [...propertyQueryKeys.all, 'rent'] as const,
    lists: () => [...propertyQueryKeys.rent.all(), 'list'] as const,
    list: (filters: Record<string, unknown>) => [...propertyQueryKeys.rent.lists(), filters] as const,
  },
  
  buy: {
    all: () => [...propertyQueryKeys.all, 'buy'] as const,
    lists: () => [...propertyQueryKeys.buy.all(), 'list'] as const,
    list: (filters: Record<string, unknown>) => [...propertyQueryKeys.buy.lists(), filters] as const,
  },
  
  infinite: {
    all: () => [...propertyQueryKeys.all, 'infinite'] as const,
    rent: (filters: Record<string, unknown>) => [...propertyQueryKeys.all, 'rent', 'infinite', filters] as const,
    buy: (filters: Record<string, unknown>) => [...propertyQueryKeys.all, 'buy', 'infinite', filters] as const,
    list: (filters: Record<string, unknown>) => [...propertyQueryKeys.infinite.all(), filters] as const,
  },
};