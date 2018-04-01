import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavBar as AntdNavBar, Icon } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 30px;
`;

const NavBar = ({ page }) => (
  <Wrapper>
    <AntdNavBar
      mode="light"
      icon={
        <Link to="/" style={{ color: '#000' }}>
          <Icon type="left" style={{ cursor: 'pointer' }} />
        </Link>
      }
      style={{ height: '100%' }}
    >
      <p>{page}</p>
    </AntdNavBar>
  </Wrapper>
);

NavBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NavBar;
