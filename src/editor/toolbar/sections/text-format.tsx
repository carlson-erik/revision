import { useSlate } from 'slate-react';
/* -------- Components -------- */
import ActionButton from '../components/action-button';
import { SectionContainer } from '../styled';
/* -------- Actions & Types -------- */
import { getActiveTextColor, isTextFormatActive, toggleTextFormat } from '../../actions';
/* -------- Icon Components -------- */
import Bold from '../icons/bold';
import Italic from '../icons/italic';
import Strikethrough from '../icons/strikethrough';
import Underline from '../icons/underline';
import Color from '../icons/color';

const TextFormatSection = () => {
  const editor = useSlate();
  return (
    <SectionContainer noSeparator={true}>
      <ActionButton
        active={isTextFormatActive(editor, 'bold')}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleTextFormat(editor, 'bold')
        }}
      >
        <Bold color='black' />
      </ActionButton>
      <ActionButton
        active={isTextFormatActive(editor, 'italics')}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleTextFormat(editor, 'italics')
        }}
      >
        <Italic color='black' />
      </ActionButton>
      <ActionButton
        active={isTextFormatActive(editor, 'underline')}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleTextFormat(editor, 'underline')
        }}
      >
        <Underline color='black' />
      </ActionButton>
      <ActionButton
        active={isTextFormatActive(editor, 'strikethrough')}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleTextFormat(editor, 'strikethrough')
        }}
      >
        <Strikethrough color='black' />
      </ActionButton>
      <ActionButton
        active={isTextFormatActive(editor, 'textcolor')}
        onMouseDown={(event) => {
          event.preventDefault();
          console.log('active color: ', getActiveTextColor(editor));
        }}
      >
        <Color color={getActiveTextColor(editor) == 'PRIMARY' ? 'black' : getActiveTextColor(editor)} />
      </ActionButton>
    </SectionContainer>
  )
}

export default TextFormatSection;