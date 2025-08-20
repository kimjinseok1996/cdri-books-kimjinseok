import "../../style/main/searchBox.scss";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";
import { memo } from "react";
import useSearchListStore from "../../store/useSearchListStore";
import { useState, useEffect, useRef } from "react";

interface SearchBoxProps {
  searchText: string;
  setSearchText: (value: string) => void;
  refetch: () => void;
}

function SearchBox({ searchText, setSearchText, refetch }: SearchBoxProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const searchList = useSearchListStore((state) => state.searchList);
  const addSearchList = useSearchListStore((state) => state.addSearchList);
  const removeSearchList = useSearchListStore(
    (state) => state.removeSearchList
  );

  const searchHandler = () => {
    refetch();
    if (searchText && !searchList.includes(searchText))
      addSearchList([searchText]);
  };

  const historyClick = (item: string) => {
    setSearchText(item);
    setIsSearchListOpen(false);
  };

  useEffect(() => {
    if (searchText && !isSearchListOpen) {
      refetch();
    }
  }, [isSearchListOpen, searchText]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsSearchListOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="search-box" ref={wrapperRef}>
      <div className="search-input-wrap">
        <div className="search-input">
          <button onClick={searchHandler}>
            <RiSearchLine />
          </button>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchHandler();
            }}
            onFocus={() => setIsSearchListOpen(true)}
          />
        </div>
        {isSearchListOpen && !!searchList?.length && (
          <div className="search-history-wrap">
            {searchList?.map((item, index) => (
              <div key={index}>
                <p onClick={() => historyClick(item)}>{item}</p>
                <button onClick={() => removeSearchList(index)}>
                  <RiCloseFill />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="more-search">상세검색</button>

      <div className="more-search-modal">
        <div className="modal-header">
          <RiCloseFill />
        </div>
        <div className="modal-body">
          <div>
            <select name="" id="">
              <option value=""></option>
            </select>
            <input type="text" placeholder="검색어 입력" />
          </div>
          <button>검색하기</button>
        </div>
      </div>
    </div>
  );
}
export default memo(SearchBox);
