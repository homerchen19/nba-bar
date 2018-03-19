import styled from 'styled-components';

const ListItem = styled.li`
  border-bottom: 0.0625rem solid ${props => props.theme.colors.border};
  list-style: none;
  cursor: pointer;
`;

export default ListItem;
