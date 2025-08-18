import { useQuery } from "@tanstack/react-query";
import { getBooksData } from "../api/books.api";
import type { sendObjProps } from "../types/books.type";

export const useGetBooksData = (query: sendObjProps) => {
  return useQuery({
    queryKey: ["getBooksData", query],
    queryFn: async () => {
      const response = await getBooksData(query);
      return response.data;
    },
    staleTime: 30 * 1000,
    retry: false,
    enabled: true,
  });
};
