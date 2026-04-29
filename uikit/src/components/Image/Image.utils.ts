import type { IImageSource, TImageSrcSet } from "./Image.types";

/**
 * Максимальное количество записей в кэше загруженных и ошибочных изображений.
 *
 * @remarks
 * Используется для ограничения памяти, потребляемой кэшем. Когда количество записей
 * превышает этот лимит, самые старые записи автоматически удаляются.
 */
const CACHE_LIMIT = 250;

/**
 * Кэш успешно загруженных изображений.
 *
 * @remarks
 * Хранит ключи кэша изображений, которые были успешно загружены.
 * Используется для избежания повторной загрузки уже загруженных изображений
 * в пределах сессии приложения.
 */
const loadedImageCache = new Map<string, true>();

/**
 * Кэш изображений, загрузка которых завершилась ошибкой.
 *
 * @remarks
 * Хранит ключи кэша изображений, которые не удалось загрузить.
 * Используется для избежания повторных попыток загрузки изображений,
 * которые уже завершились ошибкой.
 */
const failedImageCache = new Map<string, true>();

/**
 * Обновляет запись в кэше, поддерживая LRU-логику (Least Recently Used).
 *
 * @remarks
 * Если запись с таким ключом уже существует, она удаляется и добавляется заново,
 * что делает её "свежей" (перемещает в конец порядка итерации Map).
 * Если размер кэша превышает {@link CACHE_LIMIT}, удаляется самая старая запись.
 *
 * @typeParam T - Тип значения, хранящегося в кэше (для `loadedImageCache` и `failedImageCache` это `true`).
 * @param cache - Кэш (Map), в который нужно добавить запись.
 * @param key - Ключ записи.
 * @param value - Значение записи.
 */
const touchCacheEntry = <T>(cache: Map<string, T>, key: string, value: T) => {
	if (cache.has(key)) {
		cache.delete(key);
	}

	if (cache.size >= CACHE_LIMIT) {
		const oldestKey = cache.keys().next().value;

		if (oldestKey) {
			cache.delete(oldestKey);
		}
	}

	cache.set(key, value);
};

/**
 * Нормализует адаптивный набор изображений (`srcSet`) в строку формата HTML.
 *
 * @remarks
 * Преобразует различные форматы {@link TImageSrcSet} в стандартную строку `srcSet`,
 * которую можно использовать в атрибуте `srcset` HTML-элемента `<img>` или `<source>`.
 *
 * Поддерживает два формата входных данных:
 * 1. Строка - возвращается без изменений.
 * 2. Массив кандидатов - каждый кандидат преобразуется в строку `"url descriptor"`.
 *
 * @param srcSet - Адаптивный набор изображений для нормализации.
 * @returns Нормализованная строка `srcset` или `undefined`, если входные данные пусты.
 *
 * @example
 * ```ts
 * // Строковый формат
 * normalizeSrcSet("image-320w.jpg 320w, image-640w.jpg 640w");
 * // => "image-320w.jpg 320w, image-640w.jpg 640w"
 *
 * // Объектный формат
 * normalizeSrcSet([
 *   { src: "image-320w.jpg", width: 320 },
 *   { src: "image-2x.jpg", density: 2 },
 * ]);
 * // => "image-320w.jpg 320w, image-2x.jpg 2x"
 * ```
 */
export const normalizeSrcSet = (srcSet?: TImageSrcSet): string | undefined => {
	if (!srcSet) return undefined;

	if (typeof srcSet === "string") {
		return srcSet;
	}

	return srcSet
		.map((candidate) => {
			if (typeof candidate === "string") {
				return candidate;
			}

			if (candidate.width) {
				return `${candidate.src} ${candidate.width}w`;
			}

			if (candidate.density) {
				return `${candidate.src} ${candidate.density}x`;
			}

			return candidate.src;
		})
		.join(", ");
};

/**
 * Параметры для создания ключа кэша изображения.
 *
 * @remarks
 * Ключ кэша должен уникально идентифицировать не только URL изображения (`src`),
 * но и весь контекст его загрузки: адаптивные наборы (`srcSet`), размеры (`sizes`)
 * и альтернативные источники (`sources`). Это важно, потому что один и тот же `src`
 * может использоваться с разными адаптивными источниками и иметь разный результат загрузки.
 *
 * @property src - URL основного изображения.
 * @property srcSet - Адаптивный набор изображений.
 * @property sizes - Размеры изображения для разных условий.
 * @property sources - Альтернативные источники для элемента `<picture>`.
 */
export interface CreateImageCacheKeyParams {
	src: string;
	srcSet?: TImageSrcSet;
	sizes?: string;
	sources?: IImageSource[];
}

/**
 * Создает уникальный ключ кэша для изображения на основе его параметров загрузки.
 *
 * @remarks
 * Ключ описывает не только `src`, но и набор `source`/`srcSet`/`sizes`.
 * Это важно, потому что один и тот же `src` может использоваться с разными adaptive sources.
 * Ключ создается путем сериализации нормализованных параметров в JSON-строку.
 *
 * @param params - Параметры изображения для создания ключа кэша.
 * @returns Уникальный строковый ключ, который можно использовать для идентификации
 *          состояния загрузки данного изображения в кэше.
 *
 * @example
 * ```ts
 * const key = createImageCacheKey({
 *   src: "/image.jpg",
 *   srcSet: [{ src: "/image-2x.jpg", density: 2 }],
 *   sizes: "(max-width: 768px) 100vw, 50vw",
 *   sources: [{ srcSet: "/image.webp", type: "image/webp" }],
 * });
 * // => '{"src":"/image.jpg","srcSet":"/image-2x.jpg 2x","sizes":"...","sources":[...]}'
 * ```
 */
export const createImageCacheKey = ({
	src,
	srcSet,
	sizes,
	sources,
}: CreateImageCacheKeyParams): string => {
	const normalizedSources = sources?.map((source) => ({
		...source,
		srcSet: normalizeSrcSet(source.srcSet),
	}));

	return JSON.stringify({
		src,
		srcSet: normalizeSrcSet(srcSet),
		sizes,
		sources: normalizedSources,
	});
};

/**
 * Проверяет, было ли изображение с данным ключом кэша успешно загружено ранее.
 *
 * @remarks
 * Проверяет наличие ключа в кэше загруженных изображений {@link loadedImageCache}.
 *
 * @param cacheKey - Ключ кэша изображения, созданный {@link createImageCacheKey}.
 * @returns `true`, если изображение было успешно загружено и сохранено в кэше.
 */
export const isImageLoaded = (cacheKey: string): boolean => {
	return loadedImageCache.has(cacheKey);
};

/**
 * Проверяет, завершилась ли загрузка изображения с данным ключом кэша ошибкой ранее.
 *
 * @remarks
 * Проверяет наличие ключа в кэше ошибочных изображений {@link failedImageCache}.
 *
 * @param cacheKey - Ключ кэша изображения, созданный {@link createImageCacheKey}.
 * @returns `true`, если загрузка изображения ранее завершилась ошибкой.
 */
export const isImageFailed = (cacheKey: string): boolean => {
	return failedImageCache.has(cacheKey);
};

/**
 * Помечает изображение как успешно загруженное в кэше.
 *
 * @remarks
 * Удаляет запись об ошибке для данного ключа (если есть) и добавляет ключ
 * в кэш загруженных изображений с использованием LRU-логики {@link touchCacheEntry}.
 *
 * @param cacheKey - Ключ кэша изображения, созданный {@link createImageCacheKey}.
 */
export const markImageAsLoaded = (cacheKey: string) => {
	failedImageCache.delete(cacheKey);
	touchCacheEntry(loadedImageCache, cacheKey, true);
};

/**
 * Помечает изображение как завершившееся ошибкой в кэше.
 *
 * @remarks
 * Удаляет запись об успешной загрузке для данного ключа (если есть) и добавляет ключ
 * в кэш ошибочных изображений с использованием LRU-логики {@link touchCacheEntry}.
 *
 * @param cacheKey - Ключ кэша изображения, созданный {@link createImageCacheKey}.
 */
export const markImageAsFailed = (cacheKey: string) => {
	loadedImageCache.delete(cacheKey);
	touchCacheEntry(failedImageCache, cacheKey, true);
};

/**
 * Полностью очищает кэши загруженных и ошибочных изображений.
 *
 * @remarks
 * Удаляет все записи из {@link loadedImageCache} и {@link failedImageCache}.
 * Полезно для тестирования или при необходимости сбросить состояние кэша
 * (например, при logout пользователя или смене контента).
 */
export const clearImageCache = () => {
	loadedImageCache.clear();
	failedImageCache.clear();
};
