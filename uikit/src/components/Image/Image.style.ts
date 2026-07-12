import type { CSSProperties } from "react"

/**
 * Тип, представляющий CSS-переменные для компонента Image.
 *
 * @remarks
 * Расширяет стандартный тип CSSProperties, добавляя кастомные CSS-переменные
 * для управления отображением изображения. Эти переменные используются
 * для передачи значений из JavaScript в CSS.
 *
 * @property --dui-image-width - Ширина изображения. Может быть числом (пиксели), строкой ("100%", "auto") или undefined.
 * @property --dui-image-height - Высота изображения. Может быть числом (пиксели), строкой ("100%", "auto") или undefined.
 * @property --dui-image-aspect-ratio - Соотношение сторон в формате "width/height" (например, "16/9") или undefined.
 * @property --dui-image-object-fit - Определяет, как изображение вписывается в контейнер (аналогично CSS свойству object-fit).
 * @property --dui-image-object-position - Позиционирование изображения внутри контейнера (аналогично CSS свойству object-position).
 * @property --dui-image-opacity - Прозрачность изображения (от 0 до 1).
 */
type TImageCSSVariables = {
	"--dui-image-aspect-ratio"?: string
	"--dui-image-height"?: CSSProperties["height"]
	"--dui-image-object-fit"?: CSSProperties["objectFit"]
	"--dui-image-object-position"?: CSSProperties["objectPosition"]
	"--dui-image-opacity"?: CSSProperties["opacity"]
	"--dui-image-width"?: CSSProperties["width"]
} & CSSProperties

/**
 * Параметры для генерации стилей контейнера изображения.
 *
 * @remarks
 * Используется функцией {@link getContainerStyle} для создания CSS-стилей
 * контейнера, который оборачивает изображение.
 *
 * @property width - Ширина контейнера. Может быть числом (пиксели), строкой ("100%", "auto") или undefined.
 * @property height - Высота контейнера. Может быть числом (пиксели), строкой ("100%", "auto") или undefined.
 * @property aspectRatio - Соотношение сторон в формате "width/height" (например, "16/9") или "auto".
 * @property objectFit - Определяет, как изображение вписывается в контейнер (аналогично CSS свойству object-fit).
 * @property objectPosition - Позиционирование изображения внутри контейнера (аналогично CSS свойству object-position).
 * @property customStyle - Дополнительные пользовательские стили, которые будут объединены с базовыми.
 */
interface IGetContainerStyleParams {
	aspectRatio: string
	customStyle?: CSSProperties
	height: CSSProperties["height"]
	objectFit: CSSProperties["objectFit"]
	objectPosition: CSSProperties["objectPosition"]
	width: CSSProperties["width"]
}

/**
 * Параметры для генерации стилей самого изображения.
 *
 * @remarks
 * Используется функцией {@link getImageStyle} для создания CSS-стилей
 * элемента <img> внутри контейнера. Основное назначение - управление
 * прозрачностью изображения с возможностью добавления дополнительных стилей.
 *
 * @property opacity - Прозрачность изображения (от 0 до 1).
 * @property customStyle - Дополнительные пользовательские стили, которые будут объединены с базовыми.
 *   Примечание: если в customStyle передается opacity, оно будет проигнорировано,
 *   так как opacity управляется отдельным параметром.
 */
interface IGetImageStyleParams {
	customStyle?: CSSProperties
	opacity: CSSProperties["opacity"]
}

/**
 * Нормализует числовые значения размеров в строки с пикселями.
 *
 * @remarks
 * Если значение является числом, преобразует его в строку с суффиксом "px".
 * Если значение уже является строкой или undefined, возвращает его без изменений.
 *
 * @param value - Значение ширины или высоты (число, строка или undefined).
 * @returns Нормализованное значение, готовое для использования в CSS.
 *
 * @example
 * ```ts
 * normalizeSize(100); // "100px"
 * normalizeSize("50%"); // "50%"
 * normalizeSize(undefined); // undefined
 * ```
 */
const normalizeSize = (
	value: CSSProperties["height"] | CSSProperties["width"],
): CSSProperties["height"] | CSSProperties["width"] => {
	if (typeof value === "number") {
		return `${value}px`
	}

	return value
}

/**
 * Генерирует CSS-стили для контейнера изображения.
 *
 * @remarks
 * Создает объект стилей, который обеспечивает корректное отображение контейнера
 * с заданными размерами, соотношением сторон, параметрами object-fit/object-position
 * и дополнительными пользовательскими стилями.
 * Контейнер позиционируется относительно, имеет скрытое переполнение и максимальные размеры 100%.
 *
 * @param params - Параметры стилей контейнера.
 * @returns Объект CSS-стилей для применения к контейнеру изображения.
 *
 * @example
 * ```ts
 * const containerStyles = getContainerStyle({
 *   width: 300,
 *   height: 200,
 *   aspectRatio: "16/9",
 *   objectFit: "cover",
 *   objectPosition: "center",
 *   customStyle: { borderRadius: "8px" }
 * });
 * ```
 */
export const getContainerStyle = ({
	width,
	height,
	aspectRatio,
	objectFit,
	objectPosition,
	customStyle,
}: IGetContainerStyleParams): TImageCSSVariables => {
	return {
		"--dui-image-width": normalizeSize(width),
		"--dui-image-height": normalizeSize(height),
		"--dui-image-aspect-ratio": aspectRatio !== "auto" ? aspectRatio : undefined,
		"--dui-image-object-fit": objectFit,
		"--dui-image-object-position": objectPosition,
		...customStyle,
	}
}

/**
 * Генерирует CSS-стили для самого изображения.
 *
 * @remarks
 * Создает объект стилей, который управляет прозрачностью изображения
 * и позволяет добавить дополнительные CSS-свойства. Основная задача -
 * установить CSS-переменную --dui-image-opacity и объединить с пользовательскими стилями.
 * Примечание: если в customStyle передается opacity, оно будет исключено,
 * чтобы избежать конфликта с основным параметром opacity.
 *
 * @param params - Параметры стилей изображения.
 * @returns Объект CSS-стилей для применения к элементу <img>.
 *
 * @example
 * ```ts
 * const imageStyles = getImageStyle({
 *   opacity: 0.8,
 *   customStyle: { filter: "brightness(0.9)", transition: "opacity 0.3s" }
 * });
 * ```
 */
export const getImageStyle = ({ opacity, customStyle }: IGetImageStyleParams): TImageCSSVariables => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { opacity: _customOpacity, ...customStyleWithoutOpacity } = customStyle ?? {}

	return {
		...customStyleWithoutOpacity,
		"--dui-image-opacity": opacity,
	}
}
