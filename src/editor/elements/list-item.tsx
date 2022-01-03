import { RenderElementProps } from 'slate-react';
import styled from 'styled-components';

const StyledListItem = styled.li``;

const ListItemElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  console.log('list-item render');
  return (
    <StyledListItem {...attributes} >
      {children}
    </StyledListItem>
  )
}

export default ListItemElement;