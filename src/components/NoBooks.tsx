import noBooksIcon from "../assets/icon_book.svg";
import React from "react";

const bookWrapStyle: React.CSSProperties = {
  padding: "128px 0",
  textAlign: "center",
};

const imgStyle: React.CSSProperties = {
  maxWidth: "82px",
  height: "auto",
};

const descStyle: React.CSSProperties = {
  marginTop: "16px",
  color: "var(--secondary-color)",
};

function NoBooks({ description }: { description?: string }) {
  return (
    <div style={bookWrapStyle}>
      <img src={noBooksIcon} alt="No Books" style={imgStyle} />
      <p style={descStyle}>{description || "검색된 결과가 없습니다."}</p>
    </div>
  );
}
export default NoBooks;
