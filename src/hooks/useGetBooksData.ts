import { useMutation } from "@tanstack/react-query";
import { getBooksData } from "../api/books.api";
import useBookListStore from "../store/useBookListStore";
import useWishListStore from "../store/useWishListStore";
import type { sendObjProps } from "../types/books.type";

// export const useGetBooksData = (query: sendObjProps) => {
//   return useQuery({
//     queryKey: ["getBooksData", query],
//     queryFn: async () => {
//       const response = await getBooksData(query);
//       const newData = {
//         ...response.data,
//         documents: response.data.documents.map((item: receiveObjProps) => ({
//           ...item,
//           isWish: false,
//           isOpen: false,
//         })),
//       };
//       return newData;
//     },
//     enabled: false,
//   });
// };

export const useGetBooksData = () => {
  const wishList = useWishListStore((state) => state.wishList);
  const setBookList = useBookListStore((state) => state.setBookList);
  const setMetaData = useBookListStore((state) => state.setMetaData);

  return useMutation({
    mutationFn: async (requestObj: sendObjProps) => {
      const response = await getBooksData(requestObj);
      return response.data;
    },
    onSuccess: (data) => {
      const metaData = data?.meta;
      let list = data?.documents || [];
      if (!!wishList.length) {
        const isbnArr = wishList.map((item) => item.isbn);
        list = list.map((item: { isbn: string }) => ({
          ...item,
          isWish: isbnArr.includes(item.isbn),
        }));
      }
      setMetaData(metaData);
      setBookList(list);
    },
  });
};
