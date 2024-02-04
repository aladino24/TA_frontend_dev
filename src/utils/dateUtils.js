import React from 'react';

function DateInput({ timestamp, onChange }) {
  const convertTimestampToDateString = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <input 
      type="date" 
      className="form-control"
      value={convertTimestampToDateString(timestamp)}
      onChange={(e) => {
        onChange(new Date(e.target.value).getTime());
      }}
    />
  );
}

export default DateInput;