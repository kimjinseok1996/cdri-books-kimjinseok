export interface sendObjProps {
  query: string;
  sort: string;
  page: number | string;
  size: number | string;
  target: string;
}

export interface receiveObjListProps {
  isbn: string;
  title: string;
  authors: string[];
  thumbnail: string;
  sale_price: number;
  isWish: boolean;
  isOpen: boolean;
  contents: string;
  price: number;
  url: string;
}

export interface receiveObjProps {
  documents: Array<receiveObjListProps>;
  isOpen: boolean;
  totalCount: number;
  page: number;
  size: number;
}
