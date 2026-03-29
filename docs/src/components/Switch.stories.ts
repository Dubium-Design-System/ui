import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Switch, type SwitchProps } from "@dubium/ui";

const meta = {
	title: "Components/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],

	argTypes: {
		checked: {
			control: { type: "boolean" },
			description: "Текущее состояние переключателя (управляемый режим)",
		},
		defaultChecked: {
			control: { type: "boolean" },
			description:
				"Начальное состояние переключателя (неуправляемый режим)",
		},
		label: {
			control: { type: "text" },
			description: "Текст или React-элемент для отображения метки",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Отключение переключателя",
		},
		labelPosition: {
			control: { type: "select" },
			options: ["left", "right"],
			description: "Позиция метки относительно переключателя",
		},
		ariaLabel: {
			control: { type: "text" },
			description: "ARIA-метка для accessibility",
		},
		ariaDescription: {
			control: { type: "text" },
			description:
				"ARIA-описание для дополнительной accessibility информации",
		},
	},

	args: {
		onChange: fn(),
		defaultChecked: false,
		disabled: false,
		labelPosition: "right",
	},
} satisfies Meta<SwitchProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Базовое состояние переключателя с меткой справа
 */
export const Primary: Story = {
	args: {
		label: "Switch label",
		defaultChecked: false,
	},
};

/**
 * Переключатель во включенном состоянии
 */
export const Checked: Story = {
	args: {
		label: "Checked switch",
		defaultChecked: true,
	},
};

/**
 * Переключатель с меткой слева
 */
export const LabelLeft: Story = {
	args: {
		label: "Label on the left",
		labelPosition: "left",
		defaultChecked: false,
	},
};

/**
 * Отключенный переключатель
 */
export const Disabled: Story = {
	args: {
		label: "Disabled switch",
		disabled: true,
		defaultChecked: false,
	},
};

/**
 * Отключенный переключатель во включенном состоянии
 */
export const DisabledChecked: Story = {
	args: {
		label: "Disabled checked switch",
		disabled: true,
		defaultChecked: true,
	},
};

/**
 * Переключатель без метки
 */
export const WithoutLabel: Story = {
	args: {
		label: undefined,
		defaultChecked: false,
	},
};

/**
 * Переключатель с ARIA-меткой для улучшенной доступности
 */
export const WithAriaLabel: Story = {
	args: {
		label: "Notifications",
		ariaLabel: "Enable or disable notifications",
		defaultChecked: false,
	},
};

/**
 * Переключатель с ARIA-описанием
 */
export const WithAriaDescription: Story = {
	args: {
		label: "Auto-save",
		ariaDescription:
			"When enabled, your changes will be saved automatically",
		defaultChecked: false,
	},
};

/**
 * Управляемый режим (интерактивный пример)
 * @description Используйте Actions панель для отслеживания onChange событий
 */
export const Controlled: Story = {
	args: {
		label: "Controlled switch",
		checked: true,
	},
	parameters: {
		docs: {
			description: {
				story: "В управляемом режиме состояние контролируется через `checked` проп. Используйте `onChange` для обновления состояния.",
			},
		},
	},
};

/**
 * Неуправляемый режим с начальным состоянием
 */
export const Uncontrolled: Story = {
	args: {
		label: "Uncontrolled switch",
		defaultChecked: true,
	},
	parameters: {
		docs: {
			description: {
				story: "В неуправляемом режиме переключатель управляет своим состоянием самостоятельно. Начальное состояние задается через `defaultChecked`.",
			},
		},
	},
};
