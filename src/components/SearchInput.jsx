import { useCallback, useState } from 'react';
import searchPng from '../assets/search.png';

export function SearchInput({ handleSearch, value }) {
  const [searchText, setSearchText] = useState(value);

  const handleKeydown = useCallback((code, text) => {
    if (code !== 'Enter') {
      return;
    }
    handleSearch(text);
  }, []);

  return (
    <article className="flex justify-center items-center flex-1 pt-2 py-6">
      <input
        autoFocus
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => handleKeydown(e.code, searchText)}
        className="border-b-2 border-black outline-none py-1 px-2 w-3/5 indent-1 relative left-3"
      />
      <img
        src={searchPng}
        className="w-6 relative right-6 hover:cursor-pointer"
        onClick={() => handleSearch(searchText)}
      />
    </article>
  );
}
