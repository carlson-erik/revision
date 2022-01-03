import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
/* -------- Components -------- */
import Popper from './popper';
/* -------- Editor Actions -------- */
import { getElementNode } from '../../actions';
/* -------- Types -------- */
import { CustomEditor } from '../../types';
/* -------- Icons -------- */
import Chevron from '../icons/chevron';

const Container = styled.div<{ disabled: boolean}>`
  width: 9rem;
  height: 100%;
  display: flex;
  border: 1px solid #E5E8EC;

  background-color: ${props => props.disabled ? '#EFF2F4' : '#FFFFFF'};
`;

const SelectedValue = styled.div<{ disabled: boolean}>`
  height: 2rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  color: #;
  cursor: default;
  font-size: 12px;

  color: ${props => props.disabled ? '#7C818B' : '#343740'};
  
  & svg {
    padding-right: 0.5rem;
  }
`;

const IconContainer = styled.div<{ disabled: boolean}>`
  height: 2rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => props.disabled ? '#7C818B' : '#343740'};
`;

const OLContainer = styled.ul`
  background-color: white;
  border: 1px solid #E5E8EC;
  border-top: 0;
  margin-block: 0;
  padding: 0;
  width: 9rem;
`;

const OptionListItem = styled.li<{ selected: boolean; }>`
  height: 2rem;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: ${'#52555F'};
  cursor: default;
  font-size: 12px;

  &:hover {
    background-color: #D1D4D9;
  }

  & svg {
    padding-right: 0.5rem;
  }

  ${props => props.selected ? 'background-color: #D1D4D9;' : ''}
`;

export type Option = {
  label: string;
  icon: ReactNode;
  value: string;
}

interface OptionsListProps {
  options: Option[];
  selectedOption?: Option;
  onChange: (value:Option) => void;
  onClose: () => void;
}

const OptionsList = (props:OptionsListProps) => {
  const { options, selectedOption, onChange, onClose } = props;
  return (
    <OLContainer>
      {options.map( option => {
        return (
          <OptionListItem 
            key={option.value} 
            selected={selectedOption && selectedOption.value === option.value ? true : false} 
            onMouseDown={() => {
              onChange(option);
              onClose();
            }}
          >
            {option.icon ? (
              <IconContainer disabled={false}>
                {option.icon}
              </IconContainer>
              ) : null}
            {option.label}
          </OptionListItem>
        )
      })}
    </OLContainer>
  )
}

// Gets the active element and as long as it exists, we find the current Element
const getCurrentOption = (editor:CustomEditor, options: Option[]) => {
  const activeElement = getElementNode(editor);

  if(activeElement !== null)
    return options.filter(option => option.value === activeElement.type)[0];

  return null;
}

interface DropdownProps {
  options: Option[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value:Option) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { options, placeholder, onChange, disabled=false } = props;
  const editor = useSlate();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const selectedOption: Option |  null = getCurrentOption(editor, options);
  const placeholder_text: string = placeholder && placeholder !== '' ? placeholder : '';

  return (
    <>
      <Container 
        onClick={() => {
          if(!disabled) {
            setIsOpen(!isOpen);
          }
        }} 
        disabled={disabled}
        ref={setContainerRef}>
        <SelectedValue disabled={disabled}>
          {selectedOption !== null && !disabled ? (
            <>
              {selectedOption.icon ? (
                <IconContainer disabled={disabled}>
                  {selectedOption.icon}
                </IconContainer>
                ) : null}
              {selectedOption.label}
            </>
          ) : placeholder_text}
        </SelectedValue>
        <IconContainer disabled={disabled}>
          { isOpen ? (
            <Chevron size='small' color='#343740' direction='down'/>
          ): (
            <Chevron size='small' color='#343740' direction='up'/>
          )}
        </IconContainer>
      </Container>
      {containerRef !== null ? (
        <Popper
          targetRef={containerRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          clickOutside
          placement="bottom-start"
        >
          <OptionsList 
            options={options} 
            selectedOption={selectedOption || undefined} 
            onChange={onChange} 
            onClose={onClose}
          />
        </Popper>
      ): null}
    </>
  )
};

export default Dropdown;