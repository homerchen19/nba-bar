import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Icon } from 'antd-mobile';
import styled from 'styled-components';
import format from 'date-fns/format';
import startOfDay from 'date-fns/start_of_day';

import { colors } from '../../styles/theme';

const formatDate = date => format(startOfDay(date), 'DD, MMM, YYYY');

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 30px;
  padding: 4px 7px;
  background-color: ${colors.darkBlue};
  color: ${colors.white};
`;

const Button = styled(Icon)`
  cursor: pointer;
`;

const Item = styled(Flex.Item)`
  margin-left: 0 !important;
  text-align: center;
`;

const Date = styled.p`
  font-size: 15px;
`;

const DateSelector = ({ date, addDay, subDay }) => (
  <Wrapper>
    <Flex>
      <Button type="left" onClick={subDay} />
      <Item>
        <Date>{formatDate(date)}</Date>
      </Item>
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
