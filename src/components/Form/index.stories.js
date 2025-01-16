import Form from './index';

export default {
  title: 'Example/Form',
  component: Form,
};

const Template = (args) => <Form {...args} />;

export const Income = Template.bind({});

Income.args = {
  onChange: () => {},
};
