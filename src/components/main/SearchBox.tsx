import "../../style/main/searchBox.scss";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";
import { memo } from "react";
import useSearchListStore from "../../store/useSearchListStore";
import { useState, useEffect, useRef } from "react";
import { useGetBooksData } from "../../hooks/useGetBooksData";
import useSendObjStore from "../../store/useSendObjStore";

const sendBasicObj = {
  query: "",
  sort: "",
  page: 1,
  size: 10,
  target: "",
};

const SearchModal = ({
  setIsSearchModalOpen,
}: {
  setIsSearchModalOpen: (value: boolean) => void;
}) => {
  const { mutate } = useGetBooksData();
  const input = useRef<HTMLInputElement>(null);
  const [modalSearchText, setModalSearchText] = useState("");
  const [target, setTarget] = useState("title");
  const setSendObj = useSendObjStore((state) => state.setSendObj);

  const modalClose = () => {
    setIsSearchModalOpen(false);
  };

  const modalSearchHandler = () => {
    modalClose();

    const newObj = {
      ...sendBasicObj,
      query: modalSearchText,
      target: target,
    };

    setSendObj(newObj);
    mutate(newObj);
  };

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <div className="more-search-modal">
      <div className="modal-cover" onClick={modalClose}></div>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={modalClose}>
          <RiCloseFill />
        </button>
        <div className="modal-body">
          <div>
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              <option value="title">제목</option>
              <option value="person">저자명</option>
              <option value="publisher">출판사</option>
            </select>
            <input
              ref={input}
              type="text"
              placeholder="검색어 입력"
              value={modalSearchText}
              onChange={(e) => setModalSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") modalSearchHandler();
              }}
            />
          </div>
        </div>
        <button
          className="modal-search-btn primary-btn"
          onClick={modalSearchHandler}
        >
          검색하기
        </button>
      </div>
    </div>
  );
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
    if (searchText && !searchList.includes(searchText)) {
      addSearchList([searchText]);
    }

    setIsSearchListOpen(false);

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
        <SearchModal setIsSearchModalOpen={setIsSearchModalOpen} />
      )}
    </div>
  );
}
export default memo(SearchBox);
