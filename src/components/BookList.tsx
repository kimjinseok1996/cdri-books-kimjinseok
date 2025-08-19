import "../style/main/bookList.scss";
import type { receiveObjListProps } from "../types/books.type";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { PiHeartFill, PiHeartBold } from "react-icons/pi";
import { moneyComma } from "../share/share";
import { ImageWithSuspense } from "./ImageWithSuspense";
import useWishListStore from "../store/useWishListStore";
import useBookListStore from "../store/useBookListStore";

const MoreButton = ({
  type = "up",
  openHandler,
  isbn,
}: {
  type: string;
  openHandler: (isbn: string, bool: boolean) => void;
  isbn: string;
}) => {
  const isUp = type === "up";
  return (
    <button
      className="more-btn"
      onClick={() => openHandler(isbn, isUp ? false : true)}
    >
      상세보기
      <span>{isUp ? <SlArrowUp /> : <SlArrowDown />}</span>
    </button>
  );
};

const BuyButton = ({ url }: { url: string }) => {
  return (
    <button className="buy-btn" onClick={() => window.open(url)}>
      구매하기
    </button>
  );
};

const ThumbnailImage = ({
  thumbnail,
  isWish,
  isbn,
}: {
  thumbnail: string;
  isWish: boolean;
  isbn: string;
}) => {
  return (
    <div className="thumbnail-image">
      {thumbnail ? (
        <ImageWithSuspense src={thumbnail} alt="thumbnail" />
      ) : (
        <div className="default-image">
          <p>
            제공된 <br /> 상품 이미지가 <br /> 없습니다.
          </p>
        </div>
      )}
      <WishButton isWish={isWish} isbn={isbn} />
    </div>
  );
};

const BookTitle = ({ title, author }: { title: string; author: string }) => {
  return (
    <div className="book-title">
      <h5>{title}</h5>
      <p>{author}</p>
    </div>
  );
};

const WishButton = ({ isWish, isbn }: { isWish: boolean; isbn: string }) => {
  const addWishList = useWishListStore((state) => state.addWishList);
  const removeWishList = useWishListStore((state) => state.removeWishList);
  const bookList = useBookListStore((state) => state.bookList);
  const setBookList = useBookListStore((state) => state.setBookList);

  const wishHandler = () => {
    const newBookList = bookList.map((item) => {
      if (item.isbn === isbn) {
        return { ...item, isWish: !isWish };
      }
      return item;
    });
    setBookList(newBookList);

    if (isWish) {
      removeWishList(isbn);
    } else {
      const found = bookList.find(
        (item) => item.isbn === isbn
      ) as receiveObjListProps;
      addWishList([
        {
          ...found,
          isWish: true,
        },
      ]);
    }
  };

  return (
    <button
      className={`wish-btn ${isWish ? "active" : ""}`}
      onClick={wishHandler}
    >
      {isWish ? <PiHeartFill /> : <PiHeartBold />}
    </button>
  );
};

const BookInfoBox = ({
  item,
  openHandler,
}: {
  item: receiveObjListProps;
  openHandler: (isbn: string, bool: boolean) => void;
}) => {
  return (
    <div className="book-info-wrap">
      <div className="info-wrap">
        <ThumbnailImage
          thumbnail={item.thumbnail}
          isWish={item.isWish}
          isbn={item.isbn}
        />
        <div className="info-box">
          <BookTitle title={item.title} author={item.authors[0]} />
          <h6>책 소개</h6>
          <p>{item.contents || "소개 글이 없습니다."}</p>
        </div>
      </div>
      <div className="button-wrap">
        <MoreButton type="up" openHandler={openHandler} isbn={item.isbn} />
        <div className="price-wrap">
          <p>
            <span className="price-title">원가</span>
            <span className="price-number">
              <s>{moneyComma(item.price)}</s> 원
            </span>
          </p>
          {item.sale_price && (
            <p>
              <span className="price-title">할인가</span>
              <span className="price-number">
                <b>{moneyComma(item.sale_price)}</b> 원
              </span>
            </p>
          )}
          <BuyButton url={item.url} />
        </div>
      </div>
    </div>
  );
};

function BookList({
  bookList,
  setBookList,
}: {
  bookList: receiveObjListProps[];
  setBookList?: (bookList: receiveObjListProps[]) => void;
}) {
  const openHandler = (isbn: string, bool: boolean) => {
    const newBookList = bookList.map((item: receiveObjListProps) => {
      if (item.isbn === isbn) {
        return { ...item, isOpen: bool };
      }
      return item;
    });
    if (setBookList) {
      setBookList(newBookList);
    }
  };

  return (
    <section className="books-list-wrap">
      {bookList?.map((item: receiveObjListProps) => (
        <article key={item.isbn} className="book-item-wrap">
          <div className="book-item">
            <div className="contents-wrap">
              <div className="title-wrap">
                <ThumbnailImage
                  thumbnail={item.thumbnail}
                  isWish={item.isWish}
                  isbn={item.isbn}
                />
                <BookTitle title={item.title} author={item.authors[0]} />
              </div>
              <p className="price">{moneyComma(item.sale_price)} 원</p>
            </div>
            <div className="buttons">
              <BuyButton url={item.url} />
              <MoreButton
                type="down"
                openHandler={openHandler}
                isbn={item.isbn}
              />
            </div>
          </div>
          {item.isOpen && <BookInfoBox item={item} openHandler={openHandler} />}
        </article>
      ))}
    </section>
  );
}
export default BookList;
