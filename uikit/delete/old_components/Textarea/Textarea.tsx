import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type FocusEvent,
	type ForwardedRef,
	type KeyboardEvent,
} from "react";
import "./Textarea.scss";
import classNames from "classnames";
import { useCombinedRefs } from "../Input/useCombinedRefs";

interface TextareaProps {
	/**
	 * Имя поля textarea, используется как атрибут `name` и `id`
	 *
	 * @defaultValue undefined
	 */
	name?: string;

	/**
	 * Текстовая метка для поля ввода
	 *
	 * @defaultValue undefined
	 */
	label?: string;

	/**
	 * Текущее значение поля ввода (контролируемый компонент)
	 */
	value: string;

	/**
	 * Обработчик изменения значения
	 *
	 * @param event - Событие изменения
	 */
	onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;

	/**
	 * Обработчик ввода (срабатывает при каждом изменении)
	 *
	 * @param event - Событие ввода
	 */
	onInput?(event: ChangeEvent<HTMLTextAreaElement>): void;

	/**
	 * Обработчик потери фокуса
	 *
	 * @param event - Событие потери фокуса
	 */
	onBlur?(event?: FocusEvent<HTMLTextAreaElement>): void;

	/**
	 * Обработчик получения фокуса
	 *
	 * @param event - Событие получения фокуса
	 */
	onFocus?(event?: FocusEvent<HTMLTextAreaElement>): void;

	/**
	 * Подсказывающий текст при отсутствии значения
	 *
	 * @defaultValue undefined
	 */
	placeholder?: string;

	/**
	 * Обязательное ли поле для заполнения
	 *
	 * @defaultValue false
	 */
	required?: boolean;

	/**
	 * Валидационное состояние (ошибка)
	 *
	 * @defaultValue false
	 */
	error?: boolean;

	/**
	 * Заблокировано ли поле для ввода
	 *
	 * @defaultValue false
	 */
	disabled?: boolean;

	/**
	 * Подсказка для виртуальной клавиатуры о действии по Enter
	 *
	 * @defaultValue 'enter'
	 */
	enterKeyHint?:
		| "enter"
		| "next"
		| "previous"
		| "done"
		| "go"
		| "search"
		| "send";

	/**
	 * Автоматически установить фокус при монтировании
	 *
	 * @defaultValue false
	 */
	autoFocus?: boolean;

	/**
	 * Обработчик нажатия клавиш
	 *
	 * @param event - Событие клавиатуры
	 */
	onKeyDown?(event: KeyboardEvent<HTMLTextAreaElement>): void;

	/**
	 * Автоматически прокручивать страницу к полю при получении фокуса,
	 * если поле не видно в области просмотра
	 *
	 * @defaultValue true
	 */
	scrollIntoViewOnFocus?: boolean;

	/**
	 * Количество видимых строк (атрибут rows)
	 *
	 * @defaultValue 3
	 */
	rows?: number;

	/**
	 * Максимальное количество символов
	 *
	 * @defaultValue undefined
	 */
	maxLength?: number;

	/**
	 * Минимальное количество символов
	 *
	 * @defaultValue undefined
	 */
	minLength?: number;

	/**
	 * Возможность изменения размера textarea
	 *
	 * @defaultValue 'vertical'
	 */
	resize?: "none" | "both" | "horizontal" | "vertical";

	maxHeight?: number;
}

/**
 * Универсальный компонент многострочного текстового поля ввода.
 *
 * @remarks
 * Компонент поддерживает все основные HTML-атрибуты textarea, контролируемое состояние,
 * автоматическую прокрутку при фокусе, возможность изменения размера.
 *
 * @example
 * Контролируемое использование:
 * ```tsx
 * const [value, setValue] = useState('')
 * <Textarea
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   label="Описание"
 *   rows={5}
 * />
 * ```
 *
 * @param props - Параметры компонента {@link TextareaProps}
 *
 * @returns React-компонент многострочного текстового поля ввода с меткой и дополнительными функциями
 *
 * @see {@link TextareaProps} для детального описания всех доступных свойств
 */

export const Textarea = memo(
	forwardRef<HTMLTextAreaElement, TextareaProps>(
		(
			{
				name,
				label,
				value,
				onChange,
				onInput,
				onBlur,
				onFocus,
				placeholder,
				required = false,
				error = false,
				disabled = false,
				enterKeyHint = "enter",
				autoFocus = false,
				onKeyDown,
				scrollIntoViewOnFocus = true,
				rows = 3,
				maxLength,
				minLength,
				maxHeight = 250,
			},
			ref: ForwardedRef<HTMLTextAreaElement>
		) => {
			const localRef = useRef<HTMLTextAreaElement>(null);
			const combinedRef = useCombinedRefs(ref, localRef);
			const [baseHeight, setBaseHeight] = useState(0);

			// Инициализация базовой высоты (вычисляется из rows)
			useEffect(() => {
				if (localRef.current) {
					// Сохраняем изначальную высоту (до авторесайза)
					const computedStyle = window.getComputedStyle(
						localRef.current
					);
					const lineHeight = parseInt(computedStyle.lineHeight) || 20;
					const paddingTop = parseInt(computedStyle.paddingTop) || 0;
					const paddingBottom =
						parseInt(computedStyle.paddingBottom) || 0;
					const borderTop =
						parseInt(computedStyle.borderTopWidth) || 0;
					const borderBottom =
						parseInt(computedStyle.borderBottomWidth) || 0;

					const calculatedHeight =
						rows * lineHeight +
						paddingTop +
						paddingBottom +
						borderTop +
						borderBottom;
					setBaseHeight(calculatedHeight);
					localRef.current.style.height = `${calculatedHeight}px`;
				}
			}, [rows]);

			// Функция для автоматического изменения высоты
			const adjustHeight = useCallback(() => {
				const textarea = combinedRef.current;
				if (!textarea) return;

				// Сначала сбросим высоту к базовой
				textarea.style.height = `${baseHeight}px`;
				// Вычисляем новую высоту (но не больше maxHeight)
				const newHeight = Math.min(
					Math.max(textarea.scrollHeight, baseHeight),
					maxHeight
				);
				textarea.style.height = `${newHeight}px`;
			}, [baseHeight, combinedRef, maxHeight]);

			// Обработчик изменения значения
			const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
				adjustHeight();
				onChange?.(e);
			};

			const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
				onFocus?.(event);
				adjustHeight();

				if (!scrollIntoViewOnFocus || disabled) return;

				requestAnimationFrame(() => {
					const textarea = combinedRef.current;
					if (!textarea) return;

					const rect = textarea.getBoundingClientRect();
					const isVisible =
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <=
							(window.innerHeight ||
								document.documentElement.clientHeight) &&
						rect.right <=
							(window.innerWidth ||
								document.documentElement.clientWidth);

					if (!isVisible) {
						textarea.scrollIntoView({
							behavior: "smooth",
							block: "center",
						});
					}
				});
			};

			useEffect(() => {
				if (autoFocus && combinedRef.current && scrollIntoViewOnFocus) {
					requestAnimationFrame(() => {
						const textarea = combinedRef.current;
						if (!textarea) return;

						textarea.focus();
						adjustHeight();

						const rect = textarea.getBoundingClientRect();
						const isVisible =
							rect.top >= 0 &&
							rect.left >= 0 &&
							rect.bottom <=
								(window.innerHeight ||
									document.documentElement.clientHeight) &&
							rect.right <=
								(window.innerWidth ||
									document.documentElement.clientWidth);

						if (!isVisible) {
							textarea.scrollIntoView({
								behavior: "smooth",
								block: "center",
							});
						}
					});
				}
			}, [adjustHeight, autoFocus, combinedRef, scrollIntoViewOnFocus]);

			// Обновляем высоту при изменении значения
			useEffect(() => {
				adjustHeight();
			}, [value, baseHeight, adjustHeight]);

			const handleContainerClick = () => {
				if (disabled) return;
				combinedRef.current?.focus();
			};

			return (
				<div
					className={classNames("form", {
						error: error,
						disabled: disabled,
					})}
					onClick={handleContainerClick}
					role="group"
					aria-disabled={disabled}
				>
					{label && (
						<label className="label" htmlFor={name}>
							{label}
						</label>
					)}
					<textarea
						className="textarea"
						ref={combinedRef}
						id={name}
						name={name}
						value={value}
						onChange={handleChange}
						onInput={onInput}
						onBlur={onBlur}
						onFocus={handleFocus}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						enterKeyHint={enterKeyHint}
						autoFocus={autoFocus}
						onKeyDown={onKeyDown}
						rows={rows}
						maxLength={maxLength}
						minLength={minLength}
						style={{
							resize: "none",
							overflowY: "auto",
							minHeight: `${baseHeight}px`,
							maxHeight: `${maxHeight}px`,
						}}
					/>
				</div>
			);
		}
	)
);

Textarea.displayName = "Textarea";
