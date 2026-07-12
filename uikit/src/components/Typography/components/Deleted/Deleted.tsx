import type { ComponentPropsWithoutRef } from "react"

import clsx from "clsx"

import style from "./Deleted.module.scss"

/** Свойства компонента Deleted. */
export type IDeletedProps = ComponentPropsWithoutRef<"del">

/**
 * Компонент для отображения зачёркнутого текста (семантический `<del>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<del>` с применением стилей из CSS-модуля.
 * Используется для обозначения удалённого или устаревшего текста.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<del>`.
 * @returns React-элемент `<del>`.
 *
 * @example
 * ```tsx
 * <Deleted>Этот текст будет зачёркнут</Deleted>
 * ```
 */
export const Deleted = ({ children, className, ...props }: IDeletedProps) => (
	<del className={clsx(style.deleted, className)} {...props}>
		{children}
	</del>
)

Deleted.displayName = "Typography.Deleted"
