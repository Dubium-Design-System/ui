import { createContext, useContext } from "react";
import type { TEmptyIconRegistry, TIconRegistry } from "../../components/Icon";
import type { IDUIContextValue } from "./DUIProvider.types";

/**
 * React-контекст для хранения реестра иконок.
 *
 * Используется компонентами `Icon` / `AppIcon` для получения кастомных иконок,
 * переданных через `DUIProvider`.
 *
 * @remarks
 * - Значение по умолчанию содержит пустой реестр (`icons: {}`)
 * - Без `DUIProvider` будут доступны только встроенные (`defaultIcons`) иконки
 */
export const DUIContext = createContext<IDUIContextValue<TIconRegistry>>({
	icons: {},
});

/**
 * Хук для доступа к `DUIContext` с поддержкой типизации кастомных иконок.
 *
 * @typeParam TCustomIcons - Тип реестра кастомных иконок
 *
 * @returns Значение контекста с типизированным полем `icons`
 *
 * @example
 * ```ts
 * const { icons } = useDUIContext<typeof appIcons>();
 * ```
 *
 * @remarks
 * - Выполняет приведение типа (`type assertion`), так как TypeScript
 *   не может автоматически вывести тип из `DUIProvider`
 * - Используется внутри `Icon` для объединения:
 *   `{ ...defaultIcons, ...icons }`
 */
export const useDUIContext = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>() => {
	return useContext(DUIContext) as IDUIContextValue<TCustomIcons>;
};
