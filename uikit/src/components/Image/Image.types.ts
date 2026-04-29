import type { CSSProperties, ImgHTMLAttributes, ReactNode } from "react";

/**
 * Кандидат для адаптивного набора изображений (`srcSet`).
 *
 * @remarks
 * Может быть представлен в двух форматах:
 * 1. Строка - готовая запись в формате `"url width, url 2x"` (как в стандартном HTML)
 * 2. Объект - структурированное описание с параметрами `src`, `width` и/или `density`
 *
 * @example
 * ```ts
 * // Строковый формат
 * "image-320w.jpg 320w, image-640w.jpg 640w"
 *
 * // Объектный формат
 * { src: "image-320w.jpg", width: 320 }
 * { src: "image-2x.jpg", density: 2 }
 * ```
 */
export type TImageSrcSetCandidate =
	| string
	| {
			/** URL изображения */
			src: string;
			/** Ширина изображения в пикселях (для дескриптора `w`) */
			width?: number;
			/** Плотность пикселей (для дескриптора `x`) */
			density?: number;
	  };

/**
 * Адаптивный набор изображений (`srcSet`).
 *
 * @remarks
 * Может быть представлен как строка в стандартном HTML-формате, либо как массив
 * структурированных кандидатов {@link TImageSrcSetCandidate}.
 *
 * Используется компонентом {@link Image} для поддержки адаптивных изображений
 * на разных разрешениях экрана и плотностях пикселей.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset | MDN: srcset}
 */
export type TImageSrcSet = string | TImageSrcSetCandidate[];

/**
 * Источник для элемента `<source>` внутри `<picture>`.
 *
 * @remarks
 * Определяет альтернативные версии изображения для разных условий (тип файла,
 * медиа-запросы). Используется для поддержки современных форматов изображений
 * (WebP, AVIF) и адаптивного дизайна.
 *
 * @property srcSet - Набор изображений для этого источника (аналогично `srcSet` у `<img>`)
 * @property type - MIME-тип изображения (например, `"image/webp"`, `"image/avif"`)
 * @property media - Медиа-запрос, определяющий когда этот источник должен использоваться
 * @property sizes - Размеры изображения для разных условий (аналогично `sizes` у `<img>`)
 * @property width - Ширина изображения в пикселях (метаданные)
 * @property height - Высота изображения в пикселях (метаданные)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture | MDN: <picture>}
 */
export interface IImageSource {
	srcSet: TImageSrcSet;
	type?: `image/${string}`;
	media?: string;
	sizes?: string;
	width?: number;
	height?: number;
}

/**
 * Свойства компонента {@link Image}.
 *
 * @remarks
 * Расширяет стандартные атрибуты HTML-элемента `<img>`, добавляя возможности
 * для адаптивных изображений, контроля соотношения сторон, плейсхолдеров и кэширования.
 *
 * @example
 * ```tsx
 * const props: ImageProps = {
 *   src: "/image.jpg",
 *   alt: "Описание",
 *   width: 300,
 *   height: 200,
 *   aspectRatio: "16/9",
 *   placeholder: "blur",
 *   blurDataURL: "/blur.jpg",
 * };
 * ```
 */
export interface IImageProps extends Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	| "src"
	| "alt"
	| "width"
	| "height"
	| "style"
	| "className"
	| "srcSet"
	| "sizes"
> {
	/** URL основного изображения (обязательный) */
	src: string;
	/** Альтернативный текст (обязательный, для доступности) */
	alt: string;

	/** Адаптивный набор изображений (`srcSet`) */
	srcSet?: TImageSrcSet;
	/** Размеры изображения для разных условий (`sizes`) */
	sizes?: string;
	/** Альтернативные источники для элемента `<picture>` */
	sources?: IImageSource[];

	/** Соотношение сторон контейнера (например, `"16/9"`, `"4/3"`, `"auto"`) */
	aspectRatio?: "auto" | `${number}/${number}`;
	/** Определяет как изображение вписывается в контейнер (аналогично CSS `object-fit`) */
	objectFit?: CSSProperties["objectFit"];
	/** Позиционирование изображения внутри контейнера (аналогично CSS `object-position`) */
	objectPosition?: CSSProperties["objectPosition"];

	/** Ширина контейнера (число, строка или CSS-значение) */
	width?: CSSProperties["width"];
	/** Высота контейнера (число, строка или CSS-значение) */
	height?: CSSProperties["height"];

	/** CSS-класс для контейнера изображения */
	className?: string;
	/** Дополнительные стили для контейнера изображения */
	style?: CSSProperties;

	/** CSS-класс для элемента `<img>` */
	imgClassName?: string;
	/** Дополнительные стили для элемента `<img>` */
	imgStyle?: CSSProperties;

	/** Компонент для отображения при ошибке загрузки изображения */
	errorComponent?: ReactNode;
	/** Компонент-плейсхолдер, отображаемый во время загрузки */
	loader?: ReactNode;

	/** Тип плейсхолдера: `"blur"` - размытое изображение, `"empty"` - пустое место */
	placeholder?: "blur" | "empty";
	/** URL изображения для blur-плейсхолдера (используется при `placeholder="blur"`) */
	blurDataURL?: string;
}
