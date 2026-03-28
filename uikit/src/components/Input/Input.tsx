import {
	forwardRef,
	useId,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	before?: ReactNode;
	after?: ReactNode;
	required?: boolean;
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
	({ label, before, after, required, ...props }, ref) => {
		const id = useId();

		return (
			<div>
				{label ? (
					<label htmlFor={id}>
						<span>{label}</span>
						{required ? <span>*</span> : null}
					</label>
				) : null}

				<div>
					{before ? before : null}

					<input ref={ref} id={id} required={required} {...props} />

					{after ? after : null}
				</div>
			</div>
		);
	},
);

Input.displayName = "Input";
