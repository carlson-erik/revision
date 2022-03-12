import { MouseEventHandler, ReactNode, Ref } from "react";
import styled from "styled-components";

const StyledButton = styled.span<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0.25rem;
  background-color: #ffffff;

  ${(props) => (props.active ? `background-color: #D1D4D9;` : "")}
`;

interface ActionButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  reference?: Ref<HTMLButtonElement>;
}

const ActionButton = (props: ActionButtonProps) => {
  const { children, active, onClick, onMouseDown, reference } = props;
  return (
    <StyledButton
      onClick={onClick}
      onMouseDown={onMouseDown}
      active={active}
      ref={reference}
      data-testid="action-button"
    >
      {children}
    </StyledButton>
  );
};

export default ActionButton;
