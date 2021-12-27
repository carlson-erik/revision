import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Editor, { EditorProps } from './';

export default {
  title: 'Editor',
  component: Editor,
  decorators: [withKnobs],
} as ComponentMeta<typeof Editor>;

const EditorTemplate: ComponentStory<typeof Editor> = (args: EditorProps) => {
  const readOnly = boolean('Read Only', false);
  return (
    <Editor {...args} readOnly={readOnly} />
  )
};

export const EmptyDocument = EditorTemplate.bind({});
EmptyDocument.args = {};