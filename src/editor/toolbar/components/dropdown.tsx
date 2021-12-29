import { Fragment, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
/* -------- Components -------- */
import Popper from './popper';
/* -------- Editor Actions -------- */
import { getElementBlockType } from '../actions';
/* -------- Types -------- */
import { CustomEditor } from '../../types';
/* -------- Icons -------- */
import Chevron from '../icons/chevron';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  width: 9rem;
  border: 1px solid #E5E8EC;
  margin-right: 4px;
`;
const SelectedValue = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  color: #52555F;
  cursor: default;
  font-size: 14px;

  & svg {
    padding-right: 0.5rem;
  }
`;

const IconContainer = styled.div`
  height: 2rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #52555F;
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
  font-size: 14px;

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
  const blockType = getElementBlockType(editor);

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
  const onClose = () => setIsOpen(false);
  const selectedOption: Option |  null = getCurrentOption(editor, options);
  const placeholder_text: string = placeholder && placeholder !== '' ? placeholder : '';

  return (
    <>
      <Container 
        onClick={() => {
          setIsOpen(!isOpen);
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
        <IconContainer>
          { isOpen ? (
            <Chevron size='small' color='#52555F' direction='down'/>
          ): (
            <Chevron size='small' color='#52555F' direction='up'/>
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