import { useQuery } from "@tanstack/react-query";
import { getBooksData } from "../api/books.api";
import type { sendObjProps, receiveObjProps } from "../types/books.type";

export const useGetBooksData = (query: sendObjProps) => {
  return useQuery({
    queryKey: ["getBooksData", query],
    queryFn: async () => {
      const response = await getBooksData(query);
      const newData = {
        ...response.data,
        documents: response.data.documents.map((item: receiveObjProps) => ({
          ...item,
          isWish: false,
          isOpen: false,
        })),
      };
      return newData;
    },
    enabled: false,
  });
};
