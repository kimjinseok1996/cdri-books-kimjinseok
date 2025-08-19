import "../../style/main/searchBox.scss";
import { TbSearch } from "react-icons/tb";
import { memo, useRef } from "react";

interface SearchBoxProps {
  searchText: string;
  setSearchText: (value: string) => void;
  refetch: () => void;
}

function SearchBox({ searchText, setSearchText, refetch }: SearchBoxProps) {
  const inputRef = useRef(null);
  return (
    <div id="search-box">
      <div>
        <button onClick={refetch}>
          <TbSearch />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") refetch();
          }}
        />
      </div>
      <button className="more-search">상세검색</button>
    </div>
  );
}
export default memo(SearchBox);
