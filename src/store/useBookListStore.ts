import { create } from "zustand";
import type { receiveObjListProps } from "../types/books.type";

interface MetaData {
  total_count?: number;
  pageable_count?: number;
  is_end?: boolean;
}

interface BookListProps {
  metaData: MetaData;
  bookList: receiveObjListProps[];
  setBookList: (value: receiveObjListProps[]) => void;
  setMetaData: (value: MetaData) => void;
}

const useBookListStore = create<BookListProps>((set) => ({
  metaData: {},
  bookList: [],
  setBookList: (value) => set(() => ({ bookList: value })),
  setMetaData: (value) => set(() => ({ metaData: value })),
}));

export default useBookListStore;
