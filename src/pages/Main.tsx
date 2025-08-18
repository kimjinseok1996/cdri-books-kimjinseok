import { useGetBooksData } from "../hooks/useGetBooksData";

function Main() {
  const sendObj = {
    query: "미움받을 용기",
    sort: "",
    page: 1,
    size: 10,
    target: "",
  };

  const { data, error } = useGetBooksData(sendObj);

  console.log("data >", data);
  console.log("error >", error);

  return <>ddd</>;
}

export default Main;
