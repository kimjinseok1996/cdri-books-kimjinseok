import { useGetBooksData } from "../hooks/useGetBooksData";
import SearchBox from "../components/main/SearchBox";
import { useEffect, useState } from "react";
import NoBooks from "../components/NoBooks";
import CountBox from "../components/CountBox";
import useBookListStore from "../store/useBookListStore";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";

function Main() {
  const [searchText, setSearchText] = useState("");
  const bookList = useBookListStore((state) => state.bookList);
  const setBookList = useBookListStore((state) => state.setBookList);
  const [page, setPage] = useState(1);

  const sendObj = {
    query: searchText,
    sort: "",
    page: page,
    size: 10,
    target: "",
  };

  const { data, refetch } = useGetBooksData(sendObj);
  const metaData = data?.meta || [];

  useEffect(() => {
    const list = data?.documents || [];
    setBookList(list);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <h2 className="main-title">도서 검색</h2>
      <SearchBox
        searchText={searchText}
        setSearchText={setSearchText}
        refetch={refetch}
      />
      <CountBox len={metaData?.total_count} description="도서 검색 결과" />
      {!bookList?.length ? (
        <NoBooks />
      ) : (
        <>
          <BookList bookList={bookList} setBookList={setBookList} />
          <Pagination page={page} setPage={setPage} isEnd={metaData?.is_end} />
        </>
      )}
    </>
  );
}

export default Main;
