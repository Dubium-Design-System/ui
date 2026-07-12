import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import clsx from "clsx"

import style from "./Paragraph.module.scss"

/**
 * Стили для компонента Paragraph, расширяющие стандартные CSSProperties.
 *
 * @remarks
 * Добавляет пользовательское CSS-свойство `--row-gap` для управления межстрочным интервалом.
 */
type TParagraphStyle = {
	"--row-gap"?: string
} & CSSProperties

/**
 * Свойства компонента Paragraph.
 *
 * @remarks
 * Наследует все свойства HTML-элемента `div`.
 */
export interface IParagraphProps extends ComponentPropsWithoutRef<"div"> {
	/**
	 * Межстрочный интервал в пикселях.
	 *
	 * @remarks
	 * Устанавливает CSS-переменную `--row-gap` для кастомизации вертикальных отступов.
	 */
	rowGap?: number
}

/**
 * Преобразует числовое значение межстрочного интервала в строку с единицей измерения `px`.
 *
 * @param rowGap - Значение интервала в пикселях.
 * @returns Строку вида `"{rowGap}px"` или `undefined`, если `rowGap` не является числом.
 */
/**
 * Преобразует числовое значение межстрочного интервала в строку с единицей измерения `px`.
 *
 * @param rowGap - Значение интервала в пикселях.
 * @returns Строку вида `"{rowGap}px"` или `undefined`, если `rowGap` не является числом.
 */
const getRowGapValue = (rowGap: TParagraphStyle["rowGap"]) => {
	if (typeof rowGap !== "number") {
		return undefined
	}

	return `${rowGap}px`
}

/**
 * Компонент параграфа (абзаца) с поддержкой кастомизации межстрочного интервала.
 *
 * @remarks
 * Рендерит `div` с CSS-классом `paragraph` из модульных стилей.
 * Позволяет управлять вертикальными отступами между строками через свойство `rowGap`,
 * которое преобразуется в CSS-переменную `--row-gap`.
 *
 * @param props - Свойства компонента.
 * @returns React-элемент параграфа.
 *
 * @example
 * ```tsx
 * <Paragraph rowGap={8}>
 *   Текст параграфа с увеличенным межстрочным интервалом.
 * </Paragraph>
 * ```
 */
export const Paragraph = ({ rowGap, children, className, style: styleProps, ...props }: IParagraphProps) => {
	const paragraphStyle: TParagraphStyle = {
		...styleProps,
		"--row-gap": getRowGapValue(rowGap),
	}

	return (
		<div className={clsx(style.paragraph, className)} style={paragraphStyle} {...props}>
			{children}
		</div>
	)
}

Paragraph.displayName = "Typography.Paragraph"
