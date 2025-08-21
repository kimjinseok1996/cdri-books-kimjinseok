import { useState, lazy, Suspense } from "react";
import useWishListStore from "../store/useWishListStore";
import CountBox from "../components/CountBox";
import Pagination from "../components/Pagination";
import NoBooks from "../components/NoBooks";
import SkeletonComponent from "../components/SkeletonComponent";

const BookList = lazy(() => import("../components/BookList"));

function WishList() {
  const wishList = useWishListStore((state) => state.wishList);
  const setWishList = useWishListStore((state) => state.setWishList);
  const [page, setPage] = useState(1);
  const wishListLength = wishList?.length || 0;
  const isEnd = wishListLength <= page * 10;
  const slicedWishList = wishList?.slice((page - 1) * 10, page * 10);

  return (
    <>
      <h2 className="main-title">내가 찜한 책</h2>
      <CountBox len={wishListLength} description="찜한 책" />
      {!wishList?.length ? (
        <NoBooks description="찜한 책이 없습니다." />
      ) : (
        <>
          <Suspense fallback={<SkeletonComponent count={10} />}>
            <BookList bookList={slicedWishList} setBookList={setWishList} />
          </Suspense>
          <Pagination page={page} setPage={setPage} isEnd={isEnd} />
        </>
      )}
    </>
  );
}

export default WishList;
