import clsx from "clsx"
import { type ButtonHTMLAttributes, forwardRef, memo, type MouseEvent } from "react"

import style from "./Button.module.scss"

/**
 * Пропсы компонента `Button`.
 *
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Растягивать ли кнопку на всю доступную ширину контейнера.
	 *
	 * @defaultValue false
	 *
	 * @example
	 * ```tsx
	 * <Button fluid>Full-width button</Button>
	 * ```
	 */
	fluid?: boolean

	/**
	 * Предотвращать ли действие по умолчанию для события `click`.
	 *
	 * @defaultValue false
	 *
	 * @example
	 * ```tsx
	 * <Button preventDefault onClick={() => console.log("Clicked")}>
	 *   Click me (prevented default)
	 * </Button>
	 * ```
	 */
	preventDefault?: boolean

	/**
	 * Останавливать ли всплытие события `click`.
	 *
	 * @defaultValue false
	 *
	 * @example
	 * ```tsx
	 * <Button stopPropagation onClick={() => console.log("Clicked")}>
	 *   Click me (no propagation)
	 * </Button>
	 * ```
	 */
	stopPropagation?: boolean
}

/**
 * Универсальный компонент кнопки с поддержкой всех стандартных HTML-атрибутов.
 *
 * @remarks
 * Компонент `Button` используется для выполнения действий при клике
 * и поддерживает все стандартные свойства HTML-кнопок.
 *
 * Компонент обёрнут в `React.memo` для оптимизации производительности.
 *
 * @param props - Пропсы компонента, расширяющие {@link IButtonProps | интерфейс IButtonProps}.
 * @param props.className - Дополнительный CSS-класс для кастомизации стилей.
 * @param props.children - Содержимое кнопки (текст, иконки и т.д.).
 * @param props.onClick - Обработчик события клика.
 * @param props.stopPropagation - Останавливать ли всплытие события `click`. По умолчанию `false`.
 * @param props.preventDefault - Предотвращать ли действие по умолчанию для события `click`. По умолчанию `false`.
 * @param props.fluid - Растягивать ли кнопку на всю доступную ширину контейнера. По умолчанию `false`.
 * @param props... - Все остальные стандартные атрибуты HTML-кнопки (type, disabled, title и т.д.).
 *
 * @returns React-элемент кнопки (`<button>`).
 *
 * @example Простое использование
 * ```tsx
 * <Button onClick={() => console.log("Clicked")}>Click me</Button>
 * ```
 *
 * @example С остановкой всплытия
 * ```tsx
 * <Button stopPropagation onClick={() => console.log("Clicked")}>
 *   Click me (no propagation)
 * </Button>
 * ```
 *
 * @example Отправка формы
 * ```tsx
 * <Button type="submit">Submit Form</Button>
 * ```
 *
 * @example Растянутая кнопка
 * ```tsx
 * <Button fluid>Full-width button</Button>
 * ```
 *
 * @see {@link IButtonProps} для подробного описания пропсов.
 * @component
 */

const ButtonComponent = forwardRef<HTMLButtonElement, IButtonProps>(
	(
		{
			className,
			children,
			onClick,
			stopPropagation = false,
			preventDefault = false,
			fluid = false,
			type = "button",
			...props
		},
		ref,
	) => {
		/**
		 * Обработчик клика по кнопке.
		 *
		 * @remarks
		 * Управляет всплытием события и действием по умолчанию в зависимости от пропсов
		 * `stopPropagation` и `preventDefault`. После обработки флагов вызывает
		 * пользовательский обработчик `onClick`, если он передан.
		 *
		 * @param event - Событие клика мыши.
		 */
		const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
			if (stopPropagation) {
				event.stopPropagation()
			}

			if (preventDefault) {
				event.preventDefault()
			}

			if (onClick) {
				onClick(event)
			}
		}

		return (
			<button
				ref={ref}
				className={clsx(
					style.button,
					{
						[style.fluid]: fluid,
					},
					className,
				)}
				onClick={handleClick}
				type={type}
				{...props}
			>
				{children}
			</button>
		)
	},
)

export const Button = memo(ButtonComponent)

ButtonComponent.displayName = "Button"
