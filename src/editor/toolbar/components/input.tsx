import { ChangeEvent } from "react";
import styled from "styled-components";
/* -------- Styled Components -------- */
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
`;

const ThemedInput = styled.input`
  border-radius: 4px;
  border: 1px solid #e5e8ec;
  color: #1e2127;
  background-color: #ffffff;
  padding: 0.25rem;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
  &:focus {
    outline-color: #1e86ff;
  }
  &:disabled {
    color: #7c818b;
    background-color: #e5e8ec;
  }
`;

const ThemedLabel = styled.label`
  color: #a9aeb7;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 4px;
`;

type InputTypes = "text" | "password";

interface InputProps {
  id: string;
  type: InputTypes;
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const {
    id,
    label,
    type,
    placeholder,
    value,
    disabled = false,
    onChange,
  } = props;
  return (
    <InputContainer>
      {label && label !== "" && (
        <ThemedLabel data-testid="input-label" htmlFor={id}>
          {label}
        </ThemedLabel>
      )}
      <ThemedInput
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-testid="input"
      />
    </InputContainer>
  );
}
