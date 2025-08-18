import { create } from "zustand";

interface BookListProps {
  bookList: [];
  setBookList: (value: []) => void;
}

const useBookListStore = create<BookListProps>((set) => ({
  bookList: [],
  setBookList: (value) => set(() => ({ bookList: value })),
}));

export default useBookListStore;
