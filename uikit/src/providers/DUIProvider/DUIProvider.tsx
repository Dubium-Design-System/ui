import { useMemo } from "react";
import { DUIContext } from "./DUIProvider.context";
import type { TEmptyIconRegistry, TIconRegistry } from "../../components/Icon";
import type { IDUIProviderProps } from "./DUIProvider.types";

/**
 * Провайдер контекста UI-библиотеки (`DUIProvider`).
 *
 * Обеспечивает передачу реестра кастомных иконок вниз по дереву компонентов,
 * чтобы они могли быть использованы в `Icon` / `AppIcon`.
 *
 * @typeParam TCustomIcons - Тип реестра кастомных иконок (обычно `typeof appIcons`)
 *
 * @param props - Свойства провайдера
 * @param props.children - Дочерние React-элементы
 * @param props.icons - Реестр кастомных иконок (lazy loaders)
 *
 * @returns Провайдер контекста с доступом к иконкам
 *
 * @example
 * ```tsx
 * const appIcons = {
 *   User: () => import("./UserIcon"),
 * } as const;
 *
 * <DUIProvider icons={appIcons}>
 *   <App />
 * </DUIProvider>
 * ```
 *
 * @remarks
 * - Не обязателен для использования встроенных (`defaultIcons`) иконок
 * - Обязателен для работы кастомных иконок
 * - Использует `useMemo` для предотвращения лишних перерисовок
 * - Если `icons` не передан, используется пустой реестр
 */
export const DUIProvider = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>({
	children,
	icons,
}: IDUIProviderProps<TCustomIcons>) => {
	const value = useMemo(
		() => ({
			icons: icons ?? ({} as TCustomIcons),
		}),
		[icons],
	);

	return <DUIContext.Provider value={value}>{children}</DUIContext.Provider>;
};
