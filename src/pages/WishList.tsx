import { useState } from "react";
import useWishListStore from "../store/useWishListStore";
import CountBox from "../components/CountBox";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import NoBooks from "../components/NoBooks";

function WishList() {
  const wishList = useWishListStore((state) => state.wishList);
  const setWishList = useWishListStore((state) => state.setWishList);
  const [page, setPage] = useState(1);

  return (
    <>
      <h2 className="main-title">내가 찜한 책</h2>
      <CountBox len={wishList.length} description="찜한 책" />
      {!wishList?.length ? (
        <NoBooks description="찜한 책이 없습니다." />
      ) : (
        <>
          <BookList bookList={wishList} setBookList={setWishList} />
          <Pagination page={page} setPage={setPage} />
        </>
      )}
    </>
  );
}

export default WishList;
