import type { CSSProperties } from "react";

/**
 * Вычисляет и возвращает стиль контейнера изображения с учётом ширины, высоты, соотношения сторон и пользовательских стилей.
 *
 * - При заданном `aspectRatio` функция может автоматически вычислять одну из сторон, если она равна `"auto"`.
 * - Все числовые значения ширины/высоты конвертируются в строки с единицами `px`.
 * - По умолчанию добавляются ограничения `maxWidth: 100%` и `maxHeight: 100%`.
 *
 * @param {string | number} width - Ширина контейнера. Можно указать строку (например, `"100%"`) или число (в пикселях).
 * @param {string | number} height - Высота контейнера. Можно указать строку или число.
 * @param {string} aspectRatio - Соотношение сторон в формате `"16/9"`, `"4/3"` и т.п. Если `"auto"`, ничего не вычисляется.
 * @param {CSSProperties} [customStyle] - Дополнительные пользовательские стили, которые будут объединены с результатом.
 *
 * @returns {CSSProperties} Финальный стиль для контейнера.
 */
export const getContainerStyle = (
	width: string | number,
	height: string | number,
	aspectRatio: string,
	customStyle?: CSSProperties,
): CSSProperties => {
	let finalWidth = typeof width === "number" ? `${width}px` : width;
	let finalHeight = typeof height === "number" ? `${height}px` : height;

	if (aspectRatio !== "auto") {
		const [widthRatio, heightRatio] = aspectRatio.split("/").map(Number);

		if (
			!isNaN(widthRatio) &&
			!isNaN(heightRatio) &&
			widthRatio > 0 &&
			heightRatio > 0
		) {
			if (finalWidth !== "auto" && finalHeight === "auto") {
				// Если задана только ширина, рассчитываем высоту
				finalHeight = `calc(${finalWidth} * ${heightRatio} / ${widthRatio})`;
			} else if (finalHeight !== "auto" && finalWidth === "auto") {
				// Если задана только высота, рассчитываем ширину
				finalWidth = `calc(${finalHeight} * ${widthRatio} / ${heightRatio})`;
			}
		}
	}

	return {
		...customStyle,
		width: finalWidth,
		height: finalHeight,
		aspectRatio: aspectRatio !== "auto" ? aspectRatio : undefined,
		maxWidth: "100%",
		maxHeight: "100%",
	};
};

/**
 * Возвращает стили для изображения с учетом `aspectRatio`, `objectFit` и `objectPosition`.
 *
 * @param {string | number} widthRatio - Ширина соотношения сторон или `"auto"`.
 * @param {string | number} heightRatio - Высота соотношения сторон или `"auto"`.
 * @param {CSSProperties["objectFit"]} objectFit - Значение CSS-свойства `object-fit`.
 * @param {CSSProperties["objectPosition"]} objectPosition - Значение CSS-свойства `object-position`.
 *
 * @returns {CSSProperties} Стили для применения к элементу `<img>` или его обёртке.
 */
export const getImageStyle = (
	widthRatio: string | number,
	heightRatio: string | number,
	objectFit: CSSProperties["objectFit"],
	objectPosition: CSSProperties["objectPosition"],
): CSSProperties => {
	return {
		aspectRatio:
			widthRatio !== "auto"
				? `${widthRatio} / ${heightRatio}`
				: undefined,
		objectFit,
		objectPosition,
	};
};
