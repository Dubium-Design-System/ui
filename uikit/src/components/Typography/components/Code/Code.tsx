import type { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import style from "./Code.module.scss";

/** Свойства компонента Code. */
type CodeProps = ComponentPropsWithoutRef<"code">;

/**
 * Компонент для отображения инлайн-кода или фрагментов кода (семантический `<code>`).
 *
 * @remarks
 * Рендерит HTML-элемент `<code>` с применением стилей из CSS-модуля.
 * Подходит как для инлайн-кода, так и для многострочных блоков.
 *
 * @param props - Свойства компонента, включая все стандартные атрибуты `<code>`.
 * @returns React-элемент `<code>`.
 *
 * @example
 * ```tsx
 * <Code>console.log('Hello, world!')</Code>
 * ```
 */
export const Code = ({ children, className, ...props }: CodeProps) => (
  <code className={clsx(style.code, className)} {...props}>
    {children}
  </code>
);

Code.displayName = "Typography.Code";
