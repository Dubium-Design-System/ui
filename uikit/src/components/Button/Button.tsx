import {
	memo,
	useCallback,
	type ButtonHTMLAttributes,
	type JSX,
	type MouseEvent,
} from "react";
import style from "./Button.module.scss";
import clsx from "clsx";

/**
 * Пропсы компонента `Button`.
 *
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
	stopPropagation?: boolean;

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
	preventDefault?: boolean;

	/**
	 * Вариант стилизации кнопки.
	 *
	 * @defaultValue undefined
	 *
	 * @example
	 * ```tsx
	 * <Button variant="primary">Primary Button</Button>
	 * <Button variant="secondary">Secondary Button</Button>
	 * <Button variant="outline">Outline Button</Button>
	 * <Button variant="link">Link Button</Button>
	 * ```
	 */
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "link"
		| "primary-alt"
		| "primary-black"
		| "primary-white";

	fluid?: boolean;
}

/**
 * Универсальный компонент кнопки с поддержкой всех стандартных HTML-атрибутов.
 *
 * Компонент `Button` используется для выполнения действий при клике
 * и поддерживает все стандартные свойства HTML-кнопок.
 *
 * **Примеры использования:**
 *
 * — Простое использование
 * `<Button onClick={() => console.log("Clicked")}>Click me</Button>`
 *
 * — С остановкой всплытия
 * `<Button stopPropagation onClick={() => console.log("Clicked")}>
 *   Click me (no propagation)
 * </Button>`
 *
 * — Отправка формы
 * `<Button type="submit">Submit Form</Button>`
 *
 * **Основные пропсы:**
 * - `className` — дополнительный CSS-класс.
 * - `preventDefault` - предотвращает действие по умолчанию.
 * - `stopPropagation` — останавливает всплытие клика.
 * - `onClick` — обработчик события клика.
 *
 * @component
 * @example
 * // Простое использование
 * <Button onClick={() => console.log("Clicked")}>Click me</Button>
 *
 * @example
 * // С остановкой всплытия
 * <Button stopPropagation onClick={() => console.log("Clicked")}>
 *   Click me (no propagation)
 * </Button>
 *
 * @example
 * // Отправка формы
 * <Button type="submit">Submit Form</Button>
 */

export const Button = memo(
	({
		className,
		children,
		variant = undefined,
		onClick,
		stopPropagation = false,
		preventDefault = false,
		fluid = false,
		...props
	}: ButtonProps): JSX.Element => {
		const handleClick = useCallback(
			(event: MouseEvent<HTMLButtonElement>) => {
				if (stopPropagation) {
					event.stopPropagation();
				}

				if (preventDefault) {
					event.preventDefault();
				}

				if (onClick) {
					onClick(event);
				}
			},
			[stopPropagation, preventDefault, onClick],
		);

		return (
			<button
				className={clsx(
					style.button,
					{
						[style.button_primary]: variant === "primary",
						[style.button_primary_alt]: variant === "primary-alt",
						[style.button_primary_white]:
							variant === "primary-white",
						[style.button_primary_black]:
							variant === "primary-black",
						[style.button_secondary]: variant === "secondary",
						[style.button_outline]: variant === "outline",
						[style.button_link]: variant === "link",
					},
					{
						[style.fluid]: fluid,
					},
					className,
				)}
				onClick={handleClick}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";
