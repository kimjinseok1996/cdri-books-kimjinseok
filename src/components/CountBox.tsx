import React from "react";

const wrapStyle: React.CSSProperties = {
  margin: "64px 0 32px 0",
  fontWeight: 500,
};

const spanStyle: React.CSSProperties = {
  color: "var(--primary-color)",
};

function CountBox({
  len,
  description,
}: {
  len?: number;
  description?: string;
}) {
  return (
    <div style={wrapStyle}>
      <p>
        {description || "도서 검색 결과"} 총{" "}
        <span style={spanStyle}>{len || 0}</span>건
      </p>
    </div>
  );
}
export default CountBox;
