import { memo, useCallback, useEffect, useRef, useState } from "react";
import "./Tabs.scss";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Интерфейс описывает отдельную вкладку.
 */
export interface ITab {
	/**
	 * Уникальный ключ вкладки.
	 */
	key: string;

	/**
	 * Текстовая метка вкладки, отображаемая пользователю.
	 */
	label: string;
}

/**
 * Пропсы компонента Tabs — списка вкладок с активной вкладкой и обработчиком изменения.
 */
interface TabsProps {
	/**
	 * Массив вкладок.
	 */
	tabs: ITab[];

	/**
	 * Ключ активной вкладки.
	 */
	isActive: string;

	/**
	 * Колбэк, вызываемый при смене активной вкладки.
	 * @param tab — объект вкладки, выбранной пользователем.
	 */
	onChange(tab: ITab): void;
}

/**
 * Компонент Tabs отображает горизонтальный список вкладок с анимированной индикаторной полосой.
 *
 * @param tabs — Массив вкладок с ключами и метками.
 * @param isActive — Ключ текущей активной вкладки.
 * @param onChange — Функция для обработки смены активной вкладки.
 *
 * @returns JSX-элемент с интерактивными вкладками и анимацией индикатора.
 *
 * @remarks
 * - При смене активной вкладки происходит плавная анимация индикатора.
 * - Вкладка автоматически прокручивается в видимую область контейнера.
 * - При изменении размера окна и прокрутке индикатор обновляет позицию.
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
export const Tabs = memo(({ tabs, isActive, onChange }: TabsProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const activeTabRef = useRef<HTMLButtonElement>(null);
	const [activeTabPosition, setActiveTabPosition] = useState({
		left: 0,
		width: 0,
	});
	const [isInitialized, setIsInitialized] = useState(false);

	const updateActiveTabPosition = useCallback(() => {
		if (activeTabRef.current && containerRef.current) {
			const { offsetLeft, offsetWidth } = activeTabRef.current;
			setActiveTabPosition({
				left: offsetLeft,
				width: offsetWidth,
			});
			setIsInitialized(true);
		}
	}, []);

	const scrollToActiveTab = useCallback(() => {
		if (containerRef.current && activeTabRef.current) {
			const container = containerRef.current;
			const tab = activeTabRef.current;

			const containerRect = container.getBoundingClientRect();
			const tabRect = tab.getBoundingClientRect();

			const isTabLeftHidden = tabRect.left < containerRect.left;
			const isTabRightHidden = tabRect.right > containerRect.right;

			if (isTabLeftHidden) {
				container.scrollBy({
					left: tabRect.left - containerRect.left - 10,
					behavior: "smooth",
				});
			} else if (isTabRightHidden) {
				container.scrollBy({
					left: tabRect.right - containerRect.right + 10,
					behavior: "smooth",
				});
			}
		}
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			updateActiveTabPosition();
			container.addEventListener("scroll", updateActiveTabPosition);
			window.addEventListener("resize", updateActiveTabPosition);
		}
		return () => {
			if (container) {
				container.removeEventListener(
					"scroll",
					updateActiveTabPosition
				);
				window.removeEventListener("resize", updateActiveTabPosition);
			}
		};
	}, [updateActiveTabPosition, tabs]);

	useEffect(() => {
		const hasActiveTab = tabs.some((tab) => tab.key === isActive);

		if (!hasActiveTab) {
			setIsInitialized(false);
			return;
		}
		scrollToActiveTab();
		updateActiveTabPosition();
	}, [isActive, scrollToActiveTab, tabs, updateActiveTabPosition]);

	const handleClick = useCallback(
		(tab: ITab) => {
			onChange(tab);

			setTimeout(() => {
				scrollToActiveTab();
			}, 0);
		},
		[onChange, scrollToActiveTab]
	);

	return (
		<div ref={containerRef} className="tabs">
			{tabs?.map((tab) => {
				return (
					<button
						key={tab.key}
						ref={tab.key === isActive ? activeTabRef : null}
						className={classNames("tab", {
							tab_active: tab.key === isActive,
						})}
						onClick={() => handleClick(tab)}
					>
						{tab.label}
					</button>
				);
			})}

			<AnimatePresence>
				{isInitialized ? (
					<motion.div
						className={classNames("indicator", "animatedTransform")}
						initial={{
							x: activeTabPosition.left,
							width: activeTabPosition.width,
						}}
						animate={{
							x: activeTabPosition.left,
							width: activeTabPosition.width,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
					/>
				) : null}
			</AnimatePresence>
		</div>
	);
});

Tabs.displayName = "Tabs";
