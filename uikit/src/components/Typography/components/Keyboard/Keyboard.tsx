import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import style from "./Keyboard.module.scss";

/** Свойства компонента Keyboard. */
type KeyboardProps = ComponentPropsWithoutRef<"kbd">;

/**
 * Компонент для имитации клавиш клавиатуры (семантический `<kbd>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<kbd>` с применением стилей из CSS-модуля.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<kbd>`.
 * @returns React-элемент `<kbd>`.
 *
 * @example
 * ```tsx
 * <Keyboard>Ctrl + C</Keyboard>
 * ```
 */
export const Keyboard = ({ children, className, ...props }: KeyboardProps) => (
  <kbd className={clsx(style.keyboard, className)} {...props}>
    {children}
  </kbd>
);

Keyboard.displayName = "Typography.Keyboard";
