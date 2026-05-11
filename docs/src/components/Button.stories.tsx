import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Button, type IButtonProps } from "@dubium/ui";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],

	argTypes: {
		children: {
			control: "text",
			description: "Содержимое кнопки.",
		},

		type: {
			control: { type: "select" },
			options: ["button", "submit", "reset"],
			description: "Нативный HTML type для button.",
		},

		disabled: {
			control: "boolean",
			description: "Отключает кнопку.",
		},

		fluid: {
			control: "boolean",
			description:
				"Растягивает кнопку на всю доступную ширину контейнера.",
		},

		stopPropagation: {
			control: "boolean",
			description: "Останавливает всплытие события click.",
		},

		preventDefault: {
			control: "boolean",
			description: "Предотвращает действие по умолчанию для click.",
		},

		onClick: {
			action: "clicked",
			description: "Обработчик клика.",
		},
	},

	args: {
		children: "Button",
		type: "button",
		disabled: false,
		fluid: false,
		stopPropagation: false,
		preventDefault: false,
		onClick: fn(),
	},
} satisfies Meta<IButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled button",
		disabled: true,
	},
};

export const Fluid: Story = {
	render: (args) => (
		<div style={{ width: 320 }}>
			<Button {...args} />
		</div>
	),
	args: {
		children: "Fluid button",
		fluid: true,
	},
};

export const Submit: Story = {
	args: {
		children: "Submit",
		type: "submit",
	},
};

export const WithStopPropagation: Story = {
	render: (args) => (
		<div
			role="presentation"
			style={{
				padding: 24,
				border: "1px dashed currentColor",
			}}
			onClick={fn()}
		>
			<Button {...args} />
		</div>
	),
	args: {
		children: "Stop propagation",
		stopPropagation: true,
	},
};

export const WithPreventDefault: Story = {
	args: {
		children: "Prevent default",
		preventDefault: true,
	},
};
