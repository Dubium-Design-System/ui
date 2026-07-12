import { memo, useCallback } from "react"

import style from "./Tabs.module.scss"

/**
 * Интерфейс описывает отдельную вкладку.
 */
export interface ITab<T> {
	/**
	 * Уникальный ключ вкладки.
	 */
	key: T

	/**
	 * Текстовая метка вкладки, отображаемая пользователю.
	 */
	label: string
}

/**
 * Пропсы компонента Tabs — списка вкладок с активной вкладкой и обработчиком изменения.
 */
export interface TabsProps<T> {
	/**
	 * Ключ активной вкладки.
	 */
	isActive: T

	/**
	 * Колбэк, вызываемый при смене активной вкладки.
	 * @param tab — объект вкладки, выбранной пользователем.
	 */
	onChange(tab: ITab<T>): void

	/**
	 * Массив вкладок.
	 */
	tabs: ITab<T>[]
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
	/**
	 * Обработчик клика по вкладке.
	 *
	 * @remarks
	 * Вызывает переданный колбэк `onChange` с объектом выбранной вкладки.
	 * Мемоизирован для предотвращения лишних пересозданий функций при рендере.
	 *
	 * @param tab - Объект вкладки, на которую кликнул пользователь.
	 */
	const handleClick = useCallback(
		(tab: ITab<T>) => {
			onChange(tab)
		},
		[onChange],
	)

	return (
		<div className={style.tabs}>
			{tabs?.map((tab) => {
				return (
					<button
						className={`${style.tab} ${isActive === tab.key ? style.tab_active : null}`}
						key={String(tab.key)}
						onClick={() => {
							handleClick(tab)
						}}
						type="button"
					>
						{tab.label}
					</button>
				)
			})}
		</div>
	)
}

export const Tabs = memo(TabsComponent)
Tabs.displayName = "Tabs"
