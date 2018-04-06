import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Icon } from 'antd-mobile';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const formatDate = date => format(parse(date), 'DD, MMM, YYYY');

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  padding: 5px 10px;
  background-color: #eee;
`;

const Button = styled(Icon)`
  cursor: pointer;
`;

const Item = styled(Flex.Item)`
  margin-left: 0 !important;
  text-align: center;
`;

const DateSelector = ({ date, addDay, subDay }) => (
  <Wrapper>
    <Flex>
      <Button type="left" onClick={subDay} />
      <Item>{formatDate(date)}</Item>
      <Button type="right" onClick={addDay} />
    </Flex>
  </Wrapper>
);

DateSelector.propTypes = {
  addDay: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  subDay: PropTypes.func.isRequired,
};

export default DateSelector;
