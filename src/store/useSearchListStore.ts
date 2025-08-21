import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchListProps {
  searchList: string[];
  setSearchList: (value: string[]) => void;
  addSearchList: (value: string[]) => void;
  removeSearchList: (index: number) => void;
}

const useSearchListStore = create(
  persist<SearchListProps>(
    (set) => ({
      searchList: [],
      setSearchList: (value) => set(() => ({ searchList: value })),
      addSearchList: (value) =>
        set((state) => {
          const newList = [...value, ...state.searchList];
          if (newList.length > 8) newList.pop();
          return { searchList: newList };
        }),
      removeSearchList: (index: number) =>
        set((state) => {
          const newList = state.searchList.filter((_, i) => i !== index);
          return { searchList: newList };
        }),
    }),
    {
      name: "searchList",
    }
  )
);

export default useSearchListStore;
