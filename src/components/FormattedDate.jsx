import React from "react";

const FormattedDate = ({ dateString, format = "DD-MM-YYYY" }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    switch (format) {
      case "MM-DD-YYYY":
        return `${month}-${day}-${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      default: // DD-MM-YYYY
        return `${day}-${month}-${year}`;
    }
  };

  return <span>{formatDate(dateString)}</span>;
};

export default FormattedDate;
