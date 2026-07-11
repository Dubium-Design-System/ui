import { transformerNotationDiff } from "@shikijs/transformers";
import clsx from "clsx";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type ShikiTransformer,
} from "shiki";

import style from "./Highlight.module.scss";

/**
 * Свойства внутреннего компонента для отображения HTML.
 *
 * @remarks
 * Используется для вставки сгенерированного Shiki HTML-кода с подсветкой синтаксиса.
 */
interface HighlightHtmlProps {
  /** Дополнительные CSS-классы для контейнера. */
  className?: string;
  /** HTML-строка, сгенерированная Shiki. */
  html: string;
}

/**
 * Внутренний компонент для вставки HTML от Shiki через dangerouslySetInnerHTML.
 *
 * @remarks
 * Это единственная точка вставки произвольного HTML от Shiki.
 * Произвольный пользовательский HTML сюда не передаётся.
 *
 * @param props.html - HTML-строка с подсветкой синтаксиса.
 * @param props.className - Дополнительные CSS-классы.
 * @returns React-элемент с подсвеченным кодом.
 */
const HighlightHtml = ({ html, className }: HighlightHtmlProps) => (
  <div
    className={clsx(style.highlight, className)}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

/**
 * Тема подсветки синтаксиса по умолчанию.
 *
 * @remarks
 * Используется тема "github-dark", если не указана иная через проп `theme`.
 */
const defaultTheme = "github-dark";

/**
 * Трансформеры Shiki по умолчанию.
 *
 * @remarks
 * Включает трансформер `transformerNotationDiff` для поддержки diff-разметки
 * в комментариях кода (например, `// [!code ++]` и `// [!code --]`).
 */
const defaultTransformers: ShikiTransformer[] = [
  transformerNotationDiff({
    matchAlgorithm: "v3",
  }),
];

/**
 * Свойства компонента {@link Highlight} для подсветки синтаксиса кода.
 *
 * @remarks
 * Компонент использует библиотеку Shiki для преобразования кода в HTML с подсветкой синтаксиса.
 * Поддерживает различные языки программирования, темы и трансформеры.
 */
interface HighlightProps {
  /** Исходный код для подсветки в виде строки. */
  children: string;
  /** Дополнительные CSS-классы для контейнера. */
  className?: string;
  /** React-элемент, отображаемый до загрузки подсветки (пока highlighter не готов). */
  fallback?: ReactNode;
  /** Флаг обрезки пробелов в начале и конце кода. По умолчанию `true`. */
  isTrim?: boolean;
  /** Язык программирования для подсветки синтаксиса. */
  language: BundledLanguage;
  /** Тема подсветки. По умолчанию "github-dark". */
  theme?: BundledTheme;
  /** Массив трансформеров Shiki для дополнительной обработки кода (например, выделение diff). */
  transformers?: ShikiTransformer[];
}

/**
 * Промис, создающий экземпляр highlighter Shiki с предустановленными темами и языками.
 *
 * @remarks
 * Highlighter инициализируется асинхронно. Предустановлены тема "github-dark"
 * и языки "typescript", "javascript". Дополнительные темы и языки могут быть
 * загружены динамически.
 */
const highlighterPromise = createHighlighter({
  themes: [defaultTheme],
  langs: ["typescript", "javascript"],
});

/**
 * React-компонент для подсветки синтаксиса кода с использованием Shiki.
 *
 * @remarks
 * Компонент асинхронно загружает highlighter Shiki и преобразует переданный код
 * в HTML с подсветкой синтаксиса. Поддерживает различные языки, темы и трансформеры.
 * Пока highlighter загружается, может отображать fallback-контент.
 *
 * @param props - Свойства компонента.
 * @returns React-элемент с подсвеченным кодом или fallback-контентом.
 *
 * @example
 * ```tsx
 * <Highlight language="typescript" theme="github-dark">
 *   {`const x = 5;`}
 * </Highlight>
 * ```
 */
export const Highlight = ({
  children,
  language,
  theme = defaultTheme,
  transformers = defaultTransformers,
  isTrim = true,
  className,
  fallback,
}: HighlightProps) => {
  const [html, setHtml] = useState("");

  /**
   * Исходный код с опциональной обрезкой пробелов.
   *
   * @remarks
   * Если флаг `isTrim` установлен в `true`, удаляет начальные и конечные пробелы
   * из переданного кода. Мемоизирован для предотвращения лишних пересчётов.
   */
  const code = useMemo(
    () => (isTrim ? children.trim() : children),
    [children, isTrim],
  );

  useEffect(() => {
    let mounted = true;

    /**
     * Асинхронная функция подсветки синтаксиса.
     *
     * @remarks
     * Ожидает инициализации highlighter Shiki, затем преобразует код в HTML
     * с подсветкой синтаксиса для указанного языка, темы и трансформеров.
     * Результат устанавливается в состояние только если компонент всё ещё смонтирован.
     */
    const highlight = async () => {
      const highlighter = await highlighterPromise;

      const result = highlighter.codeToHtml(code, {
        lang: language,
        theme,
        transformers,
      });

      if (mounted) {
        setHtml(result);
      }
    };

    void highlight();

    return () => {
      mounted = false;
    };
  }, [code, language, transformers, theme]);

  if (!html && fallback) {
    return <div>{fallback}</div>;
  }

  return <HighlightHtml className={className} html={html} />;
};
