import { create } from "zustand";

interface SendObjProps {
  sendObj: {
    query: string;
    sort: string;
    page: number;
    size: number;
    target: string;
  };
  setSendObj: (value: SendObjProps["sendObj"]) => void;
  setSendObjKeyValue: (
    key: keyof SendObjProps["sendObj"],
    value: string | number
  ) => void;
  setPage: (page: number) => void;
}

const useSendObjStore = create<SendObjProps>((set) => ({
  sendObj: {
    query: "",
    sort: "",
    page: 1,
    size: 10,
    target: "",
  },
  setSendObj: (value) => set(() => ({ sendObj: value })),
  setSendObjKeyValue: (key, value) =>
    set((state) => ({
      sendObj: {
        ...state.sendObj,
        [key]: value,
      },
    })),
  setPage: (page) =>
    set((state) => ({
      sendObj: {
        ...state.sendObj,
        page,
      },
    })),
}));

export default useSendObjStore;
