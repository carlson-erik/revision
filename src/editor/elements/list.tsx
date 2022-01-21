import { RenderElementProps } from 'slate-react';
import styled from 'styled-components';

const OrderedList = styled.ol``;
const BulletedList = styled.ul``;

const ListElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const { type } = element;

  let ListType;

  if(type === 'ordered-list') {
    ListType = OrderedList;
  } else {
    ListType = BulletedList;
  }

  return (
    <ListType {...attributes} >
      {children}
    </ListType>
  )
}

export default ListElement;