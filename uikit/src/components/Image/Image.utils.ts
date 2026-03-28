const imageCache = new Map<string, HTMLImageElement>();
const CACHE_LIMIT = 250;

/**
 * Загружает изображение (включая WebP-версию) с поддержкой кэширования и обработкой событий загрузки/ошибки.
 *
 * - Если изображение уже есть в кэше, загрузка не выполняется.
 * - Поддерживается ограничение размера кэша (`CACHE_LIMIT`), при превышении — удаляется самое старое изображение.
 * - Последовательно пытается загрузить WebP-изображение, а затем оригинальное.
 *
 * @param {string} src - Путь к оригинальному изображению (JPEG, PNG и т.п.).
 * @param {string | undefined} webpSrc - Путь к WebP-версии изображения (опционально).
 * @param {(loading: boolean) => void} setIsLoading - Колбэк для установки состояния загрузки.
 * @param {(error: boolean) => void} setIsError - Колбэк для установки состояния ошибки загрузки оригинального изображения.
 * @param {(error: boolean) => void} setIsWebpError - Колбэк для установки состояния ошибки загрузки WebP-версии.
 *
 * @example
 * loadImage(
 *   "/images/photo.jpg",
 *   "/images/photo.webp",
 *   setLoading,
 *   setError,
 *   setWebpError
 * )
 */
export const loadImage = (
	src: string,
	webpSrc: string | undefined,
	setIsLoading: (loading: boolean) => void,
	setIsError: (error: boolean) => void,
	setIsWebpError: (error: boolean) => void
) => {
	if ((webpSrc && imageCache.has(webpSrc)) || imageCache.has(src)) {
		setIsLoading(false);
		return;
	}

	setIsLoading(true);
	setIsError(false);
	setIsWebpError(false);

	const addToCache = (url: string, image: HTMLImageElement) => {
		// При превышении лимита удаляем первый (старейший) элемент
		if (imageCache.size >= CACHE_LIMIT) {
			const oldestKey = imageCache.keys().next().value;
			if (oldestKey) {
				imageCache.delete(oldestKey);
			}
		}
		imageCache.set(url, image);
	};

	const handleLoad = (url: string, image: HTMLImageElement) => {
		// Кэшируем оба пути, если есть webpSrc
		addToCache(url, image);
		if (webpSrc && url === webpSrc && !imageCache.has(src)) {
			// Для оригинала создаём Image, не загружаем повторно, просто создаём объект
			const originalImage = new Image();
			originalImage.src = src;
			addToCache(src, originalImage);
		}
		setIsLoading(false);
	};

	const handleError = (isWebp: boolean) => {
		if (isWebp) {
			setIsWebpError(true);
			// fallback на оригинал
			const fallbackImage = new Image();
			fallbackImage.onload = () => handleLoad(src, fallbackImage);
			fallbackImage.onerror = () => {
				setIsError(true);
				setIsLoading(false);
			};
			fallbackImage.src = src;
		} else {
			setIsError(true);
			setIsLoading(false);
		}
	};

	if (webpSrc) {
		const webpImage = new Image();
		webpImage.onload = () => handleLoad(webpSrc, webpImage);
		webpImage.onerror = () => handleError(true);
		webpImage.src = webpSrc;
	} else {
		const image = new Image();
		image.onload = () => handleLoad(src, image);
		image.onerror = () => handleError(false);
		image.src = src;
	}
};
