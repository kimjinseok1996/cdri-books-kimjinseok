import { useGetBooksData } from "../hooks/useGetBooksData";
import SearchBox from "../components/searchBook/SearchBox";
import { useEffect } from "react";
import NoBooks from "../components/NoBooks";
import CountBox from "../components/CountBox";
import useBookListStore from "../store/useBookListStore";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import useSendObjStore from "../store/useSendObjStore";

function SearchBook() {
  const bookList = useBookListStore((state) => state.bookList);
  const metaData = useBookListStore((state) => state.metaData);
  const setBookList = useBookListStore((state) => state.setBookList);
  const sendObj = useSendObjStore((state) => state.sendObj);
  const setPage = useSendObjStore((state) => state.setPage);

  const { mutate } = useGetBooksData();

  useEffect(() => {
    mutate(sendObj);
  }, [sendObj.page]);

  return (
    <>
      <h2 className="main-title">도서 검색</h2>
      <SearchBox />
      <CountBox len={metaData?.total_count} description="도서 검색 결과" />
      {!bookList?.length ? (
        <NoBooks />
      ) : (
        <>
          <BookList bookList={bookList} setBookList={setBookList} />
          <Pagination
            page={sendObj.page}
            setPage={setPage}
            isEnd={metaData?.is_end}
          />
        </>
      )}
    </>
  );
}

export default SearchBook;
