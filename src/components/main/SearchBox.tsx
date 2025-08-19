import "../../style/main/searchBox.scss";
import { TbSearch } from "react-icons/tb";
import { useEffect, useRef } from "react";

interface SearchBoxProps {
  searchText: string;
  setSearchText: (value: string) => void;
  refetch: () => void;
}

function SearchBox({ searchText, setSearchText, refetch }: SearchBoxProps) {
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      refetch();
    }, 200);
  }, [searchText]);

  return (
    <div id="search-box">
      <div>
        <span>
          <TbSearch />
        </span>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <button>상세검색</button>
    </div>
  );
}
export default SearchBox;
