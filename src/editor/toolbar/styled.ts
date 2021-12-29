import styled from 'styled-components';

const ToolbarIcon = styled.svg<{ size: 'small' | 'large' }>`
  height: ${props => props.size === 'large' ? '24' : '16'}px;
  width: ${props => props.size === 'large' ? '24' : '16'}px;
`;

export {
  ToolbarIcon
}