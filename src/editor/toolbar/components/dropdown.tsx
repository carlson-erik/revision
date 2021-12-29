import { Fragment, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
/* -------- Components -------- */
import Popper from './popper';
/* -------- Editor Actions -------- */
import { getActiveBlockType } from '../actions';
/* -------- Types -------- */
import { CustomEditor } from '../../types';
/* -------- Icons -------- */
import Chevron from '../icons/chevron';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  width: 10rem;
`;
const SelectedValue = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  padding-left: 0.5rem;
  color: #52555F;
  font-weight: bold;
`;

const IconContainer = styled.div<{ disabled?: boolean; }>`
  height: 2rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #52555F;

  & > svg {
    color: ${props => props.disabled ? '#EFF2F4' : '#52555F'};
  }

  & > svg.small { 
    height: 1rem;
    width: 1rem;
  }
`;

const OLContainer = styled.ul`
  background-color: white;
  border: 1px solid #E5E8EC;
  width: 10rem;
  margin-block: 0;
  padding: 0;
`;

const OptionListItem = styled.li<{ selected: boolean; }>`
  font-size: 0.75rem;
  height: 2rem;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: ${'#52555F'};
  font-weight: bold;

  &:hover {
    background-color: #D1D4D9;
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
            onClick={() => {
              onChange(option);
              onClose();
            }}
          >
            {option.icon ? (
              <IconContainer>
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

const getCurrentOption = (editor:CustomEditor, options: Option[]) => {
  const blockType = getActiveBlockType(editor);

  // if we have a block type, get the needed display details (icon, label, etc)
  if(blockType !== null)
    return options.filter(option => option.value === blockType)[0];

  // no blockType selected, return null
  return null;
}

interface DropdownProps {
  options: Option[];
  placeholder: string;
  onChange: (value:Option) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { options, placeholder, onChange } = props;
  const editor = useSlate();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const selectedOption: Option |  null = getCurrentOption(editor, options);
  const placeholder_text: string = placeholder && placeholder !== '' ? placeholder : '';
  const disabled: boolean = !editor.selection && !editor.blurSelection;

  return (
    <>
      <Container 
        onClick={() => {
          if(!disabled) {
            onOpen();
          }
        }} 
        ref={setContainerRef}>
        <SelectedValue>
          {selectedOption !== null ? (
            <Fragment>
              {selectedOption.icon ? (
                <IconContainer>
                  {selectedOption.icon}
                </IconContainer>
                ) : null}
              {selectedOption.label}
            </Fragment>
          ) : placeholder_text}
        </SelectedValue>
        <IconContainer disabled={disabled}>
          { isOpen ? (
            <Chevron color='black' direction='down'/>
          ): (
            <Chevron color='black' direction='up'/>
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