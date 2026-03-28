import {
	type CSSProperties,
	type DetailedHTMLProps,
	type ImgHTMLAttributes,
	memo,
	type ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { getContainerStyle, getImageStyle } from "./Image.style";
import { loadImage } from "./Image.utils";

export interface ImageProps {
	/**
	 * Соотношение сторон изображения. Может быть строкой в формате "width/height" (например, "16/9")
	 * или "auto" для автоматического определения.
	 * @default "1/1"
	 */
	aspectRatio?: string;

	/**
	 * Определяет, как изображение должно быть вписано в контейнер.
	 * Используется стандартное CSS-свойство `object-fit`.
	 * - "cover": Изображение заполняет контейнер, сохраняя соотношение сторон (может обрезаться).
	 * - "contain": Изображение вписывается в контейнер целиком, сохраняя соотношение сторон.
	 * - "fill": Изображение растягивается на весь контейнер, игнорируя соотношение сторон.
	 * - "none": Изображение отображается в исходном размере.
	 * - "scale-down": Изображение масштабируется до минимального размера, чтобы вписаться в контейнер.
	 * @default "fill"
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
	 */
	objectFit?: CSSProperties["objectFit"];

	/**
	 * Определяет позицию изображения внутри контейнера.
	 * Используется стандартное CSS-свойство `object-position`.
	 * - Формат: "x y", где x и y могут быть значениями вроде "left", "center", "right", "top", "bottom" или процентами.
	 * @default "center center"
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
	 */
	objectPosition?: CSSProperties["objectPosition"];

	/**
	 * Ширина изображения. Может быть строкой (например, "100%"), числом (в пикселях) или "auto".
	 * @default "100%"
	 */
	width?: string;

	/**
	 * Высота изображения. Может быть строкой (например, "100%") или числом (в пикселях).
	 * @default "100%"
	 */
	height?: string;

	/**
	 * Основной URL изображения (формат png/jpg). Обязательное поле.
	 */
	src: string;

	/**
	 * Опциональный URL изображения в формате webp. Если браузер поддерживает webp, будет использован этот URL.
	 */
	webpSrc?: string;

	/**
	 * Альтернативный текст для изображения. Используется для доступности и SEO.
	 * @default "image"
	 */
	alt: string;

	/**
	 * Атрибут srcSet для указания нескольких источников изображения с разным разрешением.
	 */
	srcSet?: string;

	/**
	 * Атрибут sizes для указания размеров изображения в разных условиях (например, медиа-запросы).
	 */
	sizes?: string;

	/**
	 * Дополнительные CSS-классы для контейнера изображения.
	 */
	className?: string;

	/**2
	 * Дополнительные inline-стили для контейнера изображения.
	 */
	style?: CSSProperties;

	/**
	 * Компонент, который отображается в случае ошибки загрузки изображения.
	 * Если не указан, отображается текст из свойства `alt`.
	 */
	errorComponent?: ReactNode;

	/**
	 * Определяет, нужно ли использовать размытый placeholder.
	 * - "blur": Использовать размытый placeholder.
	 * - "empty": Не использовать placeholder.
	 * @default "empty"
	 */
	placeholder?: "blur" | "empty";

	/**
	 * Base64-encoded изображение с низким разрешением, которое будет использоваться как placeholder.
	 * Пока основное изображение загружается, будет отображаться это размытое изображение.
	 */
	blurDataURL?: string;

	/**
	 * Определяет, как изображение должно быть загружено.
	 * - "lazy": Отложенная загрузка изображения до момента, когда оно окажется близко к области видимости.
	 * - "eager": Загрузка изображения сразу, независимо от его положения на странице.
	 * - "auto": Браузер сам решает, когда загружать изображение.
	 * @default "lazy"
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading
	 */
	loading?: DetailedHTMLProps<
		ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>["loading"];

	/**
	 * Компонент, который отображается во время загрузки изображения.
	 */
	loader?: ReactNode;
}

/**
 * Компонент `Image` отображает изображение с поддержкой:
 * - webp и fallback-форматов;
 * - кастомных стилей, размеров и позиционирования;
 * - соотношения сторон (включая `aspect-ratio`);
 * - плейсхолдера при загрузке (`blur` или кастомный loader);
 * - обработки ошибок загрузки;
 * - srcSet и sizes для адаптивных изображений.
 *
 * Поддерживает передачу кастомного компонента при ошибке и плейсхолдера при загрузке.
 *
 * @component
 * @example
 * ```tsx
 * <Image
 *   src="/images/photo.jpg"
 *   webpSrc="/images/photo.webp"
 *   alt="My photo"
 *   aspectRatio="4/3"
 *   objectFit="cover"
 *   placeholder="blur"
 *   blurDataURL="/images/photo-blur.jpg"
 * />
 * ```
 *
 * @param {ImageProps} props - Свойства компонента Image.
 * @param {string} [props.src] - Путь к изображению.
 * @param {string} [props.webpSrc] - Путь к webp-версии изображения.
 * @param {string} [props.alt="image"] - Альтернативный текст изображения.
 * @param {string} [props.aspectRatio="1/1"] - Соотношение сторон, например, "16/9" или "auto".
 * @param {string} [props.objectFit="fill"] - Поведение содержимого внутри контейнера (например, "cover", "contain").
 * @param {string} [props.objectPosition="center center"] - Позиционирование изображения внутри контейнера.
 * @param {string} [props.width="100%"] - Ширина контейнера.
 * @param {string} [props.height="100%"] - Высота контейнера.
 * @param {string} [props.srcSet] - Значения srcSet для адаптивных изображений.
 * @param {string} [props.sizes] - Атрибут sizes для адаптивной загрузки.
 * @param {string} [props.placeholder="empty"] - Тип плейсхолдера: `"empty"`, `"blur"` или любой другой.
 * @param {string} [props.blurDataURL] - Путь к размытой версии изображения (используется с placeholder="blur").
 * @param {React.ReactNode} [props.loader] - Кастомный плейсхолдер во время загрузки.
 * @param {React.ReactNode} [props.errorComponent] - Компонент, отображаемый при ошибке загрузки изображения.
 * @param {string} [props.className] - CSS-классы для контейнера.
 * @param {React.CSSProperties} [props.style] - Инлайн-стили для контейнера.
 * @param {"lazy" | "eager"} [props.loading="lazy"] - Стратегия загрузки изображения.
 *
 * @returns {JSX.Element} Компонент изображения с обработкой загрузки, ошибок и webp.
 */

export const Image = memo(
	({
		objectFit = "fill",
		objectPosition = "center center",
		aspectRatio = "1/1",
		width = "100%",
		height = "100%",
		src,
		webpSrc,
		alt = "image",
		srcSet,
		sizes,
		className: classNames,
		style: customStyle,
		errorComponent,
		placeholder = "empty",
		blurDataURL,
		loading = "lazy",
		loader,
	}: ImageProps) => {
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isError, setIsError] = useState<boolean>(false);
		const [isWebpError, setIsWebpError] = useState<boolean>(false);
		const imageRef = useRef<HTMLImageElement | null>(null);

		const [widthRatio, heightRatio] = useMemo(() => {
			if (aspectRatio === "auto") return ["auto", "auto"];
			const [width, height] = aspectRatio.split("/").map(Number);
			return isNaN(width) || isNaN(height) ? [1, 1] : [width, height];
		}, [aspectRatio]);

		useEffect(() => {
			loadImage(src, webpSrc, setIsLoading, setIsError, setIsWebpError);
		}, [src, webpSrc]);

		const containerStyle = useMemo(() => {
			return getContainerStyle(width, height, aspectRatio, customStyle);
		}, [width, height, aspectRatio, customStyle]);

		const imgStyle = useMemo(() => {
			return getImageStyle(
				widthRatio,
				heightRatio,
				objectFit,
				objectPosition,
			);
		}, [widthRatio, heightRatio, objectFit, objectPosition]);

		const renderPlaceholder = () => {
			if (!isLoading) return null;

			if (placeholder === "blur" && blurDataURL) {
				return (
					<img
						src={blurDataURL}
						alt={alt}
						style={{
							...imgStyle,
							filter: "blur(10px)",
							width: "100%",
							height: "100%",
						}}
						aria-hidden="true"
					/>
				);
			}

			return loader ?? null;
		};

		return (
			<div className={classNames} style={containerStyle}>
				{renderPlaceholder()}

				{isError && !isLoading && (errorComponent || <div>{alt}</div>)}
				{!isLoading && !isError && (
					<picture
						style={{
							// ...imgStyle,
							display: "block",
							width: "100%",
							height: "100%",
						}}
					>
						{webpSrc && !isWebpError ? (
							<source srcSet={webpSrc} type="image/webp" />
						) : null}
						<img
							ref={imageRef}
							src={src}
							alt={alt}
							loading={loading}
							style={{
								...imgStyle,
								display: "block",
								width: "100%",
								height: "100%",
							}}
							srcSet={srcSet}
							sizes={sizes}
							decoding="async"
						/>
					</picture>
				)}
			</div>
		);
	},
);

Image.displayName = "Image";
