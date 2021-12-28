import { ReactNode, Ref } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ active?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0.25rem;
  background-color: #FFFFFF;

  &:hover {
    background-color: #D1D4D9;
  }

  ${props => props.active ?
    `background-color: #D1D4D9;`
    : ''}
`;

interface ToolbarButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
  reference?: Ref<HTMLButtonElement>;
}

const Button = (props: ToolbarButtonProps) => {
  const { children, active, onClick, reference } = props;
  return (
    <StyledButton onClick={onClick} active={active} ref={reference} >
      {children}
    </StyledButton>
  );
};

export default Button;