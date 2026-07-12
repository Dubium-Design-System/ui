import type { ComponentPropsWithoutRef } from "react"

import clsx from "clsx"

import style from "./Heading.module.scss"

/**
 * Допустимые уровни заголовков.
 *
 * @remarks
 * Поддерживаются уровни от 1 (самый крупный) до 4 (самый мелкий).
 */
type HeadingLevel = 1 | 2 | 3 | 4

type HeadingAs = "div" | "h1" | "h2" | "h3" | "h4"

/**
 * Свойства компонента Heading.
 *
 * @remarks
 * Наследует все свойства HTML-элемента заголовка.
 */
export interface IHeadingProps extends ComponentPropsWithoutRef<"h1"> {
	/**
	 * HTML-тег, который будет отрендерен.
	 *
	 * Если не указан, используется тег, соответствующий `level`.
	 *
	 * @example
	 * ```tsx
	 * <Heading level={2} as="div">
	 *  Заголовок
	 * </Heading>
	 * ```
	 */
	as?: HeadingAs

	/**
	 * Уровень заголовка.
	 *
	 * @default 1
	 */
	level?: HeadingLevel
}

/**
 * Соответствие уровня заголовка HTML-тегу.
 */
/**
 * Соответствие уровня заголовка HTML-тегу.
 *
 * @remarks
 * Используется для динамического выбора тега заголовка (`h1`–`h4`)
 * на основе переданного уровня.
 */
const headingTagByLevel: Record<HeadingLevel, Exclude<HeadingAs, "div">> = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
}

/**
 * Компонент заголовка с поддержкой различных уровней.
 *
 * @remarks
 * Рендерит заголовок (`h1`–`h4`) с соответствующими стилями из CSS-модуля.
 * Автоматически применяет CSS-классы в зависимости от уровня.
 *
 * @param props - Свойства компонента.
 * @returns React-элемент заголовка.
 *
 * @example
 * ```tsx
 * <Heading level={2}>Заголовок второго уровня</Heading>
 * ```
 */
export const Heading = ({ level = 1, as, children, className, ...props }: IHeadingProps) => {
	const Tag = as ?? headingTagByLevel[level]

	return (
		<Tag
			className={clsx(
				style.heading,
				{
					[style.heading_level_1]: level === 1,
					[style.heading_level_2]: level === 2,
					[style.heading_level_3]: level === 3,
					[style.heading_level_4]: level === 4,
				},
				className,
			)}
			{...props}
		>
			{children}
		</Tag>
	)
}

Heading.displayName = "Typography.Heading"
