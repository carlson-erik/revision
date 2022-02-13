import styled from 'styled-components';
/* -------- Styled Components -------- */
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
`;

const ThemedInput = styled.input`
  border-radius: 4px;
  border: 1px solid #E5E8EC;
  color: #1E2127;
  background-color: #FFFFFF;
  padding: 0.25rem;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
  &:focus {
    outline-color: #1e86ff;
  }
  &:disabled {
    color: #7C818B;
    background-color: #E5E8EC;
  }
`;

const ThemedLabel = styled.label`
  color: #A9AEB7;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 4px;
`;

type InputTypes = 'button' | 'checkbox' | 'text' | 'password';

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
  const { id, label, type, placeholder, value, disabled=false, onChange } = props;
  return (
    <InputContainer>
      {label && label !== '' && (
        <ThemedLabel htmlFor={id}>
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
      />
    </InputContainer>
  );
};