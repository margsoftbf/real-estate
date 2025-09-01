import { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';

interface CitySearchProps {
  value?: string;
  onChange: (city: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showSearchIcon?: boolean;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
  type: string;
  importance: number;
}

export const CitySearch = ({ 
  value = '', 
  onChange, 
  placeholder = "Search for a city...",
  className = "",
  inputClassName = "",
  showSearchIcon = true
}: CitySearchProps) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchCities = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=8&addressdetails=1&countrycodes=US,CA,GB,DE,FR,ES,IT,NL,BE,AT,CH,SE,NO,DK,FI,IE,PT,PL,CZ,HU,SK,SI,HR,BG,RO,GR,LT,LV,EE,LU,MT,CY&class=place&accept-language=en`,
        {
          headers: {
            'Accept-Language': 'en'
          }
        }
      );
      
      if (response.ok) {
        const allData: NominatimResult[] = await response.json();
      
        if (allData.length > 0) {
        const uniqueData = allData.filter((item, index, self) => {
          const cityName = item.display_name.split(',')[0].toLowerCase();
          return index === self.findIndex(t => 
            t.place_id === item.place_id || 
            t.display_name.split(',')[0].toLowerCase() === cityName
          );
        });
        
        const prioritizedResults = uniqueData
          .filter(result => {
            const name = result.display_name.toLowerCase();
            const searchTerm = query.toLowerCase();
            const firstPart = result.display_name.split(',')[0].toLowerCase();
            
            const isRelevant = (
              result.type === 'city' || 
              result.type === 'town' || 
              result.type === 'administrative' ||
              firstPart === searchTerm ||
              firstPart.startsWith(searchTerm) ||
              result.importance > 0.6 ||
              (result.importance > 0.4 && firstPart.includes(searchTerm))
            );
            
            const isVillage = name.includes('village') && !firstPart.startsWith(searchTerm);
            
            return isRelevant && !isVillage;
          })
          .sort((a, b) => {
            const aFirstPart = a.display_name.split(',')[0].toLowerCase();
            const bFirstPart = b.display_name.split(',')[0].toLowerCase();
            const searchTerm = query.toLowerCase();

            const aExact = aFirstPart === searchTerm;
            const bExact = bFirstPart === searchTerm;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            const aStarts = aFirstPart.startsWith(searchTerm);
            const bStarts = bFirstPart.startsWith(searchTerm);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            const aCityType = a.type === 'city' ? 3 : a.type === 'town' ? 2 : 1;
            const bCityType = b.type === 'city' ? 3 : b.type === 'town' ? 2 : 1;
            if (aCityType !== bCityType) return bCityType - aCityType;

            return (b.importance || 0) - (a.importance || 0);
          });
          
        setSuggestions(prioritizedResults.slice(0, 6));
        setIsOpen(true);
        }
      }
    } catch (error) {
      console.error('Error searching cities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchCities(query);
    }, 300);
  };

  const handleSuggestionSelect = (suggestion: NominatimResult) => {
    const cityName = suggestion.display_name.split(',')[0].trim();
    setSearchTerm(cityName);
    onChange(cityName, {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon)
    });
    setIsOpen(false);
    setSuggestions([]);
  };

  const formatDisplayName = (displayName: string) => {
    const parts = displayName.split(',');
    return parts.slice(0, 3).join(', ');
  };

  const defaultInputStyles = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-violet focus:border-transparent outline-none";

  return (
    <div className={`relative overflow-visible ${className}`} ref={dropdownRef} style={{ zIndex: 50 }}>
      <div className="relative">
        {showSearchIcon && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
        )}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={inputClassName || (showSearchIcon ? defaultInputStyles : defaultInputStyles.replace('pl-10', 'pl-3'))}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-violet"></div>
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto backdrop-blur-sm">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 hover:bg-opacity-80 flex items-center space-x-3 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-900 truncate">
                  {suggestion.display_name.split(',')[0]}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {formatDisplayName(suggestion.display_name)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && suggestions.length === 0 && searchTerm.length > 1 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl">
          <div className="px-4 py-3 text-gray-500 text-center">
            No cities found
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;