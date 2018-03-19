import React from 'react';
import PropTypes from 'prop-types';

const Add = ({ size = 20, stroke = '#36434D', strokeWidth, opacity, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 13 13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Plus</title>
    <g
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M.5 6.5h12M6.5.5v12" />
    </g>
  </svg>
);

Add.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  opacity: PropTypes.number,
};

export default Add;
