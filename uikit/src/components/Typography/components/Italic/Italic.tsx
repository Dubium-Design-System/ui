import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import style from "./Italic.module.scss";

/** Свойства компонента Italic. */
type ItalicProps = ComponentPropsWithoutRef<"em">;

/**
 * Компонент для отображения текста курсивом (семантический `<em>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<em>` с применением стилей из CSS-модуля.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<em>`.
 * @returns React-элемент `<em>`.
 *
 * @example
 * ```tsx
 * <Italic>Курсивный текст</Italic>
 * ```
 */
export const Italic = ({ children, className, ...props }: ItalicProps) => (
  <em className={clsx(style.italic, className)} {...props}>
    {children}
  </em>
);

Italic.displayName = "Typography.Italic";
