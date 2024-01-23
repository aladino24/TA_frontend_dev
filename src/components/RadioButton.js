// RadioButtons.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/RadioButton.css'; // Import file CSS

const RadioButtons = ({ name, value, onChange, options1, options2 }) => {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    // Callback to parent when the value changes
    onChange(answer);
  }, [answer, onChange]);

  useEffect(() => {
    // Set the initial value when the component mounts
    setAnswer(value);
  }, [value]);

  const handleRadioChange = (event) => {
    setAnswer(event.target.value);
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
      <label htmlFor={`${name}-yes`}>{`${options1}`}</label>

      <input
        type="radio"
        id={`${name}-no`}
        name={name}
        value="F"
        checked={answer === 'F'}
        onChange={handleRadioChange}
      />
      <label htmlFor={`${name}-no`}>{`${options2}`}</label>
    </div>
  );
};

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf(['T', 'F']),
  onChange: PropTypes.func.isRequired,
};

RadioButtons.defaultProps = {
  value: 'T', // Set a default value based on your requirement
};

export default RadioButtons;
