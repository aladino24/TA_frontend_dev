import React, { useState } from "react";
import PropTypes from 'prop-types';
import './css/RadioButton.css';

const SwitchButton = ({ name, value, onChange }) => {
  const [answer, setAnswer] = useState(value);

  const handleRadioChange = (event) => {
    const newValue = event.target.value;
    setAnswer(newValue);
    onChange(newValue);

    console.log("SwitchButton.js: handleRadioChange: newValue: ", newValue);
  };

  return (
    <div className="radio-container">
      <input
        type="radio"
        id={`${name}-yes`}
        name={name}
        value="T"
        checked={answer === 'T'}
        onChange={handleRadioChange}
      />
      <label htmlFor={`${name}-yes`}>Yes</label>

      <input
        type="radio"
        id={`${name}-no`}
        name={name}
        value="F"
        checked={answer === 'F'}
        onChange={handleRadioChange}
      />
      <label htmlFor={`${name}-no`}>No</label>
    </div>
  );
};

SwitchButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf(['T', 'F']),
  onChange: PropTypes.func.isRequired,
};

SwitchButton.defaultProps = {
  value: 'F', // Set a default value based on your requirement
};

export default SwitchButton;
