import React from "react";

export const TextContent = ({ className, text, ...props }) => {
  return (
    <span className={className} {...props}>
      {text}
    </span>
  );
};
