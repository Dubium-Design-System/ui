import {
	memo,
	useCallback,
	useId,
	useRef,
	useState,
	type ChangeEvent,
	type ReactNode,
	type MouseEvent,
} from "react";
import style from "./Switch.module.scss";
import clsx from "clsx";

/**
 * Свойства компонента Switch (переключатель).
 *
 * @remarks
 * Компонент поддерживает как управляемый, так и неуправляемый режимы.
 * Если передано свойство `checked`, компонент работает в управляемом режиме.
 * Если `checked` не передан, используется `defaultChecked` для инициализации
 * и компонент работает в неуправляемом режиме.
 *
 * @public
 */
export interface ISwitchProps {
	/**
	 * Текущее состояние переключателя (управляемый режим).
	 * Если не передано, используется неуправляемый режим с `defaultChecked`.
	 */
	checked?: boolean;

	/**
	 * Начальное состояние переключателя (неуправляемый режим).
	 * @defaultValue false
	 */
	defaultChecked?: boolean;

	/**
	 * Текст или React-элемент для отображения метки рядом с переключателем.
	 */
	label?: string | ReactNode;

	/**
	 * Обработчик изменения состояния переключателя.
	 * Вызывается при клике или изменении через клавиатуру.
	 *
	 * @param event - Событие изменения input элемента
	 */
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Отключение переключателя.
	 * @defaultValue false
	 */
	disabled?: boolean;

	/**
	 * ARIA-метка для accessibility.
	 * Если не передана, будет использован `label` (если он строка).
	 */
	ariaLabel?: string;

	/**
	 * ARIA-описание для дополнительной accessibility информации.
	 */
	ariaDescription?: string;

	/**
	 * Позиция метки относительно переключателя.
	 * - 'right': метка справа (switch слева, label на всю ширину)
	 * - 'left': метка слева (switch справа, label на всю ширину)
	 * @defaultValue 'right'
	 */
	labelPosition?: "left" | "right";
}

/**
 * Компонент Switch (переключатель) для отображения двоичного состояния (вкл/выкл).
 *
 * @remarks
 * Компонент реализует переключатель с поддержкой управляемого и неуправляемого режимов,
 * доступности (ARIA) и кастомного оформления через CSS-модули.
 *
 * @example Управляемый режим
 * ```tsx
 * const [checked, setChecked] = useState(false);
 * return (
 *   <Switch
 *     checked={checked}
 *     onChange={(e) => setChecked(e.target.checked)}
 *     label="Включить уведомления"
 *   />
 * );
 * ```
 *
 * @example Неуправляемый режим
 * ```tsx
 * <Switch
 *   defaultChecked={true}
 *   onChange={(e) => console.log(e.target.checked)}
 *   label="Автозапуск"
 * />
 * ```
 *
 * @example Отключенное состояние
 * ```tsx
 * <Switch
 *   disabled
 *   label="Недоступно"
 *   onChange={() => {}}
 * />
 * ```
 *
 * @param props - Свойства компонента {@link SwitchProps}
 * @returns React-элемент переключателя
 *
 * @public
 */
export const Switch = memo(
	({
		label,
		checked: controlledChecked,
		defaultChecked = false,
		onChange,
		disabled = false,
		ariaLabel,
		ariaDescription,
		labelPosition = "right",
	}: ISwitchProps) => {
		const [uncontrolledChecked, setUncontrolledChecked] =
			useState<boolean>(defaultChecked);
		const inputRef = useRef<HTMLInputElement>(null);
		const id = useId();

		const checked =
			controlledChecked !== undefined
				? controlledChecked
				: uncontrolledChecked;

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				const targetChecked = event.target.checked;

				if (
					controlledChecked !== undefined &&
					controlledChecked === targetChecked
				) {
					return;
				}

				if (controlledChecked === undefined) {
					setUncontrolledChecked(targetChecked);
				}

				onChange(event);
			},
			[controlledChecked, onChange],
		);

		const handleClick = useCallback(() => {
			if (!disabled && inputRef.current) {
				inputRef.current.click();
			}
		}, [disabled]);

		return (
			<div
				className={clsx(style.switch, {
					[style.switch__left]: labelPosition === "left",
					[style.switch__checked]: checked,
					[style.switch__disabled]: disabled,
				})}
			>
				<input
					ref={inputRef}
					type="checkbox"
					role="switch"
					checked={checked}
					onChange={handleChange}
					id={id}
					className={style.switch__input}
					disabled={disabled}
					aria-checked={checked}
					aria-label={
						ariaLabel ||
						(typeof label === "string" ? label : undefined)
					}
					aria-describedby={
						ariaDescription ? `${id}-desc` : undefined
					}
				/>

				<div
					className={style.switch__slider}
					onClick={handleClick}
					aria-hidden="true"
				>
					<div className={style.switch__thumb} />
				</div>

				{label ? (
					<label
						htmlFor={id}
						className={style.switch__label}
						onClick={(event: MouseEvent<HTMLLabelElement>) => {
							if (disabled) {
								event.preventDefault();
							}
						}}
					>
						{label}
					</label>
				) : null}

				{ariaDescription ? (
					<span id={`${id}-desc`} className={style.visually_hidden}>
						{ariaDescription}
					</span>
				) : null}
			</div>
		);
	},
);

Switch.displayName = "Switch";
