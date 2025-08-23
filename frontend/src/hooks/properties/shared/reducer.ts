import {
  PropertySearchState,
  PropertySearchAction,
  createInitialFilters,
} from './types';

export function propertySearchReducer(
  state: PropertySearchState,
  action: PropertySearchAction
): PropertySearchState {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'APPLY_SEARCH':
      return { ...state, appliedSearchTerm: action.payload };
    case 'SET_FILTER_MODAL_OPEN':
      return { ...state, isFilterModalOpen: action.payload };
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchTerm: '',
        appliedSearchTerm: '',
        filters: createInitialFilters(),
        currentPage: 1,
      };
    case 'SET_PROPERTIES':
      return {
        ...state,
        properties: action.payload.properties,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}
