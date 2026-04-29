/**
 * Реестр встроенных (UIKit) иконок.
 *
 * Каждая иконка описывается как функция-лоадер с динамическим `import()`,
 * что позволяет:
 * - выполнять code-splitting (tree shaking)
 * - загружать иконки по требованию (lazy loading)
 *
 * @example
 * ```ts
 * const defaultIcons = {
 *   Close: () => import("../../icons/CloseIcon"),
 * };
 * ```
 *
 * @remarks
 * - Используется внутри компонента `Icon` как базовый источник иконок
 * - Может быть расширен пользовательскими иконками через `DUIProvider`
 * - Не требует `DUIProvider` для работы
 */
export const defaultIcons = {
	Close: () => import("../../icons/CloseIcon"),
} as const;

/**
 * Объединение имён всех встроенных (UIKit) иконок.
 *
 * Используется для:
 * - типизации пропа `name` в `Icon`
 * - автодополнения (autocomplete) для встроенных иконок
 *
 * @example
 * ```ts
 * type TDefaultIconName = "Close";
 * ```
 */
export type TDefaultIconName = keyof typeof defaultIcons;
