import type { ComponentPropsWithoutRef, ReactNode } from "react";

import clsx from "clsx";

import style from "./Text.module.scss";

/** Базовые свойства текстового компонента. */
interface TextBaseProps {
  /** Содержимое текста. */
  children: ReactNode;
  /**
   * Вариант отображения текста.
   *
   * @default "body"
   */
  variant?: "body" | "bold" | "helper" | "label" | "large" | "small";
}

/** Свойства для рендера текста как параграфа. */
type TextParagraphProps = {
  as?: "p";
} & Omit<ComponentPropsWithoutRef<"p">, "as" | keyof TextBaseProps> &
  TextBaseProps;

/** Свойства для рендера текста как span. */
type TextSpanProps = {
  as: "span";
} & Omit<ComponentPropsWithoutRef<"span">, "as" | keyof TextBaseProps> &
  TextBaseProps;

/** Свойства компонента Text. */
type TextProps = TextParagraphProps | TextSpanProps;

/**
 * Компонент для отображения текста с различными вариантами стилизации.
 *
 * @remarks
 * Поддерживает рендер как `<p>` (по умолчанию) или `<span>`.
 * Варианты: `body`, `bold`, `large`, `small`, `label`, `helper`.
 *
 * @param props - Свойства компонента.
 * @returns React-элемент текста.
 *
 * @example
 * ```tsx
 * <Text variant="bold">Жирный текст</Text>
 * <Text as="span" variant="helper">Вспомогательный текст</Text>
 * ```
 */
export const Text = ({
  as = "p",
  variant = "body",
  children,
  className,
  ...props
}: TextProps) => {
  const Tag = as;

  return (
    <Tag
      className={clsx(
        style.text,
        {
          [style.text__body]: variant === "body",
          [style.text__bold]: variant === "bold",
          [style.text__large]: variant === "large",
          [style.text__small]: variant === "small",
          [style.text__label]: variant === "label",
          [style.text__helper]: variant === "helper",
        },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

Text.displayName = "Typography.Text";
