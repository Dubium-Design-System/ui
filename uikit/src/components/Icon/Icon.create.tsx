import { Icon, type IconProps } from "./Icon";
import type { TEmptyIconRegistry, TIconRegistry } from "./Icon.types";

/**
 * Создаёт типизированную обёртку над компонентом `Icon`
 * с поддержкой автодополнения (autocomplete) для кастомных иконок.
 *
 * @typeParam TCustomIcons - Реестр кастомных иконок (обычно `typeof appIcons`)
 *
 * @returns Компонент иконки с типобезопасным пропом `name`,
 * включающим как встроенные (`defaultIcons`), так и кастомные иконки.
 *
 * @example
 * ```ts
 * const appIcons = {
 *   User: () => import("./UserIcon"),
 *   Settings: () => import("./SettingsIcon"),
 * } as const;
 *
 * type TAppIcons = typeof appIcons;
 *
 * const AppIcon = createIcon<TAppIcons>();
 * ```
 *
 * ```tsx
 * <DUIProvider icons={appIcons}>
 *   <AppIcon name="User" />     // ✅ autocomplete
 *   <AppIcon name="Close" />    // ✅ из UIKit
 *   <AppIcon name="Wrong" />    // ❌ ошибка TypeScript
 * </DUIProvider>
 * ```
 *
 * @remarks
 * - Требует использования `DUIProvider` для передачи реестра иконок в runtime
 * - Без `DUIProvider` кастомные иконки не будут найдены
 * - Используется для улучшения DX (type safety + autocomplete)
 */
export const createIcon = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>() => {
	const TypedIcon = (props: IconProps<TCustomIcons>) => {
		return <Icon<TCustomIcons> {...props} />;
	};

	TypedIcon.displayName = "TypedIcon";

	return TypedIcon;
};
