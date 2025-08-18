import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishListProps {
  wishList: [];
  setWishList: (value: []) => void;
}

const useWishListStore = create(
  persist<WishListProps>(
    (set) => ({
      wishList: [],
      setWishList: (value) => set(() => ({ wishList: value })),
    }),
    {
      name: "wishList",
      //storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useWishListStore;
