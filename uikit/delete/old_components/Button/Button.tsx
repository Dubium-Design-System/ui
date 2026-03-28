import {
	memo,
	useCallback,
	type ButtonHTMLAttributes,
	type JSX,
	type ReactNode,
} from "react";
import style from "./Button.module.scss";
import classNames from "classnames";

/**
 * Пропсы компонента `Button`.
 *
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Дополнительный CSS-класс для корневого элемента кнопки.
	 *
	 * @example
	 * ```tsx
	 * <Button className="my-custom-class">Click me</Button>
	 * ```
	 */
	className?: string;

	/**
	 * Контент, отображаемый внутри кнопки.
	 *
	 * @example
	 * ```tsx
	 * <Button>Click me</Button>
	 * ```
	 */
	children: ReactNode;

	/**
	 * Тип кнопки.
	 *
	 * @defaultValue "button"
	 *
	 * @example
	 * ```tsx
	 * <Button type="submit">Submit</Button>
	 * ```
	 */
	type?: "button" | "submit" | "reset";

	/**
	 * ARIA-роль кнопки.
	 *
	 * @defaultValue "button"
	 *
	 * @example
	 * ```tsx
	 * <Button role="menuitem">Menu Item</Button>
	 * ```
	 */
	role?: string;

	/**
	 * Отключено ли состояние кнопки.
	 *
	 * @defaultValue false
	 *
	 * @example
	 * ```tsx
	 * <Button disabled>Disabled Button</Button>
	 * ```
	 */
	disabled?: boolean;

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
}

/**
 * Универсальный компонент кнопки с поддержкой всех стандартных HTML-атрибутов.
 *
 * @component
 *
 * @example
 * ```tsx
 * // Простое использование
 * <Button onClick={() => console.log("Clicked")}>Click me</Button>
 *
 * // С остановкой всплытия
 * <Button stopPropagation onClick={() => console.log("Clicked")}>
 *   Click me (no propagation)
 * </Button>
 *
 * // Отправка формы
 * <Button type="submit">Submit Form</Button>
 * ```
 *
 * @param {ButtonProps} props - Пропсы компонента.
 * @param {string} [props.className] - Дополнительный CSS-класс.
 * @param {ReactNode} props.children - Контент кнопки.
 * @param {"button" | "submit" | "reset"} [props.type="button"] - Тип кнопки.
 * @param {string} [props.role="button"] - ARIA-роль.
 * @param {boolean} [props.disabled=false] - Отключено ли состояние.
 * @param {boolean} [props.stopPropagation=false] - Остановка всплытия клика.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - Обработчик клика.
 * @returns {JSX.Element} Компонент кнопки.
 */
export const Button = memo(
	({
		className,
		children,
		type = "button",
		role = "button",
		onClick,
		stopPropagation = false,
		...props
	}: ButtonProps): JSX.Element => {
		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				if (stopPropagation) {
					event.stopPropagation();
				}
				onClick?.(event);
			},
			[onClick, stopPropagation]
		);

		return (
			<button
				className={classNames(style.button, className)}
				type={type}
				onClick={handleClick}
				role={role}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";
