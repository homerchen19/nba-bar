import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Icon } from 'antd-mobile';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const formatDate = date => format(parse(date), 'DD, MMM, YYYY');

const Button = styled(Icon)`
  cursor: pointer;
`;

const Item = styled(Flex.Item)`
  text-align: ${prop => prop.align};
`;

const DateSelector = ({ date, addDay, subDay }) => (
  <Flex style={{ width: '100%' }}>
    <Item align="left">
      <Button type="left" onClick={subDay} />
    </Item>
    <Item align="center">{formatDate(date)}</Item>
    <Item align="right">
      <Button type="right" onClick={addDay} />
    </Item>
  </Flex>
);

DateSelector.propTypes = {
  addDay: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  subDay: PropTypes.func.isRequired,
};

export default DateSelector;
