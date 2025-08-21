import { lazy, Suspense } from "react";
import { useGetBooksData } from "../hooks/useGetBooksData";
import SearchBox from "../components/searchBook/SearchBox";
import { useEffect } from "react";
import CountBox from "../components/CountBox";
import useBookListStore from "../store/useBookListStore";
import Pagination from "../components/Pagination";
import useSendObjStore from "../store/useSendObjStore";
import SkeletonComponent from "../components/SkeletonComponent";

const BookList = lazy(() => import("../components/BookList"));

function SearchBook() {
  const bookList = useBookListStore((state) => state.bookList);
  const metaData = useBookListStore((state) => state.metaData);
  const setBookList = useBookListStore((state) => state.setBookList);
  const sendObj = useSendObjStore((state) => state.sendObj);
  const setPage = useSendObjStore((state) => state.setPage);

  const { mutate, error } = useGetBooksData();

  useEffect(() => {
    mutate(sendObj);
  }, [sendObj.page]);

  return (
    <>
      <h2 className="main-title">도서 검색</h2>
      <SearchBox mutate={mutate} />
      <CountBox len={metaData?.total_count} description="도서 검색 결과" />
      {error ? (
        <div className="alert-text">
          {(error as any).response?.data?.message || error?.message}
        </div>
      ) : (
        <>
          <Suspense fallback={<SkeletonComponent count={10} />}>
            <BookList bookList={bookList} setBookList={setBookList} />
          </Suspense>

          {!!bookList.length && (
            <Pagination
              page={sendObj.page}
              setPage={setPage}
              isEnd={metaData?.is_end}
            />
          )}
        </>
      )}
    </>
  );
}

export default SearchBook;
