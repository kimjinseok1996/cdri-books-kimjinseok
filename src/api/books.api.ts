import { callsApi } from "./axios";
import { getBooksDataPath } from "./path/searchBook.path";
import type { sendObjProps } from "../types/books.type";

export const getBooksData = async (sendData: sendObjProps) => {
  const queryStr = new URLSearchParams(
    Object.fromEntries(
      Object.entries(sendData).map(([key, value]) => [key, String(value)])
    )
  ).toString();
  return await callsApi.get(`${getBooksDataPath}?${queryStr}`);
};
