import { Activity, useCallback, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Tabs, type ITab, type TabsProps } from "@dubium/ui";

type TDemoTabKey = "overview" | "details" | "settings";
type TNumericTabKey = 1 | 2 | 3;

const defaultTabs: ITab<TDemoTabKey>[] = [
	{
		key: "overview",
		label: "Обзор",
	},
	{
		key: "details",
		label: "Детали",
	},
	{
		key: "settings",
		label: "Настройки",
	},
];

const numericTabs: ITab<TNumericTabKey>[] = [
	{
		key: 1,
		label: "Шаг 1",
	},
	{
		key: 2,
		label: "Шаг 2",
	},
	{
		key: 3,
		label: "Шаг 3",
	},
];

const manyTabs: ITab<string>[] = [
	{
		key: "all",
		label: "Все",
	},
	{
		key: "active",
		label: "Активные",
	},
	{
		key: "drafts",
		label: "Черновики",
	},
	{
		key: "archived",
		label: "Архив",
	},
	{
		key: "deleted",
		label: "Удалённые",
	},
];

const getTabLabel = <T,>(tabs: ITab<T>[], activeKey: T) => {
	return (
		tabs.find((tab) => tab.key === activeKey)?.label ?? String(activeKey)
	);
};

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"`Tabs` отображает список вкладок и управляется извне через `isActive` и `onChange`. Компонент не хранит активную вкладку внутри себя.",
			},
		},
	},
	tags: ["autodocs"],

	argTypes: {
		tabs: {
			control: "object",
			description: "Массив вкладок.",
		},

		isActive: {
			control: { type: "select" },
			options: ["overview", "details", "settings"],
			description: "Ключ активной вкладки.",
		},

		onChange: {
			action: "changed",
			description: "Callback, вызываемый при выборе вкладки.",
		},
	},

	args: {
		tabs: defaultTabs,
		isActive: "overview",
		onChange: fn(),
	},
} satisfies Meta<TabsProps<TDemoTabKey>>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledTabsDemo = ({
	tabs,
	isActive,
	onChange,
}: TabsProps<TDemoTabKey>) => {
	const [activeTabKey, setActiveTabKey] = useState<TDemoTabKey>(isActive);

	const handleChange = useCallback(
		(tab: ITab<TDemoTabKey>) => {
			setActiveTabKey(tab.key);
			onChange(tab);
		},
		[onChange],
	);

	return (
		<div
			style={{
				display: "grid",
				gap: 16,
				minWidth: 360,
			}}
		>
			<Tabs tabs={tabs} isActive={activeTabKey} onChange={handleChange} />

			<div
				style={{
					padding: 16,
					border: "1px solid #e5e5e5",
					borderRadius: 8,
					background: "#fff",
				}}
			>
				Активная вкладка:{" "}
				<strong>{getTabLabel(tabs, activeTabKey)}</strong>
			</div>
		</div>
	);
};

export const Playground: Story = {
	parameters: {
		docs: {
			description: {
				story: "Базовый управляемый пример. Активная вкладка хранится во внешнем состоянии.",
			},
		},
	},

	render: (args) => {
		return <ControlledTabsDemo {...args} />;
	},
};

export const WithContent: Story = {
	parameters: {
		docs: {
			description: {
				story: "Пример с отображением разного контента в зависимости от активной вкладки.",
			},
		},
	},

	render: (args) => {
		const [activeTabKey, setActiveTabKey] = useState<TDemoTabKey>(
			args.isActive,
		);

		const handleChange = (tab: ITab<TDemoTabKey>) => {
			setActiveTabKey(tab.key);
			args.onChange(tab);
		};

		return (
			<div
				style={{
					display: "grid",
					gap: 16,
					width: 480,
				}}
			>
				<Tabs
					tabs={args.tabs}
					isActive={activeTabKey}
					onChange={handleChange}
				/>

				<div
					style={{
						padding: 20,
						border: "1px solid #e5e5e5",
						borderRadius: 12,
						background: "#fff",
						lineHeight: 1.5,
					}}
				>
					{activeTabKey === "overview" ? (
						<div>
							<strong>Обзор</strong>
							<p style={{ margin: "8px 0 0" }}>
								Общая информация по разделу.
							</p>
						</div>
					) : null}

					{activeTabKey === "details" ? (
						<div>
							<strong>Детали</strong>
							<p style={{ margin: "8px 0 0" }}>
								Подробное описание выбранного объекта.
							</p>
						</div>
					) : null}

					{activeTabKey === "settings" ? (
						<div>
							<strong>Настройки</strong>
							<p style={{ margin: "8px 0 0" }}>
								Параметры и дополнительные действия.
							</p>
						</div>
					) : null}
				</div>
			</div>
		);
	},
};

export const WithActivity: Story = {
	parameters: {
		docs: {
			description: {
				story: "Пример с `Activity`: панели вкладок остаются смонтированными, но переключаются между `visible` и `hidden`. Это полезно, когда нужно сохранить внутреннее состояние контента вкладки.",
			},
		},
	},

	render: (args) => {
		const [activeTabKey, setActiveTabKey] = useState<TDemoTabKey>(
			args.isActive,
		);

		const [overviewCounter, setOverviewCounter] = useState(0);
		const [detailsCounter, setDetailsCounter] = useState(0);
		const [settingsCounter, setSettingsCounter] = useState(0);

		const handleChange = (tab: ITab<TDemoTabKey>) => {
			setActiveTabKey(tab.key);
			args.onChange(tab);
		};

		const panelStyle = useMemo(() => {
			return {
				padding: 20,
				border: "1px solid #e5e5e5",
				borderRadius: 12,
				background: "#fff",
			};
		}, []);

		return (
			<div
				style={{
					display: "grid",
					gap: 16,
					width: 520,
				}}
			>
				<Tabs
					tabs={args.tabs}
					isActive={activeTabKey}
					onChange={handleChange}
				/>

				<div>
					<Activity
						mode={
							activeTabKey === "overview" ? "visible" : "hidden"
						}
					>
						<div style={panelStyle}>
							<strong>Обзор</strong>

							<p style={{ margin: "8px 0 12px", color: "#666" }}>
								Состояние этой панели сохраняется при
								переключении вкладок.
							</p>

							<button
								type="button"
								onClick={() => {
									setOverviewCounter((value) => value + 1);
								}}
							>
								Счётчик: {overviewCounter}
							</button>
						</div>
					</Activity>

					<Activity
						mode={activeTabKey === "details" ? "visible" : "hidden"}
					>
						<div style={panelStyle}>
							<strong>Детали</strong>

							<p style={{ margin: "8px 0 12px", color: "#666" }}>
								Эта панель не размонтируется при скрытии.
							</p>

							<button
								type="button"
								onClick={() => {
									setDetailsCounter((value) => value + 1);
								}}
							>
								Счётчик: {detailsCounter}
							</button>
						</div>
					</Activity>

					<Activity
						mode={
							activeTabKey === "settings" ? "visible" : "hidden"
						}
					>
						<div style={panelStyle}>
							<strong>Настройки</strong>

							<p style={{ margin: "8px 0 12px", color: "#666" }}>
								Переключи вкладки и вернись обратно: значение
								счётчика сохранится.
							</p>

							<button
								type="button"
								onClick={() => {
									setSettingsCounter((value) => value + 1);
								}}
							>
								Счётчик: {settingsCounter}
							</button>
						</div>
					</Activity>
				</div>
			</div>
		);
	},
};

export const NumericKeys: StoryObj<TabsProps<TNumericTabKey>> = {
	parameters: {
		docs: {
			description: {
				story: "Ключ вкладки может быть не только строкой. В этом примере используются числовые ключи.",
			},
		},
	},

	render: (args) => {
		const [activeTabKey, setActiveTabKey] = useState<TNumericTabKey>(
			args.isActive,
		);

		const handleChange = (tab: ITab<TNumericTabKey>) => {
			setActiveTabKey(tab.key);
			args.onChange(tab);
		};

		return (
			<div
				style={{
					display: "grid",
					gap: 16,
					minWidth: 360,
				}}
			>
				<Tabs
					tabs={args.tabs}
					isActive={activeTabKey}
					onChange={handleChange}
				/>

				<div
					style={{
						padding: 16,
						border: "1px solid #e5e5e5",
						borderRadius: 8,
						background: "#fff",
					}}
				>
					Активный шаг: <strong>{activeTabKey}</strong>
				</div>
			</div>
		);
	},

	args: {
		tabs: numericTabs,
		isActive: 1,
		onChange: fn(),
	},
};

export const ManyTabs: StoryObj<TabsProps<string>> = {
	parameters: {
		docs: {
			description: {
				story: "Пример с большим количеством вкладок. Поведение переполнения зависит от CSS компонента.",
			},
		},
	},

	render: (args) => {
		const [activeTabKey, setActiveTabKey] = useState<string>(args.isActive);

		const handleChange = (tab: ITab<string>) => {
			setActiveTabKey(tab.key);
			args.onChange(tab);
		};

		return (
			<div
				style={{
					display: "grid",
					gap: 16,
					width: 640,
				}}
			>
				<Tabs
					tabs={args.tabs}
					isActive={activeTabKey}
					onChange={handleChange}
				/>

				<div
					style={{
						padding: 16,
						border: "1px solid #e5e5e5",
						borderRadius: 8,
						background: "#fff",
					}}
				>
					Активная вкладка:{" "}
					<strong>{getTabLabel(args.tabs, activeTabKey)}</strong>
				</div>
			</div>
		);
	},

	args: {
		tabs: manyTabs,
		isActive: "all",
		onChange: fn(),
	},
};
