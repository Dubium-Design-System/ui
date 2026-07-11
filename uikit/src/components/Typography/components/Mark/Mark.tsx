import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import style from "./Mark.module.scss";

/** Свойства компонента Mark. */
type MarkProps = ComponentPropsWithoutRef<"mark">;

/**
 * Компонент для выделения (пометки) текста (семантический `<mark>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<mark>` с применением стилей из CSS-модуля.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<mark>`.
 * @returns React-элемент `<mark>`.
 *
 * @example
 * ```tsx
 * <Mark>Выделенный текст</Mark>
 * ```
 */
export const Mark = ({ children, className, ...props }: MarkProps) => (
  <mark className={clsx(style.mark, className)} {...props}>
    {children}
  </mark>
);

Mark.displayName = "Typography.Mark";
