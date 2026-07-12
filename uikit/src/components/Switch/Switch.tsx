import clsx from "clsx"
import { type ChangeEvent, memo, type MouseEvent, type ReactNode, useCallback, useId, useRef, useState } from "react"

import style from "./Switch.module.scss"

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
	 * ARIA-описание для дополнительной accessibility информации.
	 */
	ariaDescription?: string

	/**
	 * ARIA-метка для accessibility.
	 * Если не передана, будет использован `label` (если он строка).
	 */
	ariaLabel?: string

	/**
	 * Текущее состояние переключателя (управляемый режим).
	 * Если не передано, используется неуправляемый режим с `defaultChecked`.
	 */
	checked?: boolean

	/**
	 * Начальное состояние переключателя (неуправляемый режим).
	 * @defaultValue false
	 */
	defaultChecked?: boolean

	/**
	 * Отключение переключателя.
	 * @defaultValue false
	 */
	disabled?: boolean

	/**
	 * Текст или React-элемент для отображения метки рядом с переключателем.
	 */
	label?: ReactNode | string

	/**
	 * Позиция метки относительно переключателя.
	 * - 'right': метка справа (switch слева, label на всю ширину)
	 * - 'left': метка слева (switch справа, label на всю ширину)
	 * @defaultValue 'right'
	 */
	labelPosition?: "left" | "right"

	/**
	 * Обработчик изменения состояния переключателя.
	 * Вызывается при клике или изменении через клавиатуру.
	 *
	 * @param event - Событие изменения input элемента
	 */
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
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
		/** Внутреннее состояние для неуправляемого режима. */
		const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(defaultChecked)
		/** Ссылка на скрытый input[type="checkbox"] для программного клика. */
		const inputRef = useRef<HTMLInputElement>(null)
		/** Уникальный ID для связи label и input. */
		const id = useId()

		/**
		 * Итоговое значение состояния переключателя.
		 *
		 * @remarks
		 * Если передан `controlledChecked` — используется управляемый режим,
		 * иначе — внутреннее состояние `uncontrolledChecked`.
		 */
		const checked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked

		/**
		 * Обработчик изменения состояния переключателя.
		 *
		 * @remarks
		 * В управляемом режиме предотвращает обновление, если значение не изменилось.
		 * В неуправляемом режиме обновляет внутреннее состояние.
		 * В любом случае вызывает пользовательский обработчик `onChange`.
		 *
		 * @param event - Событие изменения input.
		 */
		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				const targetChecked = event.target.checked

				if (controlledChecked !== undefined && controlledChecked === targetChecked) {
					return
				}

				if (controlledChecked === undefined) {
					setUncontrolledChecked(targetChecked)
				}

				onChange(event)
			},
			[controlledChecked, onChange],
		)

		/**
		 * Обработчик клика по визуальному слайдеру.
		 *
		 * @remarks
		 * Перенаправляет клик на скрытый input[type="checkbox"],
		 * чтобы сохранить стандартное поведение браузера.
		 */
		const handleClick = useCallback(() => {
			if (!disabled && inputRef.current) {
				inputRef.current.click()
			}
		}, [disabled])

		return (
			<div
				className={clsx(style.switch, {
					[style.switch__left]: labelPosition === "left",
					[style.switch__checked]: checked,
					[style.switch__disabled]: disabled,
				})}
			>
				<input
					aria-checked={checked}
					aria-describedby={ariaDescription ? `${id}-desc` : undefined}
					aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
					checked={checked}
					className={style.switch__input}
					disabled={disabled}
					id={id}
					onChange={handleChange}
					ref={inputRef}
					role="switch"
					type="checkbox"
				/>

				<div aria-hidden="true" className={style.switch__slider} onClick={handleClick}>
					<div className={style.switch__thumb} />
				</div>

				{label ? (
					<label
						className={style.switch__label}
						htmlFor={id}
						onClick={(event: MouseEvent<HTMLLabelElement>) => {
							if (disabled) {
								event.preventDefault()
							}
						}}
					>
						{label}
					</label>
				) : null}

				{ariaDescription ? (
					<span className={style.visually_hidden} id={`${id}-desc`}>
						{ariaDescription}
					</span>
				) : null}
			</div>
		)
	},
)

Switch.displayName = "Switch"
