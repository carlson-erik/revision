import styled from 'styled-components';
import { RenderLeafProps } from 'slate-react';

const LeafSpan = styled.span<{
  bold?: boolean;
  italics?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  textcolor?: string;
  emptyText?: boolean;
}>`
  font-weight: ${props => props.bold ? 'bold;' : 'normal'};
  font-style: ${props => props.italics ? 'italic' : 'normal'};
  text-decoration: ${props => {
    const styles = [];
    if(props.strikethrough) styles.push('line-through');
    if(props.underline) styles.push('underline');
    if(styles.length > 0 ) {
      return styles.join(' ');
    }
    return 'none'
  }};
  color: ${props => props.textcolor ? props.textcolor : 'black'};
  /*
    The following is a workaround for a Chromium bug where,
    if you have an inline at the end of a block,
    clicking the end of a block puts the cursor inside the inline
    instead of inside the final {text: ''} node
    https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
  */
  ${props => props.emptyText ? 'padding-left: 0.1px;' : ''}
`;

const TextLeaf = (props: RenderLeafProps) => {
  const { attributes, leaf, children } = props;
  return (
    <LeafSpan
      {...attributes}
      italics={leaf.italics}
      underline={leaf.underline}
      strikethrough={leaf.strikethrough}
      bold={leaf.bold}
      textcolor={leaf.textcolor}
      emptyText={leaf.text === ''}
    >
      {children}
    </LeafSpan>
  )
}

export default TextLeaf;