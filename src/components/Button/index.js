import styled from 'styled-components';

const Button = styled.button`
  margin-bottom: 1rem;
  padding: 0.8125rem 2rem;
  border: 2px solid;
  border-radius: 30px;
  color: ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.white};
  outline: 0;
  transition: background 0.2s, color 0.25s;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.success};
  }
`;

export default Button;
