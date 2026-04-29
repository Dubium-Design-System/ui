import type { CSSProperties } from "react";

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
 * @property customStyle - Дополнительные пользовательские стили, которые будут объединены с базовыми.
 */
interface GetContainerStyleParams {
	width: CSSProperties["width"];
	height: CSSProperties["height"];
	aspectRatio: string;
	customStyle?: CSSProperties;
}

/**
 * Параметры для генерации стилей самого изображения.
 *
 * @remarks
 * Используется функцией {@link getImageStyle} для создания CSS-стилей
 * элемента <img> внутри контейнера.
 *
 * @property aspectRatio - Соотношение сторон в формате "width/height" (например, "16/9") или "auto".
 * @property objectFit - Определяет, как изображение вписывается в контейнер (аналогично CSS свойству object-fit).
 * @property objectPosition - Позиционирование изображения внутри контейнера (аналогично CSS свойству object-position).
 * @property customStyle - Дополнительные пользовательские стили, которые будут объединены с базовыми.
 */
interface GetImageStyleParams {
	aspectRatio: string;
	objectFit: CSSProperties["objectFit"];
	objectPosition: CSSProperties["objectPosition"];
	customStyle?: CSSProperties;
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
	value: CSSProperties["width"] | CSSProperties["height"],
): CSSProperties["width"] | CSSProperties["height"] => {
	if (typeof value === "number") {
		return `${value}px`;
	}

	return value;
};

/**
 * Генерирует CSS-стили для контейнера изображения.
 *
 * @remarks
 * Создает объект стилей, который обеспечивает корректное отображение контейнера
 * с заданными размерами, соотношением сторон и дополнительными пользовательскими стилями.
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
 *   customStyle: { borderRadius: "8px" }
 * });
 * ```
 */
export const getContainerStyle = ({
	width,
	height,
	aspectRatio,
	customStyle,
}: GetContainerStyleParams): CSSProperties => {
	return {
		position: "relative",
		display: "block",
		overflow: "hidden",
		width: normalizeSize(width),
		height: normalizeSize(height),
		aspectRatio: aspectRatio !== "auto" ? aspectRatio : undefined,
		maxWidth: "100%",
		maxHeight: "100%",
		...customStyle,
	};
};

/**
 * Генерирует CSS-стили для самого изображения.
 *
 * @remarks
 * Создает объект стилей, который обеспечивает корректное отображение изображения
 * внутри контейнера с заданными параметрами object-fit, object-position и соотношением сторон.
 * Изображение занимает 100% ширины и высоты контейнера, имеет плавный переход прозрачности.
 *
 * @param params - Параметры стилей изображения.
 * @returns Объект CSS-стилей для применения к элементу <img>.
 *
 * @example
 * ```ts
 * const imageStyles = getImageStyle({
 *   aspectRatio: "16/9",
 *   objectFit: "cover",
 *   objectPosition: "center",
 *   customStyle: { filter: "brightness(0.9)" }
 * });
 * ```
 */
export const getImageStyle = ({
	aspectRatio,
	objectFit,
	objectPosition,
	customStyle,
}: GetImageStyleParams): CSSProperties => {
	return {
		display: "block",
		width: "100%",
		height: "100%",
		aspectRatio: aspectRatio !== "auto" ? aspectRatio : undefined,
		objectFit,
		objectPosition,
		transition: "opacity 150ms ease",
		...customStyle,
	};
};
