import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchOutline from '@/assets/icons/SearchOutline';
import Button from '@/components/ui/Button/Button';

interface HeroSearchBarProps {
  className?: string;
}

const HeroSearchBar = ({ className = '' }: HeroSearchBarProps) => {
  const [activeTab, setActiveTab] = useState('Rent');
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleBrowse = () => {
    const targetPage = activeTab.toLowerCase() === 'rent' ? '/rent' : '/buy';
    if (searchValue.trim()) {
      router.push(
        `${targetPage}?city=${encodeURIComponent(searchValue.trim())}`
      );
    } else {
      router.push(targetPage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBrowse();
    }
  };

  return (
    <div
      className={`bg-white rounded-lg lg:rounded-md lg:py-4 lg:bg-transparent ${className}`}
    >
      <div className="flex border-b border-gray-200">
        {['Rent', 'Buy'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-3 lg:flex-none lg:px-6 lg:py-3
              transition-all relative text-center font-bold text-body-md
              lg:text-body-md-medium cursor-pointer lg:bg-white
              ${
                activeTab === tab
                  ? 'text-primary-violet-dark'
                  : 'text-primary-black hover:text-primary-violet lg:text-gray-800'
              }
            `}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-violet" />
            )}
          </button>
        ))}
      </div>

      <div className="py-2 px-4 lg:p-0 lg:pr-2 lg:h-20 lg:bg-white lg:flex lg:items-center lg:justify-between lg:w-[600px]">
        <div className="relative flex-1 lg:mr-4">
          <div className="hidden lg:block">
            <div className="rounded-md bg-white px-3 pt-3 pb-3 ">
              <label
                htmlFor="location"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Search location"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm border-0 p-0 h-8 bg-transparent"
              />
            </div>
          </div>

          <div className="lg:hidden">
            <input
              type="text"
              placeholder="Search location"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="
                w-full py-3 pr-14 bg-transparent text-gray-700 text-body-md
                focus:outline-none transition-all text-body-md-medium
                border-0
              "
            />
            <button
              onClick={handleBrowse}
              className="
                absolute right-2 top-1/2 transform -translate-y-1/2
                bg-primary-violet w-10 h-10 flex items-center justify-center
                rounded-md hover:brightness-120 transition-all cursor-pointer
              "
              aria-label="Search"
            >
              <SearchOutline className="w-4 h-4" color="white" />
            </button>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          className="hidden lg:flex h-12"
          onClick={handleBrowse}
        >
          Browse Properties
        </Button>
      </div>
    </div>
  );
};

export default HeroSearchBar;
