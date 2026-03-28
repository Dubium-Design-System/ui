import { memo, useCallback } from "react";
import style from "./Tabs.module.scss";

/**
 * Интерфейс описывает отдельную вкладку.
 */
export interface ITab<T> {
	/**
	 * Уникальный ключ вкладки.
	 */
	key: T;

	/**
	 * Текстовая метка вкладки, отображаемая пользователю.
	 */
	label: string;
}

/**
 * Пропсы компонента Tabs — списка вкладок с активной вкладкой и обработчиком изменения.
 */
export interface TabsProps<T> {
	/**
	 * Массив вкладок.
	 */
	tabs: ITab<T>[];

	/**
	 * Ключ активной вкладки.
	 */
	isActive: T;

	/**
	 * Колбэк, вызываемый при смене активной вкладки.
	 * @param tab — объект вкладки, выбранной пользователем.
	 */
	onChange(tab: ITab<T>): void;
}

/**
 * Компонент Tabs отображает горизонтальный список вкладок.
 *
 * @param tabs — Массив вкладок с ключами и метками.
 * @param isActive — Ключ текущей активной вкладки.
 * @param onChange — Функция для обработки смены активной вкладки.
 *
 * @returns JSX-элемент с интерактивными вкладками.
 *
 *
 * @example
 * ```tsx
 * const tabs = [
 *   { key: "home", label: "Главная" },
 *   { key: "profile", label: "Профиль" },
 *   { key: "settings", label: "Настройки" },
 * ];
 *
 * const [active, setActive] = useState("home");
 *
 * <Tabs tabs={tabs} isActive={active} onChange={setActive} />
 * ```
 */
const TabsComponent = <T,>({ tabs, isActive, onChange }: TabsProps<T>) => {
	const handleClick = useCallback(
		(tab: ITab<T>) => {
			onChange(tab);
		},
		[onChange],
	);

	return (
		<div className={style.tabs}>
			{tabs?.map((tab) => {
				return (
					<button
						key={String(tab.key)}
						type="button"
						onClick={() => {
							handleClick(tab);
						}}
						className={`${style.tab} ${isActive === tab.key ? style.tab_active : null}`}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
};

export const Tabs = memo(TabsComponent);
Tabs.displayName = "Tabs";
