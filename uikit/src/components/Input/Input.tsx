import {
	forwardRef,
	memo,
	useId,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";

export interface IInputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"required"
> {
	label?: string;
	before?: ReactNode;
	after?: ReactNode;
	hint?: ReactNode;
	error?: ReactNode;
	required?: boolean;

	rootClassName?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	inputClassName?: string;
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
const InputBase = forwardRef<HTMLInputElement, IInputProps>(
	(
		{
			id,
			label,
			before,
			after,
			hint,
			error,
			required,
			disabled,
			type = "text",
			autoComplete,
			rootClassName,
			labelClassName,
			wrapperClassName,
			inputClassName,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const inputId = id ?? generatedId;

		const hintId = hint ? `${inputId}-hint` : undefined;
		const errorId = error ? `${inputId}-error` : undefined;

		const describedBy =
			[hintId, errorId].filter(Boolean).join(" ") || undefined;
		const isInvalid = Boolean(error);

		return (
			<div
				className={rootClassName}
				data-disabled={disabled || undefined}
				data-invalid={isInvalid || undefined}
				data-required={required || undefined}
			>
				{label && (
					<label htmlFor={inputId} className={labelClassName}>
						<span>{label}</span>
						{required && <span aria-hidden="true"> *</span>}
					</label>
				)}

				<div className={wrapperClassName}>
					{before && <span aria-hidden="true">{before}</span>}

					<input
						{...props}
						ref={ref}
						id={inputId}
						type={type}
						required={required}
						disabled={disabled}
						autoComplete={autoComplete}
						aria-required={required || undefined}
						aria-invalid={isInvalid || undefined}
						aria-describedby={describedBy}
						className={inputClassName}
					/>

					{after && <span aria-hidden="true">{after}</span>}
				</div>

				{hint && <div id={hintId}>{hint}</div>}

				{error && (
					<div id={errorId} role="alert">
						{error}
					</div>
				)}
			</div>
		);
	},
);

InputBase.displayName = "Input";

/**
 * Кастомный shallow-compare:
 * игнорируем ref, минимально проверяем примитивы и ссылки
 */
const areEqual = (prev: IInputProps, next: IInputProps) => {
	return (
		prev.value === next.value &&
		prev.defaultValue === next.defaultValue &&
		prev.disabled === next.disabled &&
		prev.required === next.required &&
		prev.error === next.error &&
		prev.hint === next.hint &&
		prev.before === next.before &&
		prev.after === next.after &&
		prev.className === next.className &&
		prev.inputClassName === next.inputClassName &&
		prev.wrapperClassName === next.wrapperClassName &&
		prev.rootClassName === next.rootClassName
	);
};

export const Input = memo(InputBase, areEqual);
Input.displayName = "Input";
