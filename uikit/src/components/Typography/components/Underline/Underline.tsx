import type { ComponentPropsWithoutRef } from "react"

import clsx from "clsx"

import style from "./Underline.module.scss"

/** Свойства компонента Underline. */
export type IUnderlineProps = ComponentPropsWithoutRef<"u">

/**
 * Компонент для отображения подчёркнутого текста (семантический `<u>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<u>` с применением стилей из CSS-модуля.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<u>`.
 * @returns React-элемент `<u>`.
 *
 * @example
 * ```tsx
 * <Underline>Подчёркнутый текст</Underline>
 * ```
 */
export const Underline = ({ children, className, ...props }: IUnderlineProps) => (
	<u className={clsx(style.underline, className)} {...props}>
		{children}
	</u>
)

Underline.displayName = "Typography.Underline"
