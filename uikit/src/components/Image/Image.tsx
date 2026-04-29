import {
	memo,
	type ReactEventHandler,
	useEffect,
	useMemo,
	useState,
} from "react";
import { getContainerStyle, getImageStyle } from "./Image.style";
import type { IImageProps } from "./Image.types";
import {
	createImageCacheKey,
	isImageFailed,
	isImageLoaded,
	markImageAsFailed,
	markImageAsLoaded,
	normalizeSrcSet,
} from "./Image.utils";

/**
 * Статус загрузки изображения.
 *
 * @remarks
 * Используется для отслеживания состояния загрузки изображения внутри компонента {@link Image}.
 *
 * - `"loading"` - изображение загружается
 * - `"loaded"` - изображение успешно загружено
 * - `"error"` - произошла ошибка загрузки изображения
 */
type TImageStatus = "loading" | "loaded" | "error";

/**
 * Компонент для отображения изображений с поддержкой адаптивной загрузки, кэширования и fallback-ов.
 *
 * @remarks
 * Компонент предоставляет расширенную функциональность по сравнению со стандартным `<img>`:
 * - Кэширование состояния загрузки изображений (успех/ошибка) для избежания повторных запросов
 * - Поддержка `<picture>` с несколькими источниками (`sources`)
 * - Автоматический fallback на следующий источник при ошибке загрузки
 * - Плейсхолдеры (blur-эффект или кастомный loader)
 * - Контроль соотношения сторон (`aspectRatio`)
 * - Оптимизированная загрузка (`loading="lazy"`, `decoding="async"`)
 * - Доступность (ARIA-атрибуты)
 *
 * @param props - Свойства компонента, расширяющие стандартные атрибуты `<img>`.
 * @returns React-элемент изображения с оберткой и дополнительными функциями.
 *
 * @example
 * ```tsx
 * <Image
 *   src="/image.jpg"
 *   alt="Описание изображения"
 *   width={300}
 *   height={200}
 *   aspectRatio="16/9"
 *   placeholder="blur"
 *   blurDataURL="/blur.jpg"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Image
 *   src="/image.jpg"
 *   alt="Адаптивное изображение"
 *   srcSet={[
 *     { src: "/small.jpg", width: 320 },
 *     { src: "/medium.jpg", width: 640 },
 *     { src: "/large.jpg", width: 1024 },
 *   ]}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   sources={[
 *     {
 *       srcSet: "/image.webp",
 *       type: "image/webp",
 *     },
 *   ]}
 * />
 * ```
 */
export const Image = memo(
	({
		src,
		alt,
		srcSet,
		sizes,
		sources,

		aspectRatio = "1/1",
		objectFit = "cover",
		objectPosition = "center center",

		width = "100%",
		height = "100%",

		className,
		style,

		imgClassName,
		imgStyle,

		errorComponent,
		loader,

		placeholder = "empty",
		blurDataURL,

		loading = "lazy",
		decoding = "async",

		onLoad,
		onError,

		...imgProps
	}: IImageProps) => {
		/**
		 * Ключ кэша для текущего изображения, основанный на его источниках.
		 *
		 * @remarks
		 * Используется для проверки, было ли изображение уже загружено или завершилось ошибкой
		 * в предыдущих рендерах. Это позволяет избежать повторной загрузки уже загруженных изображений.
		 */
		const cacheKey = useMemo(() => {
			return createImageCacheKey({
				src,
				srcSet,
				sizes,
				sources,
			});
		}, [src, srcSet, sizes, sources]);

		/**
		 * Текущий статус загрузки изображения.
		 *
		 * @remarks
		 * Инициализируется на основе данных из кэша. Если изображение уже было загружено
		 * ранее (в другом компоненте или на предыдущем рендере), статус сразу устанавливается
		 * в `"loaded"`. Аналогично для ошибок.
		 */
		const [status, setStatus] = useState<TImageStatus>(() => {
			if (isImageLoaded(cacheKey)) {
				return "loaded";
			}

			if (isImageFailed(cacheKey)) {
				return "error";
			}

			return "loading";
		});

		/**
		 * Флаг, указывающий, что источники (`<source>`) внутри `<picture>` должны быть отключены.
		 *
		 * @remarks
		 * Используется для реализации fallback-логики: если загрузка из источников завершилась ошибкой,
		 * отключаем все `<source>` и пытаемся загрузить основное изображение (`src`).
		 */
		const [skippedSourcesCount, setSkippedSourcesCount] = useState(0);

		/**
		 * Эффект для синхронизации статуса загрузки при изменении ключа кэша.
		 *
		 * @remarks
		 * При изменении `cacheKey` (например, при смене `src`) сбрасывает флаг отключения источников
		 * и обновляет статус на основе актуальных данных кэша.
		 */
		useEffect(() => {
			setSkippedSourcesCount(0);

			if (isImageLoaded(cacheKey)) {
				setStatus("loaded");
				return;
			}

			if (isImageFailed(cacheKey)) {
				setStatus("error");
				return;
			}

			setStatus("loading");
		}, [cacheKey]);

		/**
		 * Нормализованный `srcSet` для основного изображения.
		 *
		 * @remarks
		 * Преобразует массив кандидатов `ImageSrcSetCandidate[]` в строку формата `"url width, url 2x"`,
		 * либо возвращает исходную строку `srcSet` без изменений.
		 */
		const normalizedImgSrcSet = useMemo(() => {
			return normalizeSrcSet(srcSet);
		}, [srcSet]);

		/**
		 * Нормализованные источники для элемента `<picture>`.
		 *
		 * @remarks
		 * Преобразует массив `sources`, нормализуя `srcSet` каждого источника и фильтруя пустые.
		 * Если источники отключены (`areSourcesDisabled`), возвращает пустой массив.
		 */
		const normalizedSources = useMemo(() => {
			if (!sources?.length) {
				return [];
			}

			return sources
				.map((source) => ({
					...source,
					srcSet: normalizeSrcSet(source.srcSet),
				}))
				.filter((source) => Boolean(source.srcSet));
		}, [sources]);

		const activeSources = useMemo(() => {
			return normalizedSources.slice(skippedSourcesCount);
		}, [normalizedSources, skippedSourcesCount]);

		/**
		 * Стили контейнера изображения.
		 *
		 * @remarks
		 * Генерируются с помощью {@link getContainerStyle} на основе параметров `width`, `height`,
		 * `aspectRatio` и пользовательских стилей `style`.
		 */
		const containerStyle = useMemo(() => {
			return getContainerStyle({
				width,
				height,
				aspectRatio,
				customStyle: style,
			});
		}, [width, height, aspectRatio, style]);

		/**
		 * Стили самого изображения (`<img>`).
		 *
		 * @remarks
		 * Генерируются с помощью {@link getImageStyle} на основе параметров `aspectRatio`,
		 * `objectFit`, `objectPosition` и пользовательских стилей `imgStyle`.
		 * Прозрачность (`opacity`) управляется в зависимости от статуса загрузки:
		 * изображение становится полностью видимым только после успешной загрузки.
		 */
		const imageStyle = useMemo(() => {
			return getImageStyle({
				aspectRatio,
				objectFit,
				objectPosition,
				customStyle: {
					...imgStyle,
					opacity: status === "loaded" ? imgStyle?.opacity : 0,
				},
			});
		}, [aspectRatio, objectFit, objectPosition, imgStyle, status]);

		/**
		 * Обработчик успешной загрузки изображения.
		 *
		 * @remarks
		 * Вызывается когда изображение (`<img>`) успешно загружено. Помечает изображение как загруженное
		 * в кэше, обновляет статус и вызывает пользовательский обработчик `onLoad`, если он предоставлен.
		 *
		 * @param event - Событие загрузки изображения.
		 */
		const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
			markImageAsLoaded(cacheKey);
			setStatus("loaded");

			if (onLoad) {
				onLoad(event);
			}
		};

		/**
		 * Обработчик ошибки загрузки изображения.
		 *
		 * @remarks
		 * Вызывается когда изображение (`<img>`) не смогло загрузиться. Если есть альтернативные источники
		 * (`normalizedSources`) и они ещё не отключены, отключает источники и пытается загрузить основное
		 * изображение повторно. В противном случае помечает изображение как ошибочное в кэше, обновляет
		 * статус и вызывает пользовательский обработчик `onError`.
		 *
		 * @param event - Событие ошибки изображения.
		 */
		const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
			if (skippedSourcesCount < normalizedSources.length) {
				setSkippedSourcesCount((prev) => prev + 1);
				setStatus("loading");
				return;
			}

			markImageAsFailed(cacheKey);
			setStatus("error");

			if (onError) {
				onError(event);
			}
		};

		/**
		 * Флаг, указывающий нужно ли показывать плейсхолдер.
		 */
		const shouldShowPlaceholder = status === "loading";

		/**
		 * Флаг, указывающий нужно ли показывать компонент ошибки.
		 */
		const shouldShowError = status === "error";

		return (
			<div
				className={className}
				style={containerStyle}
				aria-busy={status === "loading" || undefined}
			>
				{shouldShowPlaceholder ? (
					<div
						style={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
						}}
						aria-hidden="true"
					>
						{placeholder === "blur" && blurDataURL ? (
							<img
								src={blurDataURL}
								alt=""
								style={{
									display: "block",
									width: "100%",
									height: "100%",
									objectFit,
									objectPosition,
									filter: "blur(10px)",
									transform: "scale(1.03)",
								}}
							/>
						) : (
							loader
						)}
					</div>
				) : null}

				{shouldShowError ? (
					(errorComponent ?? <div>{alt}</div>)
				) : (
					<picture
						key={`sources-offset-${skippedSourcesCount}`}
						style={{
							display: "block",
							width: "100%",
							height: "100%",
						}}
					>
						{activeSources.map((source, index) => (
							<source
								key={[
									source.type,
									source.media,
									source.srcSet,
									skippedSourcesCount + index,
								].join("-")}
								srcSet={source.srcSet}
								type={source.type}
								media={source.media}
								sizes={source.sizes ?? sizes}
								width={source.width}
								height={source.height}
							/>
						))}

						<img
							{...imgProps}
							className={imgClassName}
							src={src}
							srcSet={normalizedImgSrcSet}
							sizes={sizes}
							alt={alt}
							loading={loading}
							decoding={decoding}
							style={imageStyle}
							onLoad={handleLoad}
							onError={handleError}
						/>
					</picture>
				)}
			</div>
		);
	},
);

Image.displayName = "Image";
