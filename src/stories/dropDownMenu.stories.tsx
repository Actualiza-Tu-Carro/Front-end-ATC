import type { Meta, StoryObj } from '@storybook/react';
import { anchorArray } from '../components/dropdownMenu/anchorArray';
import { DropDownMenu } from '../components/dropdownMenu/dropdownMenu';
import Icon from '~/assets/icons/icon';

let icono = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.4146 22.1224C23.4146 22.8361 22.8361 23.4153 22.1224 23.4153H16.1557V14.3475H19.1994L19.6554 10.8141H16.1557V8.55749C16.1557 7.53445 16.4402 6.83732 17.9071 6.83732L19.7785 6.83668V3.6757C19.4545 3.63296 18.344 3.53666 17.0518 3.53666C14.3539 3.53666 12.5068 5.18348 12.5068 8.20797V10.8141H9.45553V14.3475H12.5068V23.4153H1.2922C0.578493 23.4153 0 22.8361 0 22.1224V1.29284C0 0.578494 0.578493 0 1.2922 0H22.1224C22.8361 0 23.4146 0.578494 23.4146 1.29284V22.1224"
      fill="#F5F5F6"
    />
  </svg>
);

let name = 'Category';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'DropDown',
  component: DropDownMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    //layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DDMTittle: Story = {
  args: {
    title: name,
    anchorArray: anchorArray,
  },
};

export const DDMIcon: Story = {
  args: {
    icon: 'Moon',
    anchorArray: anchorArray,
  },
};
