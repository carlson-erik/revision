import { ReactNode, useState } from "react";
import styled from "styled-components";
/* -------- Components -------- */
import Popper from "./popper";
/* -------- Icons -------- */
import Chevron from "../icons/chevron";

const Container = styled.div<{ disabled: boolean }>`
  width: 9rem;
  height: 100%;
  display: flex;
  border: 1px solid #e5e8ec;

  background-color: ${(props) => (props.disabled ? "#EFF2F4" : "#FFFFFF")};
`;

const SelectedValue = styled.div<{ disabled: boolean }>`
  height: 2rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  color: #;
  cursor: default;
  font-size: 12px;

  color: ${(props) => (props.disabled ? "#7C818B" : "#343740")};

  & svg {
    padding-right: 0.25rem;
  }
`;

const IconContainer = styled.div<{ disabled: boolean }>`
  height: 2rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.disabled ? "#7C818B" : "#343740")};
`;

const OLContainer = styled.ul`
  background-color: white;
  border: 1px solid #e5e8ec;
  border-top: 0;
  margin-block: 0;
  padding: 0;
  width: 9rem;
`;

const OptionListItem = styled.li<{ selected: boolean }>`
  height: 2rem;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: ${"#52555F"};
  cursor: default;
  font-size: 12px;

  &:hover {
    background-color: #d1d4d9;
  }

  & svg {
    padding-right: 0.25rem;
  }

  ${(props) => (props.selected ? "background-color: #D1D4D9;" : "")}
`;

export type Option = {
  label: string;
  icon?: ReactNode;
  value: string;
};

interface OptionsListProps {
  options: Option[];
  selectedOption?: Option;
  onChange: (value: Option) => void;
  onClose: () => void;
}

const OptionsList = (props: OptionsListProps) => {
  const { options, selectedOption, onChange, onClose } = props;
  return (
    <OLContainer data-testid="options-list">
      {options.map((option) => {
        return (
          <OptionListItem
            key={option.value}
            data-testid="option"
            selected={
              selectedOption && selectedOption.value === option.value
                ? true
                : false
            }
            onClick={(event) => {
              onChange(option);
              onClose();
              event.stopPropagation();
            }}
          >
            {option?.icon ? option.icon : null}
            {option.label}
          </OptionListItem>
        );
      })}
    </OLContainer>
  );
};

interface DropdownProps {
  options: Option[];
  selectedOption?: Option;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: Option) => void;
}

const Dropdown = (props: DropdownProps) => {
  const {
    selectedOption,
    options,
    placeholder,
    onChange,
    disabled = false,
  } = props;
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const placeholderText: string =
    placeholder && placeholder !== "" ? placeholder : "Select an option";

  return (
    <>
      <Container
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        disabled={disabled}
        ref={setContainerRef}
        data-testid={disabled ? "dropdown-disabled" : "dropdown"}
      >
        <SelectedValue disabled={disabled}>
          {selectedOption && !disabled ? (
            <>
              {selectedOption.icon ? selectedOption.icon : null}
              {selectedOption.label}
            </>
          ) : (
            <>{placeholderText}</>
          )}
        </SelectedValue>
        <IconContainer disabled={disabled}>
          {isOpen ? (
            <Chevron size="small" color="#343740" direction="down" />
          ) : (
            <Chevron size="small" color="#343740" direction="up" />
          )}
        </IconContainer>
      </Container>
      {containerRef ? (
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
      ) : null}
    </>
  );
};

export default Dropdown;
