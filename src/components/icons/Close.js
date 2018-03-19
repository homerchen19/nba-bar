import React from 'react';
import PropTypes from 'prop-types';

const Close = ({ size = 20, stroke = '#36434D', strokeWidth, opacity, ...props }) => (
  <svg
    width={size}
    height={Math.round(size * 0.818)}
    viewBox="0 0 11 9"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Close</title>
    <g
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.257.257l8.486 8.486M9.743.257L1.257 8.743" />
    </g>
  </svg>
);

Close.propTypes = {
  size: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  opacity: PropTypes.number,
};

export default Close;
