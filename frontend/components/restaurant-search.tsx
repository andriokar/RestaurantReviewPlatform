"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/providers/app-context-provider";
import { RestaurantSearchParams } from "@/domain/domain";

interface RestaurantSearchProps {
  loading: boolean;
  searchRestaurants: (params: RestaurantSearchParams) => Promise<void>;
}

export default function RestaurantSearch(props: RestaurantSearchProps) {
  const { loading, searchRestaurants } = props;

  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState<number | undefined>(undefined);


  const handleSearch = async () => {
    await searchRestaurants({
      q: query,
      minRating,
    });  
  }

  const handleSearchFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSearch();  
  };

  const handleMinFourStarFilter = async (value: number) => {
    if (minRating !== value) {
      setMinRating(value);
    } else {
      setMinRating(undefined);
    }
    await handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleSearchFormSubmit} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search for restaurants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>
      <div className="flex mb-8 gap-2">
        <Button
          onClick={() => handleMinFourStarFilter(2)}
          variant={2 === minRating ? "default" : "outline"}
        >
          <Star /> 2+
        </Button>

        <Button
          onClick={() => handleMinFourStarFilter(3)}
          variant={3 === minRating ? "default" : "outline"}
        >
          <Star /> 3+
        </Button>

        <Button
          onClick={() => handleMinFourStarFilter(4)}
          variant={4 === minRating ? "default" : "outline"}
        >
          <Star /> 4+
        </Button>
      </div>
    </div>
  );
}
