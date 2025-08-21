import "../../style/searchBook/searchModal.scss";
import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import useSendObjStore from "../../store/useSendObjStore";

const sendBasicObj = {
  query: "",
  sort: "",
  page: 1,
  size: 10,
  target: "",
};

export const SearchModal = ({
  setIsSearchModalOpen,
  setSearchText,
  mutate,
}: {
  setIsSearchModalOpen: (value: boolean) => void;
  setSearchText: (value: string) => void;
  mutate: (obj: typeof sendBasicObj) => void;
}) => {
  const input = useRef<HTMLInputElement>(null);
  const [modalSearchText, setModalSearchText] = useState("");
  const [target, setTarget] = useState("title");
  const setSendObj = useSendObjStore((state) => state.setSendObj);

  const modalClose = () => {
    setIsSearchModalOpen(false);
  };

  const modalSearchHandler = () => {
    if (!modalSearchText) {
      alert("검색어를 입력하세요.");
      return;
    }

    setSearchText("");
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
