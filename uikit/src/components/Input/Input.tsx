import {
  forwardRef,
  type InputHTMLAttributes,
  memo,
  type ReactNode,
  useId,
} from "react";

export interface IInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "required"
> {
  after?: ReactNode;
  before?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  inputClassName?: string;
  label?: string;

  labelClassName?: string;
  required?: boolean;
  rootClassName?: string;
  wrapperClassName?: string;
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
    /** Сгенерированный или переданный ID для связи label и input. */
    const generatedId = useId();
    const inputId = id ?? generatedId;

    /** ID элемента с подсказкой (для aria-describedby). */
    const hintId = hint ? `${inputId}-hint` : undefined;
    /** ID элемента с ошибкой (для aria-describedby). */
    const errorId = error ? `${inputId}-error` : undefined;

    /**
     * Значение атрибута `aria-describedby`, объединяющее ID подсказки и ошибки.
     *
     * @remarks
     * Передаётся в `<input>` для связи с вспомогательными текстами.
     */
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;
    /** Флаг невалидного состояния поля (наличие ошибки). */
    const isInvalid = Boolean(error);

    return (
      <div
        className={rootClassName}
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
        data-required={required || undefined}
      >
        {label ? (
          <label className={labelClassName} htmlFor={inputId}>
            <span>{label}</span>
            {required && <span aria-hidden="true"> *</span>}
          </label>
        ) : null}

        <div className={wrapperClassName}>
          {before ? <span aria-hidden="true">{before}</span> : null}

          <input
            {...props}
            aria-describedby={describedBy}
            aria-invalid={isInvalid || undefined}
            aria-required={required || undefined}
            autoComplete={autoComplete}
            className={inputClassName}
            disabled={disabled}
            id={inputId}
            ref={ref}
            required={required}
            type={type}
          />

          {after ? <span aria-hidden="true">{after}</span> : null}
        </div>

        {hint ? <div id={hintId}>{hint}</div> : null}

        {error ? (
          <div id={errorId} role="alert">
            {error}
          </div>
        ) : null}
      </div>
    );
  },
);

InputBase.displayName = "Input";

export const Input = memo(InputBase);
Input.displayName = "Input";
