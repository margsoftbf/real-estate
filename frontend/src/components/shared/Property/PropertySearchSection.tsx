import SearchBar from '@/components/shared/SearchBar';
import { FilterOutline } from '@/assets/icons';
import Button from '@/components/ui/Button/Button';
interface PropertySearchSectionProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFiltersClick: () => void;
}

const PropertySearchSection = ({
  searchTerm,
  onSearchTermChange,
  onSubmit,
  onFiltersClick,
}: PropertySearchSectionProps) => {
  return (
    <div className="mb-8 flex gap-4">
      <SearchBar
        value={searchTerm}
        onChange={onSearchTermChange}
        onSubmit={onSubmit}
        placeholder="Search location"
        className="flex-1 lg:max-w-2xl"
        onFiltersClick={onFiltersClick}
      />
      <Button
        variant="white"
        size="sm"
        onClick={onFiltersClick}
        className="flex items-center gap-2 shrink-0 px-3 lg:hidden"
      >
        <FilterOutline className="w-7 h-7 text-primary-violet-dark" />
        <span>Filters</span>
      </Button>
    </div>
  );
};

export default PropertySearchSection;
