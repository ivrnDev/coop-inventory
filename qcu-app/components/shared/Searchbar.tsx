'use client';
import { useState } from "react";

const Searchbar = (onSearch: any) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchBar = () => {

  }
  return (
    <div>
      <form>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          name="search_bar"
          id="searchBar"
        />
      </form>
    </div>
  );
}

export default Searchbar