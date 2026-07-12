import type { ComponentPropsWithoutRef } from "react"

import clsx from "clsx"

import style from "./Strong.module.scss"

/** Свойства компонента Strong. */
export type IStrongProps = ComponentPropsWithoutRef<"strong">

/**
 * Компонент для отображения жирного текста (семантический `<strong>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<strong>` с применением стилей из CSS-модуля.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<strong>`.
 * @returns React-элемент `<strong>`.
 *
 * @example
 * ```tsx
 * <Strong>Важный жирный текст</Strong>
 * ```
 */
export const Strong = ({ children, className, ...props }: IStrongProps) => (
	<strong className={clsx(style.strong, className)} {...props}>
		{children}
	</strong>
)

Strong.displayName = "Typography.Strong"
