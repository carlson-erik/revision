import { useSlate } from "slate-react";
/* -------- Components -------- */
import ActionButton from "../components/action-button";
import { SectionContainer } from "../styled";
/* -------- Actions & Types -------- */
import { getElementNode, isTextElement, setElementFormat } from "../../actions";
/* -------- Icon Components -------- */
import Align from "../icons/align";

const AlignmentSection = () => {
  const editor = useSlate();
  const activeElement = getElementNode(editor);

  if (!activeElement || !isTextElement(activeElement)) {
    return null;
  }

  // Determine currently active/non-active alignments
  const hasLeftAlignment = activeElement.align === 'left';
  const hasCenterAlignment = activeElement.align === 'center';
  const hasRightAlignment = activeElement.align === 'right';
  const hasJustifyAlignment = activeElement.align === 'justify';

  return (
    <SectionContainer>
      <ActionButton
        active={hasLeftAlignment}
        onMouseDown={(event) => {
          event.preventDefault();
          if(!hasLeftAlignment) {
            setElementFormat(editor, 'align', 'left');
          }
        }}
      >
        <Align direction='left' color='black' />
      </ActionButton>
      <ActionButton
        active={hasCenterAlignment}
        onMouseDown={(event) => {
          event.preventDefault();
          if(!hasCenterAlignment) {
            setElementFormat(editor, 'align', 'center');
          }
        }}
      >
        <Align direction='center' color='black' />
      </ActionButton>
      <ActionButton
        active={hasRightAlignment}
        onMouseDown={(event) => {
          event.preventDefault();
          if(!hasRightAlignment) {
            setElementFormat(editor, 'align', 'right');
          }
        }}
      >
        <Align direction='right' color='black' />
      </ActionButton>
      <ActionButton
        active={hasJustifyAlignment}
        onMouseDown={(event) => {
          event.preventDefault();
          if(!hasJustifyAlignment) {
            setElementFormat(editor, 'align', 'justify');
          }
        }}
      >
        <Align direction='justify' color='black' />
      </ActionButton>
    </SectionContainer>
  );
}

export default AlignmentSection;