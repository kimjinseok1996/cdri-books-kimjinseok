import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { receiveObjListProps } from "../types/books.type";

interface WishListProps {
  wishList: receiveObjListProps[];
  setWishList: (value: receiveObjListProps[]) => void;
  addWishList: (value: receiveObjListProps[]) => void;
  removeWishList: (isbn: string) => void;
}

const useWishListStore = create(
  persist<WishListProps>(
    (set) => ({
      wishList: [],
      setWishList: (value) => set(() => ({ wishList: value })),
      addWishList: (value) =>
        set((state) => ({ wishList: [...state.wishList, ...value] })),
      removeWishList: (isbn: string) =>
        set((state) => ({
          wishList: state.wishList.filter((item) => item.isbn !== isbn),
        })),
    }),
    {
      name: "wishList",
    }
  )
);

export default useWishListStore;
