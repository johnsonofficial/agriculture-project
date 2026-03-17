
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchBar = ({
  searchLocation,
  setSearchLocation,
  handleSearch,
  isLoading,
  handleKeyPress
}: SearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
      <div className="relative w-full md:w-96">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Enter location..."
          className="pl-10"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <Button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" /> Get Weather
          </>
        )}
      </Button>
    </div>
  );
};

export default SearchBar;
