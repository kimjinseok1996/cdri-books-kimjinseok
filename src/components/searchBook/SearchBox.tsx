import "../../style/searchBook/searchBox.scss";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";
import { memo } from "react";
import useSearchListStore from "../../store/useSearchListStore";
import { useState, useEffect, useRef } from "react";
import { useGetBooksData } from "../../hooks/useGetBooksData";
import useSendObjStore from "../../store/useSendObjStore";
import { SearchModal } from "./SearchModal";

const sendBasicObj = {
  query: "",
  sort: "",
  page: 1,
  size: 10,
  target: "",
};

function SearchBox() {
  const { mutate } = useGetBooksData();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const searchList = useSearchListStore((state) => state.searchList);
  const addSearchList = useSearchListStore((state) => state.addSearchList);
  const removeSearchList = useSearchListStore(
    (state) => state.removeSearchList
  );
  const setSendObj = useSendObjStore((state) => state.setSendObj);

  const searchHandler = () => {
    if (!searchText) {
      alert("검색어를 입력하세요.");
      return;
    }

    if (searchText && !searchList.includes(searchText)) {
      addSearchList([searchText]);
    }

    const newObj = {
      ...sendBasicObj,
      query: searchText,
    };

    setSendObj(newObj);
    mutate(newObj);
  };

  const historyClick = (item: string) => {
    setIsSearchListOpen(false);
    setSearchText(item);

    const newObj = {
      ...sendBasicObj,
      query: item,
    };

    setSendObj(newObj);
    mutate(newObj);
  };

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
    <div id="search-box">
      <div className="search-input-wrap" ref={wrapperRef}>
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
      <button
        className="more-search"
        onClick={() => setIsSearchModalOpen(true)}
      >
        상세검색
      </button>
      {isSearchModalOpen && (
        <SearchModal
          setIsSearchModalOpen={setIsSearchModalOpen}
          setSearchText={setSearchText}
        />
      )}
    </div>
  );
}
export default memo(SearchBox);
