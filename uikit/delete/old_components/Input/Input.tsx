import {
	forwardRef,
	useEffect,
	useId,
	useMemo,
	useRef,
	type ChangeEvent,
	type FocusEvent,
	type ForwardedRef,
	type InputHTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
} from "react";
import "./Input.scss";
import classNames from "classnames";
import { useCombinedRefs } from "@dubium/hooks";

type InputType =
	| "text"
	| "number"
	| "email"
	| "tel"
	| "url"
	| "password"
	| "date"
	| "search";
type InputModeType =
	| "text"
	| "email"
	| "tel"
	| "url"
	| "none"
	| "numeric"
	| "decimal"
	| "search"
	| undefined;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Опциональная иконка для отображения внутри поля ввода
	 *
	 * @example
	 * <Input icon={<SearchIcon />} />
	 *
	 * @defaultValue undefined
	 */
	icon?: ReactNode;

	/**
	 * Имя поля input, используется как атрибут `name` и `id`
	 *
	 * @defaultValue undefined
	 */
	name?: string;

	/**
	 * Тип поля input
	 *
	 * @defaultValue 'text'
	 */
	type?: InputType;

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
	onChange?(event: ChangeEvent<HTMLInputElement>): void;

	/**
	 * Обработчик ввода (срабатывает при каждом изменении)
	 *
	 * @param event - Событие ввода
	 */
	onInput?(event: ChangeEvent<HTMLInputElement>): void;

	/**
	 * Обработчик потери фокуса
	 *
	 * @param event - Событие потери фокуса
	 */
	onBlur?(event?: FocusEvent<HTMLInputElement>): void;

	/**
	 * Обработчик получения фокуса
	 *
	 * @param event - Событие получения фокуса
	 */
	onFocus?(event?: FocusEvent<HTMLInputElement>): void;

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
	 * Подсказка для виртуальной клавиатуры о типе вводимых данных
	 *
	 * @remarks
	 * Если не указан, будет вычислен автоматически на основе type
	 */
	inputMode?: InputModeType;

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
	onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

	/**
	 * Автоматически прокручивать страницу к полю при получении фокуса,
	 * если поле не видно в области просмотра
	 *
	 * @defaultValue true
	 */
	scrollIntoViewOnFocus?: boolean;
}

/**
 * Универсальный компонент текстового поля ввода с расширенной функциональностью.
 *
 * @remarks
 * Компонент поддерживает все основные HTML-атрибуты input, контролируемое состояние,
 * автоматическую прокрутку при фокусе, различные типы ввода и виртуальной клавиатуры.
 *
 * @example
 * Контролируемое использование:
 * ```tsx
 * const [value, setValue] = useState('')
 * <Input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   label="Имя пользователя"
 * />
 * ```
 *
 * @example
 * Необязательное поле с подсказкой:
 * ```tsx
 * <Input
 *   placeholder="Введите email"
 *   type="email"
 *   label="Email"
 * />
 * ```
 *
 * @param props - Параметры компонента {@link InputProps}
 *
 * @returns React-компонент текстового поля ввода с меткой и дополнительными функциями
 *
 * @see {@link InputProps} для детального описания всех доступных свойств
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			icon,
			name,
			type = "text",
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
			inputMode,
			enterKeyHint = "enter",
			autoFocus = false,
			onKeyDown,
			scrollIntoViewOnFocus = false,
			...props
		},
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const localRef = useRef<HTMLInputElement>(null);
		const combinedRef = useCombinedRefs(ref, localRef);
		const fallbackId = useId();
		const inputId = name || fallbackId;

		useEffect(() => {
			if (value !== undefined && typeof onChange !== "function") {
				console.warn(
					'Input is a controlled component, but "onChange" is not provided.'
				);
			}
		}, [value, onChange]);

		const computedInputMode = useMemo(() => {
			if (inputMode) return inputMode;

			switch (type) {
				case "number":
					return "numeric";
				case "tel":
					return "tel";
				case "email":
					return "email";
				case "url":
					return "url";
				default:
					return undefined;
			}
		}, [type, inputMode]);

		const scrollIfNeeded = () => {
			const input = combinedRef.current;
			if (!input) return;

			const rect = input.getBoundingClientRect();
			const isVisible =
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <=
					(window.innerHeight ||
						document.documentElement.clientHeight) &&
				rect.right <=
					(window.innerWidth || document.documentElement.clientWidth);

			if (!isVisible) {
				input.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		};

		const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
			onFocus?.(event);

			if (!scrollIntoViewOnFocus || disabled) return;

			requestAnimationFrame(scrollIfNeeded);
		};

		useEffect(() => {
			if (
				autoFocus &&
				!disabled &&
				combinedRef.current &&
				scrollIntoViewOnFocus
			) {
				requestAnimationFrame(() => {
					const input = combinedRef.current;
					if (!input) return;

					input.focus();
					scrollIfNeeded();
				});
			}
		}, [autoFocus, disabled, combinedRef, scrollIntoViewOnFocus]);

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
					<label className="label" htmlFor={inputId}>
						{label}
						{required ? (
							<span style={{ marginLeft: "2px" }}>*</span>
						) : null}
					</label>
				)}
				<div className="container">
					{icon && <span className="icon">{icon}</span>}

					<input
						ref={combinedRef}
						id={inputId}
						className="input"
						name={name}
						type={type}
						value={value}
						onChange={onChange}
						onInput={onInput}
						onBlur={onBlur}
						onFocus={handleFocus}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						enterKeyHint={enterKeyHint}
						autoFocus={autoFocus}
						inputMode={computedInputMode}
						onKeyDown={onKeyDown}
						aria-invalid={error || undefined}
						{...props}
					/>
				</div>
			</div>
		);
	}
);

Input.displayName = "Input";
