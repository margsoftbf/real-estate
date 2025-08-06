export interface PaginationMeta {
  itemCount?: number;
  totalItems?: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage?: number;
  sortBy?: any;
  searchBy?: any;
  search?: string;
  select?: string[];
  filter?: any;
  cursor?: string;
}

export interface PaginationLinks {
  first?: string;
  previous?: string;
  current: string;
  next?: string;
  last?: string;
}

export class BasePaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export type GetDtoExcept<T, K extends keyof T> = Omit<T, K>;
export type UpdateDto<T, K extends keyof T = never> = Partial<Omit<T, K>>;