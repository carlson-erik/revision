import { useContext } from 'react';
import styled from 'styled-components';
import { IconProps } from '../types';
/* -------- Styled Components -------- */
const Action = styled.a`
  text-decoration: none;
  &:active > button {
    position: relative;
    top: 2px;
  }
`;
const StyledButton = styled.button<{hasIcon: boolean, hasLabel: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding : ${props => props.hasIcon ? '0.5rem' : '0.5rem 0.75rem 0.5rem 0.75rem;'};
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
  & svg {
    height: 16px;
    width: 16px;
    margin-right: ${props => props.hasLabel ? '4px' : '0'};
  } 
`;

const Primary = styled(StyledButton)`
  color: #FFFFFF;
  background-color: #0F62D7;
  &:focus {
    outline-color: #0F62D7;
  }
`;

interface SecondaryProps {
  isActive: boolean;
}

const Secondary = styled(StyledButton)<SecondaryProps>`
  color: #A9AEB7;
  background-color: #52555F;
  border:1px solid #E5E8EC;
  ${ props => props.isActive ? `
    background-color: #A9AEB7;
    color: #FFFFFF;
    & svg {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(7deg) brightness(102%) contrast(102%);
    }
  ` : ''}
  &:hover {
    background-color: #A9AEB7;
    color: #FFFFFF;
    & svg {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(7deg) brightness(102%) contrast(102%);
    }
  }
  &:focus {
    outline-color: #A9AEB7;
  }
`;

const ButtonContents = styled.div`
  display: flex;
  justify-items: center;
`;

const ButtonLabel = styled.span`
  font-size: 12px;
  line-height: 16px;
`;

interface ButtonProps {
  isPrimary: boolean;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  isActive: boolean;
  label?: string;
  icon?: (props: IconProps) => JSX.Element;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { isActive, isPrimary, onClick, label, icon: IconComponent, disabled } = props;
  const hasIcon = IconComponent && IconComponent !== undefined ? true : false;
  const hasLabel = label && label !== '' ? true : false;

  return (
    <Action onClick={onClick}>
      {isPrimary ? (
        <Primary hasIcon={hasIcon} hasLabel={hasLabel} disabled={disabled}>
          <ButtonContents>
            <ButtonLabel>{label}</ButtonLabel>
          </ButtonContents>
        </Primary>
      ) : (
        <Secondary 
          isActive={isActive} 
          hasIcon={hasIcon} 
          hasLabel={hasLabel} 
          disabled={disabled}
        >
          <ButtonContents>
            <ButtonLabel>
              {label}
            </ButtonLabel>
          </ButtonContents>
        </Secondary>
      )}
    </Action>
  )
}

export default Button;