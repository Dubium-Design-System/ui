import { Code, Deleted, Heading, Italic, Keyboard, Mark, Paragraph, Strong, Text, Underline } from "./components"

/**
 * Основной объект типографии, объединяющий все компоненты для работы с текстом.
 *
 * @remarks
 * Объект предоставляет единую точку доступа ко всем компонентам типографии через точечную нотацию.
 * Каждый компонент соответствует семантическому HTML-элементу с дополнительными стилями и функциональностью.
 *
 * Доступные компоненты:
 * - `Typography.Heading` – заголовки уровней 1–4
 * - `Typography.Paragraph` – параграфы
 * - `Typography.Text` – основной текстовый блок
 * - `Typography.Code` – инлайн-код или блок кода
 * - `Typography.Deleted` – зачеркнутый текст
 * - `Typography.Italic` – курсивный текст
 * - `Typography.Keyboard` – текст, имитирующий клавиши клавиатуры
 * - `Typography.Mark` – помеченный текст
 * - `Typography.Strong` – жирный текст
 * - `Typography.Underline` – подчеркнутый текст
 *
 * @example Использование через точечную нотацию
 * ```tsx
 * <Typography.Heading level={2}>Заголовок второго уровня</Typography.Heading>
 * ```
 *
 * @example Деструктуризация компонента
 * ```tsx
 * const { Heading } = Typography;
 * <Heading level={3}>Заголовок третьего уровня</Heading>
 * ```
 *
 * @example Комплексное использование
 * ```tsx
 * <Typography>
 *   <Typography.Heading level={1}>Заголовок</Typography.Heading>
 *   <Typography.Paragraph>
 *     <Typography.Text>Обычный текст с </Typography.Text>
 *     <Typography.Strong>жирным акцентом</Typography.Strong>
 *     <Typography.Text> и </Typography.Text>
 *     <Typography.Code>кодом</Typography.Code>.
 *   </Typography.Paragraph>
 * </Typography>
 * ```
 *
 * @see {@link Heading} – компонент заголовка
 * @see {@link Paragraph} – компонент параграфа
 * @see {@link Text} – компонент текста
 */
export const Typography = {
	/** Компонент для отображения инлайн-кода или блоков кода */
	Code,
	/** Компонент для отображения зачеркнутого текста */
	Deleted,
	/** Компонент заголовка с поддержкой уровней 1–4 */
	Heading,
	/** Компонент для отображения курсивного текста */
	Italic,
	/** Компонент для имитации клавиш клавиатуры */
	Keyboard,
	/** Компонент для пометки текста (подсветка) */
	Mark,
	/** Компонент параграфа */
	Paragraph,
	/** Компонент для отображения жирного текста */
	Strong,
	/** Основной текстовый компонент */
	Text,
	/** Компонент для подчеркнутого текста */
	Underline,
} as const
