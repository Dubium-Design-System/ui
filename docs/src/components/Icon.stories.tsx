import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
	createIcon,
	DUIProvider,
	Icon,
	type IIconComponentProps,
} from "@dubium/ui";

const StoryCheckIcon = ({ color = "currentColor" }: IIconComponentProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M20 6L9 17L4 12"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const StoryPlusIcon = ({ color = "currentColor" }: IIconComponentProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M12 5V19M5 12H19"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};

const storyIcons = {
	Check: () => Promise.resolve({ default: StoryCheckIcon }),
	Plus: () => Promise.resolve({ default: StoryPlusIcon }),
} as const;

const StoryIcon = createIcon<typeof storyIcons>();

const meta = {
	title: "Components/Icon",
	component: Icon,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],

	argTypes: {
		name: {
			control: { type: "select" },
			options: ["Close"],
			description: "Имя иконки из встроенного или кастомного реестра.",
		},

		size: {
			control: {
				type: "number",
				min: 8,
				max: 96,
				step: 1,
			},
			description: "Приоритетный квадратный размер иконки.",
		},

		width: {
			control: {
				type: "number",
				min: 8,
				max: 160,
				step: 1,
			},
			description: "Ширина иконки. Если не задана, используется size.",
		},

		height: {
			control: {
				type: "number",
				min: 8,
				max: 160,
				step: 1,
			},
			description: "Высота иконки. Если не задана, используется size.",
		},

		color: {
			control: "color",
			description: "Цвет иконки.",
		},

		deg: {
			control: {
				type: "number",
				min: 0,
				max: 360,
				step: 15,
			},
			description: "Поворот иконки в градусах.",
		},

		ariaLabel: {
			control: "text",
			description: "Доступное имя иконки.",
		},

		onClick: {
			action: "clicked",
			description: "Обработчик клика.",
		},
	},

	args: {
		name: "Close",
		size: 24,
		color: "currentColor",
		deg: 0,
		ariaLabel: "Close",
		onClick: fn(),
	},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		name: "Close",
		size: 32,
		color: "currentColor",
		ariaLabel: "Close",
	},
};

export const Sizes: Story = {
	render: (args) => {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 16,
				}}
			>
				<Icon {...args} size={16} />
				<Icon {...args} size={24} />
				<Icon {...args} size={32} />
				<Icon {...args} size={48} />
				<Icon {...args} size={64} />
			</div>
		);
	},
	args: {
		name: "Close",
		color: "currentColor",
		ariaLabel: "Close",
	},
};

export const Colors: Story = {
	render: (args) => {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 16,
				}}
			>
				<Icon {...args} color="currentColor" />
				<Icon {...args} color="#1d4ed8" />
				<Icon {...args} color="#15803d" />
				<Icon {...args} color="#b91c1c" />
				<Icon {...args} color="#9333ea" />
			</div>
		);
	},
	args: {
		name: "Close",
		size: 40,
		ariaLabel: "Close",
	},
};

export const Rotation: Story = {
	render: (args) => {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 16,
				}}
			>
				<Icon {...args} deg={0} />
				<Icon {...args} deg={45} />
				<Icon {...args} deg={90} />
				<Icon {...args} deg={180} />
			</div>
		);
	},
	args: {
		name: "Close",
		size: 40,
		color: "currentColor",
		ariaLabel: "Close",
	},
};

export const RectangleSize: Story = {
	args: {
		name: "Close",
		size: 24,
		width: 48,
		height: 24,
		color: "currentColor",
		ariaLabel: "Close",
	},
};

export const Clickable: Story = {
	args: {
		name: "Close",
		size: 40,
		color: "currentColor",
		ariaLabel: "Close",
		onClick: fn(),
	},
};

export const CustomIcons: Story = {
	parameters: {
		controls: {
			disable: true,
		},
	},

	render: () => {
		return (
			<DUIProvider icons={storyIcons}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
					}}
				>
					<StoryIcon
						name="Check"
						size={40}
						color="#15803d"
						ariaLabel="Check"
					/>

					<StoryIcon
						name="Plus"
						size={40}
						color="#1d4ed8"
						ariaLabel="Plus"
					/>

					<StoryIcon
						name="Close"
						size={40}
						color="currentColor"
						ariaLabel="Close"
					/>
				</div>
			</DUIProvider>
		);
	},
};

export const CustomIconPlayground: Story = {
	parameters: {
		controls: {
			disable: true,
		},
	},

	render: () => {
		return (
			<DUIProvider icons={storyIcons}>
				<div
					style={{
						display: "grid",
						gap: 16,
						justifyItems: "center",
					}}
				>
					<StoryIcon
						name="Check"
						size={64}
						color="#15803d"
						ariaLabel="Check"
					/>

					<code>
						{"const StoryIcon = createIcon<typeof storyIcons>();"}
					</code>
				</div>
			</DUIProvider>
		);
	},
};
