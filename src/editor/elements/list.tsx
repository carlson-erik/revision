import { RenderElementProps } from 'slate-react';
import styled from 'styled-components';

const OrderedElement = styled.ol``;
const UnorderedElement = styled.ul``;

const ListElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const { type } = element;

  let ElementType;

  if(type === 'ordered-list') {
    ElementType = OrderedElement;
  } else {
    ElementType = UnorderedElement;
  }

  return (
    <ElementType {...attributes} >
      {children}
    </ElementType>
  )
}

export default ListElement;