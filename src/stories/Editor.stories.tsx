import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Editor, { EditorProps } from '../editor';
import { LOREM_IPSUM, HANSEL_AND_GRETEL, LIST_EXAMPLE } from '../mock/content';
import styled from 'styled-components';
import './index.css';

const Container = styled.div`
  display:flex;
  justify-content: center;
  width: 100%;
`;

const EditorContainer = styled.div`
  width: 75%;
  padding-top: 2rem;
`;

export default {
  title: 'Editor',
  component: Editor,
  decorators: [withKnobs],
} as ComponentMeta<typeof Editor>;

const EditorTemplate: ComponentStory<typeof Editor> = (args: EditorProps) => {
  const readOnly = boolean('Read Only', false);
  return (
    <Container>
      <EditorContainer>
        <Editor {...args} readOnly={readOnly} />
      </EditorContainer>
    </Container>
  )
};

export const Empty = EditorTemplate.bind({});
Empty.args = {};

export const LoremIpsum = EditorTemplate.bind({});
LoremIpsum.args = {
  content: LOREM_IPSUM
};

export const HanselAndGretel = EditorTemplate.bind({});
HanselAndGretel.args = {
  content: HANSEL_AND_GRETEL
};

export const ListExample = EditorTemplate.bind({});
ListExample.args = {
  content: LIST_EXAMPLE
};