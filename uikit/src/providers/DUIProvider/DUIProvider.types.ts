import type { ReactNode } from "react";
import type { TEmptyIconRegistry, TIconRegistry } from "../../components/Icon";

/**
 * Значение, хранящееся в React-контексте `DUIContext`.
 *
 * @template TCustomIcons - Тип реестра кастомных иконок (расширяет `TIconRegistry`)
 */
export interface IDUIContextValue<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	/** Реестр кастомных иконок (ленивые загрузчики) */
	icons: TCustomIcons;
}

/**
 * Свойства компонента `DUIProvider`.
 *
 * @template TCustomIcons - Тип реестра кастомных иконок (расширяет `TIconRegistry`)
 */
export interface IDUIProviderProps<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	/** Дочерние React-элементы, которые получат доступ к контексту */
	children: ReactNode;
	/** Реестр кастомных иконок (опционально, по умолчанию пустой объект) */
	icons?: TCustomIcons;
}
