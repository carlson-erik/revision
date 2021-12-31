import styled from 'styled-components';
import { RenderLeafProps } from 'slate-react';

const LeafItem = styled.li<{
  bold?: boolean;
  italics?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  textcolor?: string;
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
`;

const ListLeaf = (props: RenderLeafProps) => {
  return (
    <LeafItem
      {...props.attributes}
      italics={props.leaf.italics}
      underline={props.leaf.underline}
      strikethrough={props.leaf.strikethrough}
      bold={props.leaf.bold}
      textcolor={props.leaf.textcolor}
    >
      {props.children}
    </LeafItem>
  )
}

export default ListLeaf;