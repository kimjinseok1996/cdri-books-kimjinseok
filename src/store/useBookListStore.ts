import { create } from "zustand";
import type { receiveObjListProps } from "../types/books.type";

interface BookListProps {
  bookList: receiveObjListProps[];
  setBookList: (value: receiveObjListProps[]) => void;
}

const useBookListStore = create<BookListProps>((set) => ({
  bookList: [],
  setBookList: (value) => set(() => ({ bookList: value })),
}));

export default useBookListStore;
