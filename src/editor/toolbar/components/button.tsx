import styled from "styled-components";
/* -------- Styled Components -------- */
const Action = styled.a`
  text-decoration: none;
  &:active > button {
    position: relative;
    top: 2px;
  }
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;

  display: flex;
  justify-items: center;
`;
const Primary = styled(StyledButton)`
  color: #ffffff;
  background-color: #0f62d7;
  &:focus {
    outline-color: #0f62d7;
  }
`;
const Secondary = styled(StyledButton)`
  color: #a9aeb7;
  background-color: #52555f;
  border: 1px solid #e5e8ec;

  &:hover {
    background-color: #a9aeb7;
    color: #ffffff;
    & svg {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
        hue-rotate(7deg) brightness(102%) contrast(102%);
    }
  }
  &:focus {
    outline-color: #a9aeb7;
  }
`;
const ButtonLabel = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

interface ButtonProps {
  children: any;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  primary?: boolean;
}

function Button(props: ButtonProps) {
  const { children, onClick, primary } = props;
  return (
    <Action onClick={onClick}>
      {primary ? (
        <Primary>
          <ButtonLabel>{children}</ButtonLabel>
        </Primary>
      ) : (
        <Secondary>
          <ButtonLabel>{children}</ButtonLabel>
        </Secondary>
      )}
    </Action>
  );
}

export default Button;
