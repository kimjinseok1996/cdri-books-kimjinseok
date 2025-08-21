interface ErrorSectionProps {
  error: {
    response?: {
      data?: {
        message?: string;
      };
    };
    message?: string;
  };
}

import React from "react";

const errorStyle: React.CSSProperties = {
  color: "#ccc",
  margin: "252px 0",
  textAlign: "center",
};

function ErrorSection({ error }: ErrorSectionProps) {
  return (
    <div style={errorStyle}>
      {error.response?.data?.message || error?.message}
    </div>
  );
}
export default ErrorSection;
