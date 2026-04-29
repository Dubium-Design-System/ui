
import type { TIconName, TIcon } from "./Icon.types";

type TIconModule = {
	default: TIcon;
};

export const iconPaths: Record<TIconName, () => Promise<TIconModule>> = {
	Close: () => import("../../icons/CloseIcon"),
};

import { memo, useEffect, useMemo, useState } from "react";
import type { TIconName, TIcon } from "./Icon.types";
import { iconPaths } from "./Icon.paths";

// Кэш загруженных иконок
const iconCache = new Map<TIconName, TIcon>();

/** Свойства компонента иконки */
export interface IconProps {
	/** Имя иконки */
	name: TIconName;
	/** Приоритетный размер (квадратный) */
	size?: number;
	/** Ширина (если нужен прямоугольник) */
	width?: number;
	/** Высота (если нужен прямоугольник) */
	height?: number;
	/** Цвет иконки */
	color?: string;
	/** Угол поворота */
	deg?: number;
	/** Обработчик клика */
	onClick?: VoidFunction;
	/** Атрибут aria-label */
	ariaLabel?: string;
}

/**
 * Компонент иконки, который динамически загружает SVG иконки по имени.
 *
 * @param props - Свойства компонента иконки
 * @param props.name - Имя иконки для отображения
 * @param props.size - Размер иконки в пикселях (по умолчанию 24)
 * @param props.color - Цвет иконки (по умолчанию "currentColor")
 * @param props.deg - Угол поворота иконки в градусах (по умолчанию 0)
 * @param props.onClick - Обработчик клика по иконке
 *
 * @example
 * <Icon name="Arrow" size={32} color="blue" deg={90} />
 *
 * @returns React-элемент иконки
 */
export const Icon = memo(
	({
		name,
		size = 24,
		width: propWidth,
		height: propHeight,
		color = "currentColor",
		deg = 0,
		onClick: handleOnClick,
		ariaLabel,
	}: IconProps) => {
		const [IconComponent, setIconComponent] = useState<TIcon | null>(
			() => iconCache.get(name) || null,
		);

		const [isLoading, setIsLoading] = useState<boolean>(false);

		// Вычисляем итоговые ширину и высоту
		const computedWidth = propWidth ?? size;
		const computedHeight = propHeight ?? size;

		// Мемоизация стилей для предотвращения перерисовок
		const containerStyle = useMemo(
			() => ({
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: computedWidth,
				height: computedHeight,
				transform: rotate(${deg}deg),
			}),
			[computedWidth, computedHeight, deg],
		);

		// Единый эффект для загрузки иконки при изменении имени
		useEffect(() => {
			let ignore = false;

			const loadIcon = async () => {
				// Если уже есть в кэше — сразу используем
				if (iconCache.has(name)) {
					if (!ignore) {
						setIconComponent(iconCache.get(name) as TIcon);
					}
					return;
				}

				// Проверяем, существует ли такая иконка
				if (!iconPaths[name]) {
					console.warn(Иконка "${name}" не найдена);
					if (!ignore) {
						setIconComponent(null);
					}
					return;
				}

				// Начинаем загрузку
				setIsLoading(true);
				try {
					const importFn = iconPaths[name];
					const module = await importFn();
					const Component = module.default;
					if (Component) {
						iconCache.set(name, Component);
						if (!ignore) {
							setIconComponent(Component);
						}
					}
				} catch (error) {
					console.error(Ошибка загрузки иконки "${name}":, error);
					if (!ignore) {
						setIconComponent(null);
					}
				} finally {
					if (!ignore) {
						setIsLoading(false);
					}
				}
			};

			loadIcon();

			return () => {
				ignore = true;
			};
		}, [name]);

		// Состояние загрузки: скрываем от скринридера, но сохраняем размеры
		if (isLoading || !IconComponent) {
			return (
				<div
					style={{ ...containerStyle, visibility: "hidden" }}
					role="img"
					aria-hidden="true"
				/>
			);
		}

		return (
			<div
				style={containerStyle}
				onClick={handleOnClick}
				role="img"
				aria-label={ariaLabel || name}
			>
				{IconComponent ? <IconComponent color={color} /> : null}
			</div>
		);
	},
);

Icon.displayName = "Icon";

import type { ComponentType, SVGProps } from "react";

/** Свойства SVG-иконки */
export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
	color?: string;
}

/** Тип React-компонента иконки */
export type TIcon = ComponentType<IIconComponentProps>;

/** Имена доступных иконок */
export type TIconName = "Close";

import type { IIconComponentProps } from "../components/Icon/Icon.types";

const CloseIcon = ({ color = "currentColor" }: IIconComponentProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
				fill={color}
			/>
		</svg>
	);
};

export default CloseIcon;


Вот это будет в uikit код

Но я задумался, а что если разработчикам нужны будут свои иконки и придется им копировать код компонента, чтобы наполнить своими иконками и будто бы это избыточно, можно ли в рамках текущего решения добавить возможность, чтобы разработчик мог добавлять свои реакт компоненты с иконками?

Думал на протяжении пары секунд
Да. Лучше разделить рендер Icon и источник иконок. Тогда UIKit поставляет базовые иконки, а приложение может расширить реестр своими React-компонентами.

Вариант 1 — через icons prop
Самый простой и гибкий вариант.

Типы
import type { ComponentType, SVGProps } from "react";

export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export type TIcon = ComponentType<IIconComponentProps>;

export type TIconRegistry<TName extends string = string> = Record<TName, TIcon>;
UIKit-иконки
import CloseIcon from "../../icons/CloseIcon";
import type { TIconRegistry } from "./Icon.types";

export const defaultIcons = {
  Close: CloseIcon,
} satisfies TIconRegistry;

export type TDefaultIconName = keyof typeof defaultIcons;
Компонент
import { memo, useMemo } from "react";
import type { TIcon, TIconRegistry } from "./Icon.types";
import { defaultIcons } from "./Icon.registry";

export interface IconProps<TName extends string = string> {
  name: TName;
  icons?: TIconRegistry<TName>;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}

export const Icon = memo(
  <TName extends string>({
    name,
    icons,
    size = 24,
    width: propWidth,
    height: propHeight,
    color = "currentColor",
    deg = 0,
    onClick,
    ariaLabel,
  }: IconProps<TName>) => {
    const registry = {
      ...defaultIcons,
      ...icons,
    } as Record<string, TIcon>;

    const IconComponent = registry[name];

    const computedWidth = propWidth ?? size;
    const computedHeight = propHeight ?? size;

    const containerStyle = useMemo(
      () => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: computedWidth,
        height: computedHeight,
        transform: `rotate(${deg}deg)`,
      }),
      [computedWidth, computedHeight, deg],
    );

    if (!IconComponent) {
      console.warn(`Иконка "${name}" не найдена`);

      return (
        <div
          style={{ ...containerStyle, visibility: "hidden" }}
          role="img"
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        style={containerStyle}
        onClick={onClick}
        role="img"
        aria-label={ariaLabel || name}
      >
        <IconComponent color={color} />
      </div>
    );
  },
);

Icon.displayName = "Icon";
Использование в приложении
import { Icon } from "@your/uikit";
import MyIcon from "./icons/MyIcon";

const appIcons = {
  MyIcon,
};

<Icon name="MyIcon" icons={appIcons} />;
Минус: icons придется прокидывать каждый раз.

Вариант 2 — через IconProvider
Более удобный вариант для UIKit.

import {
  createContext,
  memo,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { TIcon, TIconRegistry } from "./Icon.types";
import { defaultIcons } from "./Icon.registry";

const IconRegistryContext = createContext<TIconRegistry>({});

export interface IconProviderProps {
  icons: TIconRegistry;
  children: ReactNode;
}

export const IconProvider = ({ icons, children }: IconProviderProps) => {
  return (
    <IconRegistryContext.Provider value={icons}>
      {children}
    </IconRegistryContext.Provider>
  );
};

export interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}

export const Icon = memo(
  ({
    name,
    size = 24,
    width: propWidth,
    height: propHeight,
    color = "currentColor",
    deg = 0,
    onClick,
    ariaLabel,
  }: IconProps) => {
    const customIcons = useContext(IconRegistryContext);

    const registry = useMemo(
      () => ({
        ...defaultIcons,
        ...customIcons,
      }),
      [customIcons],
    );

    const IconComponent = registry[name];

    const computedWidth = propWidth ?? size;
    const computedHeight = propHeight ?? size;

    const containerStyle = useMemo(
      () => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: computedWidth,
        height: computedHeight,
        transform: `rotate(${deg}deg)`,
      }),
      [computedWidth, computedHeight, deg],
    );

    if (!IconComponent) {
      console.warn(`Иконка "${name}" не найдена`);

      return (
        <div
          style={{ ...containerStyle, visibility: "hidden" }}
          role="img"
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        style={containerStyle}
        onClick={onClick}
        role="img"
        aria-label={ariaLabel || name}
      >
        <IconComponent color={color} />
      </div>
    );
  },
);

Icon.displayName = "Icon";
Использование
import { IconProvider } from "@your/uikit";
import UserIcon from "./icons/UserIcon";
import SettingsIcon from "./icons/SettingsIcon";

const customIcons = {
  User: UserIcon,
  Settings: SettingsIcon,
};

export const App = () => {
  return (
    <IconProvider icons={customIcons}>
      <Icon name="User" />
      <Icon name="Settings" />
      <Icon name="Close" />
    </IconProvider>
  );
};
Что я бы выбрал
Для UIKit лучше IconProvider + default icons.

Текущее решение с dynamic import хорошо для внутренних UIKit-иконок, но плохо расширяется пользователем. Если нужна поддержка пользовательских иконок, лучше сделать так:

<IconProvider icons={customIcons}>
  <Icon name="CustomIcon" />
</IconProvider>
А dynamic import оставить только как отдельный внутренний механизм, если нужно lazy-load для встроенных иконок. Для пользовательских React-компонентов registry-подход проще, прозрачнее и не заставляет копировать компонент.


А если я решу делать 1 провайдер на весь проект?
Типа DUIProvider

Да, это нормальный вариант. Для UIKit даже лучше сделать единый DUIProvider, а IconProvider оставить внутренней частью.

Пример API
<DUIProvider
  icons={{
    User: UserIcon,
    Settings: SettingsIcon,
  }}
>
  <App />
</DUIProvider>
Структура
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { TIconRegistry } from "./Icon/Icon.types";

interface DUIContextValue {
  icons: TIconRegistry;
}

const DUIContext = createContext<DUIContextValue>({
  icons: {},
});

interface DUIProviderProps {
  children: ReactNode;
  icons?: TIconRegistry;
}

export const DUIProvider = ({ children, icons = {} }: DUIProviderProps) => {
  const value = useMemo(
    () => ({
      icons,
    }),
    [icons],
  );

  return <DUIContext.Provider value={value}>{children}</DUIContext.Provider>;
};

export const useDUIContext = () => useContext(DUIContext);
Icon внутри UIKit
import { memo, useMemo } from "react";
import { useDUIContext } from "../DUIProvider";
import { defaultIcons } from "./Icon.registry";
import type { TIcon } from "./Icon.types";

export const Icon = memo(({ name, ...props }: IconProps) => {
  const { icons } = useDUIContext();

  const registry = useMemo(
    () => ({
      ...defaultIcons,
      ...icons,
    }),
    [icons],
  );

  const IconComponent = registry[name];

  // дальше обычный render
});
Важный момент
Лучше не давать пользователю мутировать глобальный реестр через методы типа:

DUIProvider.registerIcon(...)
Это хуже для React, SSR и тестов. Лучше декларативно:

<DUIProvider icons={icons}>
  <App />
</DUIProvider>
Итог
DUIProvider — хороший подход, если в будущем ты хочешь прокидывать не только иконки, но и:

theme
locale
icons
zIndex
portalContainer
componentDefaults
То есть:

<DUIProvider
  theme={theme}
  icons={icons}
  locale="ru"
>
  <App />
</DUIProvider>
Для твоего случая я бы делал именно так.


Добавь указавание названий файлов, чтобы представление было по структуре

Ниже — пример структуры файлов для варианта с единым DUIProvider и встроенной поддержкой кастомных иконок.

📁 Структура
uikit/
  providers/
    DUIProvider/
      DUIProvider.tsx
      DUIProvider.types.ts
      DUIProvider.context.ts

  components/
    Icon/
      Icon.tsx
      Icon.types.ts
      Icon.registry.ts

  icons/
    CloseIcon.tsx
📄 providers/DUIProvider/DUIProvider.types.ts
import type { ReactNode } from "react";
import type { TIconRegistry } from "../../components/Icon/Icon.types";

export interface IDUIProviderProps {
  children: ReactNode;
  icons?: TIconRegistry;
}

export interface IDUIContextValue {
  icons: TIconRegistry;
}
📄 providers/DUIProvider/DUIProvider.context.ts
import { createContext, useContext } from "react";
import type { IDUIContextValue } from "./DUIProvider.types";

export const DUIContext = createContext<IDUIContextValue>({
  icons: {},
});

export const useDUIContext = () => useContext(DUIContext);
📄 providers/DUIProvider/DUIProvider.tsx
import { useMemo } from "react";
import { DUIContext } from "./DUIProvider.context";
import type { IDUIProviderProps } from "./DUIProvider.types";

export const DUIProvider = ({ children, icons = {} }: IDUIProviderProps) => {
  const value = useMemo(
    () => ({
      icons,
    }),
    [icons],
  );

  return <DUIContext.Provider value={value}>{children}</DUIContext.Provider>;
};
📄 components/Icon/Icon.types.ts
import type { ComponentType, SVGProps } from "react";

export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export type TIcon = ComponentType<IIconComponentProps>;

export type TIconRegistry = Record<string, TIcon>;
📄 components/Icon/Icon.registry.ts
import CloseIcon from "../../icons/CloseIcon";
import type { TIconRegistry } from "./Icon.types";

export const defaultIcons: TIconRegistry = {
  Close: CloseIcon,
};
📄 components/Icon/Icon.tsx
import { memo, useMemo } from "react";
import { useDUIContext } from "../../providers/DUIProvider/DUIProvider.context";
import { defaultIcons } from "./Icon.registry";
import type { TIcon } from "./Icon.types";

export interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}

export const Icon = memo(
  ({
    name,
    size = 24,
    width: propWidth,
    height: propHeight,
    color = "currentColor",
    deg = 0,
    onClick,
    ariaLabel,
  }: IconProps) => {
    const { icons } = useDUIContext();

    const registry = useMemo(
      () => ({
        ...defaultIcons,
        ...icons,
      }),
      [icons],
    );

    const IconComponent = registry[name] as TIcon | undefined;

    const computedWidth = propWidth ?? size;
    const computedHeight = propHeight ?? size;

    const containerStyle = useMemo(
      () => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: computedWidth,
        height: computedHeight,
        transform: `rotate(${deg}deg)`,
      }),
      [computedWidth, computedHeight, deg],
    );

    if (!IconComponent) {
      console.warn(`Иконка "${name}" не найдена`);

      return (
        <div
          style={{ ...containerStyle, visibility: "hidden" }}
          role="img"
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        style={containerStyle}
        onClick={onClick}
        role="img"
        aria-label={ariaLabel || name}
      >
        <IconComponent color={color} />
      </div>
    );
  },
);

Icon.displayName = "Icon";
📄 icons/CloseIcon.tsx
import type { IIconComponentProps } from "../components/Icon/Icon.types";

const CloseIcon = ({ color = "currentColor" }: IIconComponentProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
📄 Использование в приложении
import { DUIProvider } from "@your/uikit";
import UserIcon from "./icons/UserIcon";
import SettingsIcon from "./icons/SettingsIcon";

const icons = {
  User: UserIcon,
  Settings: SettingsIcon,
};

export const App = () => {
  return (
    <DUIProvider icons={icons}>
      <Icon name="User" />
      <Icon name="Settings" />
      <Icon name="Close" /> {/* из UIKit */}
    </DUIProvider>
  );
};
Ключевые свойства архитектуры
UIKit иконки работают из коробки (defaultIcons)

Пользовательские иконки расширяют реестр через DUIProvider

Нет дублирования Icon компонента

Нет глобального мутабельного состояния

Расширяемо (theme, locale и т.д. добавляются туда же)

При желании
Можно объединить registry без useMemo, если иконки статичны:

const registry = { ...defaultIcons, ...icons };
Но текущий вариант безопаснее при динамических пропсах.


const defaultIcons: {
    [x: string]: TIcon;
}
export interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}
То есть мы теряем подсказки?

То есть если разработчик не знает какие есть иконки, то получается он идет методом тыка и будет опечатываться?

Да — в текущем виде ты теряешь autocomplete и type safety для name, потому что:

name: string
и

Record<string, TIcon>
размывают тип до произвольной строки.

Это нормальная цена за расширяемость, но её можно убрать.

✔️ Цель
Сохранить одновременно:

автокомплит для UIKit-иконок

возможность добавлять кастомные

type safety

🧠 Решение: дженерики + объединение типов
1. Тип дефолтных иконок
📄 Icon.registry.ts
import CloseIcon from "../../icons/CloseIcon";

export const defaultIcons = {
  Close: CloseIcon,
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;
2. Обновляем IconProps
export interface IconProps<TName extends string = TDefaultIconName> {
  name: TName;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}
3. Типизируем DUIProvider
export interface IDUIProviderProps<TIcons extends TIconRegistry = {}> {
  children: ReactNode;
  icons?: TIcons;
}
4. Прокидываем тип через контекст
export interface IDUIContextValue<TIcons extends TIconRegistry = {}> {
  icons: TIcons;
}
5. Типизация Icon
export const Icon = memo(
  <TCustomIcons extends TIconRegistry = {}>({
    name,
    ...props
  }: IconProps<
    keyof TCustomIcons | TDefaultIconName
  >) => {
    const { icons } = useDUIContext() as IDUIContextValue<TCustomIcons>;

    const registry = {
      ...defaultIcons,
      ...icons,
    };

    const IconComponent = registry[name];
🧪 Результат
👉 В приложении
const icons = {
  User: UserIcon,
  Settings: SettingsIcon,
};
<DUIProvider icons={icons}>
  <Icon name="User" />      // ✅ autocomplete
  <Icon name="Settings" />  // ✅
  <Icon name="Close" />     // ✅ из UIKit

  <Icon name="Usr" />       // ❌ ошибка
</DUIProvider>
⚠️ Ограничение (важно)
TypeScript не умеет автоматически “поднимать” тип из Provider вниз в компоненты, если ты не помогаешь ему.

То есть это НЕ сработает идеально без явной типизации:

<DUIProvider icons={icons}>
  <Icon name="User" /> // ❌ может быть string без подсказок
</DUIProvider>
💡 Практическое решение (лучшее)
Вариант 1 — типизировать icons заранее
const icons = {
  User: UserIcon,
  Settings: SettingsIcon,
} as const;

type AppIcons = typeof icons;
Вариант 2 — сделать обертку
export const createIcon = <TIcons extends TIconRegistry>() => {
  return (props: IconProps<keyof TIcons | TDefaultIconName>) => {
    return <Icon {...props} />;
  };
};
Использование:

const AppIcon = createIcon<typeof icons>();

<AppIcon name="User" />     // ✅
<AppIcon name="Close" />    // ✅
<AppIcon name="Wrong" />    // ❌
🧾 Альтернатива (проще, но менее гибко)
Если хочешь максимум DX без магии:

export type TIconName =
  | "Close"
  | "User"
  | "Settings";
Но тогда:

❌ нет расширяемости из коробки

❌ нужно руками поддерживать union

🧠 Вывод
Ты сейчас на классическом компромиссе:

Подход	DX	Гибкость
string	❌	✅
union	✅	❌
generics	✅	✅ (но сложнее)
✔️ Рекомендация
Для UIKit:

оставить DUIProvider

добавить generics (как выше)

при желании дать helper createIcon

Это даст:

автокомплит

расширяемость

отсутствие копипасты компонента

Если хочешь — могу показать более "production-grade" вариант с module augmentation (как у MUI), там вообще идеальный DX без дженериков в коде компонентов.


напиши весь код
используем для dx и гибкости подход generics

Думал на протяжении пары секунд
Ниже полный вариант с generics: DUIProvider + Icon + типизированный helper createIcon.

uikit/
  providers/
    DUIProvider/
      DUIProvider.tsx
      DUIProvider.types.ts
      DUIProvider.context.ts
      index.ts

  components/
    Icon/
      Icon.tsx
      Icon.types.ts
      Icon.registry.ts
      Icon.create.tsx
      index.ts

  icons/
    CloseIcon.tsx

  index.ts
components/Icon/Icon.types.ts
import type { ComponentType, SVGProps } from "react";
import type { TDefaultIconName } from "./Icon.registry";

export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export type TIcon = ComponentType<IIconComponentProps>;

export type TIconRegistry = Record<string, TIcon>;

export type TIconName<TCustomIcons extends TIconRegistry = {}> =
  | TDefaultIconName
  | Extract<keyof TCustomIcons, string>;

export interface IconProps<TCustomIcons extends TIconRegistry = {}> {
  name: TIconName<TCustomIcons>;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}
components/Icon/Icon.registry.ts
import CloseIcon from "../../icons/CloseIcon";

export const defaultIcons = {
  Close: CloseIcon,
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;
providers/DUIProvider/DUIProvider.types.ts
import type { ReactNode } from "react";
import type { TIconRegistry } from "../../components/Icon/Icon.types";

export interface IDUIProviderProps<TCustomIcons extends TIconRegistry = {}> {
  children: ReactNode;
  icons?: TCustomIcons;
}

export interface IDUIContextValue<TCustomIcons extends TIconRegistry = {}> {
  icons: TCustomIcons;
}
providers/DUIProvider/DUIProvider.context.ts
import { createContext, useContext } from "react";
import type { IDUIContextValue } from "./DUIProvider.types";
import type { TIconRegistry } from "../../components/Icon/Icon.types";

export const DUIContext = createContext<IDUIContextValue<TIconRegistry>>({
  icons: {},
});

export const useDUIContext = <
  TCustomIcons extends TIconRegistry = {},
>() => {
  return useContext(DUIContext) as IDUIContextValue<TCustomIcons>;
};
providers/DUIProvider/DUIProvider.tsx
import { useMemo } from "react";
import { DUIContext } from "./DUIProvider.context";
import type { IDUIProviderProps } from "./DUIProvider.types";
import type { TIconRegistry } from "../../components/Icon/Icon.types";

export const DUIProvider = <TCustomIcons extends TIconRegistry = {}>({
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
components/Icon/Icon.tsx
import { memo, useMemo } from "react";
import { useDUIContext } from "../../providers/DUIProvider/DUIProvider.context";
import { defaultIcons } from "./Icon.registry";
import type { IconProps, TIconRegistry } from "./Icon.types";

const IconComponentBase = <TCustomIcons extends TIconRegistry = {}>({
  name,
  size = 24,
  width: propWidth,
  height: propHeight,
  color = "currentColor",
  deg = 0,
  onClick,
  ariaLabel,
}: IconProps<TCustomIcons>) => {
  const { icons } = useDUIContext<TCustomIcons>();

  const registry = useMemo(
    () => ({
      ...defaultIcons,
      ...icons,
    }),
    [icons],
  );

  const IconComponent = registry[name];

  const computedWidth = propWidth ?? size;
  const computedHeight = propHeight ?? size;

  const containerStyle = useMemo(
    () => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: computedWidth,
      height: computedHeight,
      transform: `rotate(${deg}deg)`,
    }),
    [computedWidth, computedHeight, deg],
  );

  if (!IconComponent) {
    console.warn(`Иконка "${name}" не найдена`);

    return (
      <div
        style={{ ...containerStyle, visibility: "hidden" }}
        role="img"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      role="img"
      aria-label={ariaLabel || name}
    >
      <IconComponent color={color} />
    </div>
  );
};

export const Icon = memo(IconComponentBase) as typeof IconComponentBase;

Icon.displayName = "Icon";
components/Icon/Icon.create.tsx
import { Icon } from "./Icon";
import type { IconProps, TIconRegistry } from "./Icon.types";

export const createIcon = <TCustomIcons extends TIconRegistry>() => {
  const TypedIcon = (props: IconProps<TCustomIcons>) => {
    return <Icon<TCustomIcons> {...props} />;
  };

  TypedIcon.displayName = "TypedIcon";

  return TypedIcon;
};
icons/CloseIcon.tsx
import type { IIconComponentProps } from "../components/Icon/Icon.types";

const CloseIcon = ({ color = "currentColor", ...props }: IIconComponentProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
providers/DUIProvider/index.ts
export { DUIProvider } from "./DUIProvider";
export { useDUIContext } from "./DUIProvider.context";

export type {
  IDUIProviderProps,
  IDUIContextValue,
} from "./DUIProvider.types";
components/Icon/index.ts
export { Icon } from "./Icon";
export { createIcon } from "./Icon.create";
export { defaultIcons } from "./Icon.registry";

export type {
  IIconComponentProps,
  TIcon,
  TIconRegistry,
  TIconName,
  IconProps,
} from "./Icon.types";
index.ts
export * from "./providers/DUIProvider";
export * from "./components/Icon";
Использование в приложении
app/icons/UserIcon.tsx
import type { IIconComponentProps } from "@your/uikit";

export const UserIcon = ({
  color = "currentColor",
  ...props
}: IIconComponentProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill={color}
      />
      <path
        d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4Z"
        fill={color}
      />
    </svg>
  );
};
app/icons/index.ts
import { UserIcon } from "./UserIcon";

export const appIcons = {
  User: UserIcon,
} as const;

export type TAppIcons = typeof appIcons;
app/AppIcon.ts
import { createIcon } from "@your/uikit";
import type { TAppIcons } from "./icons";

export const AppIcon = createIcon<TAppIcons>();
app/App.tsx
import { DUIProvider } from "@your/uikit";
import { appIcons } from "./icons";
import { AppIcon } from "./AppIcon";

export const App = () => {
  return (
    <DUIProvider icons={appIcons}>
      <AppIcon name="Close" />
      <AppIcon name="User" />

      {/* Ошибка TypeScript */}
      {/* <AppIcon name="Wrong" /> */}
    </DUIProvider>
  );
};
Такой подход сохраняет:

Close из UIKit

User из приложения

autocomplete по name

ошибку при опечатке

расширяемость через DUIProvider


А где мы будем кэшировать?

В этом варианте кэш больше не нужен, потому что мы ушли от:

() => import("../../icons/CloseIcon")
к прямому registry:

const icons = {
  Close: CloseIcon,
  User: UserIcon,
};
React-компоненты уже импортированы и лежат в объекте. Нечего асинхронно загружать и кэшировать.

Где был нужен кэш
Кэш нужен только при dynamic import:

const iconCache = new Map<TIconName, TIcon>();
Чтобы не импортировать одну и ту же иконку повторно.

В текущей архитектуре
<DUIProvider icons={appIcons}>
  <AppIcon name="User" />
</DUIProvider>
иконки уже переданы как готовые компоненты:

export const appIcons = {
  User: UserIcon,
} as const;
Поэтому кэширование происходит фактически на уровне:

ES Modules — модуль импортируется один раз

React — компонент просто переиспользуется

useMemo — registry не пересоздается без изменения icons

Если хочешь оставить lazy-load
Тогда registry должен поддерживать два типа:

type TIconRegistry = Record<string, TIcon | (() => Promise<{ default: TIcon }>)>;
И тогда кэш нужен внутри Icon.tsx:

const iconCache = new Map<string, TIcon>();
Но я бы не смешивал два подхода без необходимости.

Рекомендация
Для UIKit лучше:

обычные React-компоненты через DUIProvider — для пользовательских иконок

без кэша

без async state

проще, типобезопаснее, лучше DX

Lazy-loading и кэш имеет смысл только если у тебя сотни встроенных иконок и ты не хочешь тянуть их в бандл сразу.


А мне нужно import, я делаю tree shaking + cahce icon

Тогда делай lazy registry: UIKit-иконки и пользовательские иконки передаются как import()-лоадеры, а Icon кэширует уже загруженный компонент.

// Icon.types.ts
import type { ComponentType, SVGProps } from "react";
import type { TDefaultIconName } from "./Icon.registry";

export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export type TIcon = ComponentType<IIconComponentProps>;

export type TIconModule = {
  default: TIcon;
};

export type TIconLoader = () => Promise<TIconModule>;

export type TIconRegistry = Record<string, TIconLoader>;

export type TIconName<TCustomIcons extends TIconRegistry = {}> =
  | TDefaultIconName
  | Extract<keyof TCustomIcons, string>;

export interface IconProps<TCustomIcons extends TIconRegistry = {}> {
  name: TIconName<TCustomIcons>;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  deg?: number;
  onClick?: VoidFunction;
  ariaLabel?: string;
}
// Icon.registry.ts
export const defaultIcons = {
  Close: () => import("../../icons/CloseIcon"),
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;
// DUIProvider.types.ts
import type { ReactNode } from "react";
import type { TIconRegistry } from "../../components/Icon/Icon.types";

export interface IDUIProviderProps<TCustomIcons extends TIconRegistry = {}> {
  children: ReactNode;
  icons?: TCustomIcons;
}

export interface IDUIContextValue<TCustomIcons extends TIconRegistry = {}> {
  icons: TCustomIcons;
}
// DUIProvider.context.ts
import { createContext, useContext } from "react";
import type { TIconRegistry } from "../../components/Icon/Icon.types";
import type { IDUIContextValue } from "./DUIProvider.types";

export const DUIContext = createContext<IDUIContextValue<TIconRegistry>>({
  icons: {},
});

export const useDUIContext = <TCustomIcons extends TIconRegistry = {}>() => {
  return useContext(DUIContext) as IDUIContextValue<TCustomIcons>;
};
// DUIProvider.tsx
import { useMemo } from "react";
import { DUIContext } from "./DUIProvider.context";
import type { TIconRegistry } from "../../components/Icon/Icon.types";
import type { IDUIProviderProps } from "./DUIProvider.types";

export const DUIProvider = <TCustomIcons extends TIconRegistry = {}>({
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
// Icon.tsx
import { memo, useEffect, useMemo, useState } from "react";
import { useDUIContext } from "../../providers/DUIProvider/DUIProvider.context";
import { defaultIcons } from "./Icon.registry";
import type { IconProps, TIcon, TIconRegistry } from "./Icon.types";

const iconCache = new Map<string, TIcon>();

const IconBase = <TCustomIcons extends TIconRegistry = {}>({
  name,
  size = 24,
  width: propWidth,
  height: propHeight,
  color = "currentColor",
  deg = 0,
  onClick,
  ariaLabel,
}: IconProps<TCustomIcons>) => {
  const { icons } = useDUIContext<TCustomIcons>();

  const registry = useMemo(
    () => ({
      ...defaultIcons,
      ...icons,
    }),
    [icons],
  );

  const [IconComponent, setIconComponent] = useState<TIcon | null>(() => {
    return iconCache.get(name) ?? null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const computedWidth = propWidth ?? size;
  const computedHeight = propHeight ?? size;

  const containerStyle = useMemo(
    () => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: computedWidth,
      height: computedHeight,
      transform: `rotate(${deg}deg)`,
    }),
    [computedWidth, computedHeight, deg],
  );

  useEffect(() => {
    let ignore = false;

    const cacheKey = String(name);
    const cachedIcon = iconCache.get(cacheKey);

    if (cachedIcon) {
      setIconComponent(cachedIcon);
      return;
    }

    const importIcon = registry[name];

    if (!importIcon) {
      console.warn(`Иконка "${cacheKey}" не найдена`);
      setIconComponent(null);
      return;
    }

    setIsLoading(true);
    setIconComponent(null);

    importIcon()
      .then((module) => {
        if (ignore) return;

        const Component = module.default;

        iconCache.set(cacheKey, Component);
        setIconComponent(Component);
      })
      .catch((error) => {
        if (ignore) return;

        console.error(`Ошибка загрузки иконки "${cacheKey}":`, error);
        setIconComponent(null);
      })
      .finally(() => {
        if (ignore) return;

        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [name, registry]);

  if (isLoading || !IconComponent) {
    return (
      <div
        style={{ ...containerStyle, visibility: "hidden" }}
        role="img"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      role="img"
      aria-label={ariaLabel || String(name)}
    >
      <IconComponent color={color} />
    </div>
  );
};

export const Icon = memo(IconBase) as typeof IconBase;

Icon.displayName = "Icon";
// Icon.create.tsx
import { Icon } from "./Icon";
import type { IconProps, TIconRegistry } from "./Icon.types";

export const createIcon = <TCustomIcons extends TIconRegistry>() => {
  const TypedIcon = (props: IconProps<TCustomIcons>) => {
    return <Icon<TCustomIcons> {...props} />;
  };

  TypedIcon.displayName = "TypedIcon";

  return TypedIcon;
};
Использование в приложении
// app/icons/index.ts
export const appIcons = {
  User: () => import("./UserIcon"),
  Settings: () => import("./SettingsIcon"),
} as const;

export type TAppIcons = typeof appIcons;
// app/AppIcon.ts
import { createIcon } from "@your/uikit";
import type { TAppIcons } from "./icons";

export const AppIcon = createIcon<TAppIcons>();
// app/App.tsx
import { DUIProvider } from "@your/uikit";
import { appIcons } from "./icons";
import { AppIcon } from "./AppIcon";

export const App = () => {
  return (
    <DUIProvider icons={appIcons}>
      <AppIcon name="Close" />
      <AppIcon name="User" />
      <AppIcon name="Settings" />

      {/* TS error */}
      {/* <AppIcon name="Wrong" /> */}
    </DUIProvider>
  );
};
Важная правка для кэша
Лучше кэшировать не только загруженные компоненты, но и pending imports, чтобы при одновременном рендере нескольких одинаковых иконок не было нескольких одинаковых import():

const iconCache = new Map<string, TIcon>();
const iconPromiseCache = new Map<string, Promise<TIcon>>();
Если нужно — следующим сообщением дам версию Icon.tsx с promiseCache, она будет более production-ready.


src/components/Icon/index.ts - как будет выглядеть?
очень коротко

export { Icon } from "./Icon";
export { createIcon } from "./Icon.create";

export type {
  IIconComponentProps,
  TIcon,
  TIconLoader,
  TIconRegistry,
  TIconName,
  IconProps,
} from "./Icon.types";

src/providers/DUIProvider/index.ts - что запишем?

export { DUIProvider } from "./DUIProvider";
export { useDUIContext } from "./DUIProvider.context";

export type {
  IDUIProviderProps,
  IDUIContextValue,
} from "./DUIProvider.types";


Вставленный текст(20).txt
Документ


import type { IIconComponentProps } from "../components/Icon";

const CloseIcon = ({ color }: IIconComponentProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
				fill={color}
			/>
		</svg>
	);
};

export default CloseIcon;

У тебя две разные проблемы — они не связаны напрямую, но вылезают вместе.

❗ 1. Иконка "" не найдена
Из логов:

Иконка "" не найдена
Это значит:

<Icon name={""} />
или name приходит undefined/null.

✔️ Фикс
Добавь guard в Icon.tsx:

if (!name) {
  console.warn("Icon: name is empty");
  return null;
}
❗ 2. Критическая ошибка
Cannot destructure property 'color' of 'object null' as it is null
Это происходит здесь:

const CloseIcon = ({ color }: IIconComponentProps) => {
👉 React вызывает компонент с props = null, что вообще не должно происходить, значит проблема выше.

📍 Реальная причина
Судя по стеку:

at IconComponentBase (Icon.tsx:65:44)
at useState
👉 ты положил React-компонент в useState как значение, а React думает, что это lazy initializer.

Типичная ошибка:

const [IconComponent, setIconComponent] = useState<TIcon | null>(Component);
React интерпретирует Component как:

() => initialState
и вызывает его → передаёт null → 💥

✔️ Правильный фикс
❌ Было (ломает всё)
setIconComponent(Component);
или

useState(Component);
✅ Нужно обернуть
setIconComponent(() => Component);
и

const [IconComponent, setIconComponent] = useState<TIcon | null>(
  () => iconCache.get(name) ?? null
);
⚠️ Почему это важно
React делает:

if (typeof initialState === "function") {
  return initialState(); // ← вызывает компонент как функцию
}
✔️ Финальная правка (ключевая)
В Icon.tsx
.then((module) => {
  if (ignore) return;

  const Component = module.default;

  iconCache.set(cacheKey, Component);

  // 🔥 ВАЖНО
  setIconComponent(() => Component);
});
✔️ Дополнительно (рекомендую)
Сделай дефолт для color:

const CloseIcon = ({ color = "currentColor" }: IIconComponentProps) => {
🧾 Итог
У тебя 2 бага:

Проблема	Причина	Решение
"" не найдена	пустой name	guard
color of null	React вызвал компонент как функцию	setState(() => Component)
Если хочешь — могу дать версию Icon.tsx с:

promise cache

защитой от double import

без лишних ререндеров


не хотелось бы добавлять во всех такую запись const CloseIcon = ({ color = "currentColor" }: IIconComponentProps) => {

Проблема не в CloseIcon. Он падает, потому что ты передаёшь в React не компонент, а результат его вызова / null, и в итоге он вызывается с props = null.

Cannot destructure property 'color' of 'object null'
Это симптом, не причина.

✔️ Правильное решение (без дефолтов в каждой иконке)
1. Гарантируй, что в иконку всегда передаются props
В Icon.tsx:

<IconComponent color={color} />
НО важно — сам IconComponent должен быть валидной функцией, а не результатом вызова.

2. Исправь установку состояния (главный баг)
// ❌ так нельзя
setIconComponent(Component);

// ✅ правильно
setIconComponent(() => Component);
3. Добавь безопасный рендер
if (!IconComponent) {
  return null;
}
4. Защита от кривых модулей
Иногда import() может вернуть не то:

.then((module) => {
  const Component = module?.default;

  if (typeof Component !== "function") {
    console.error("Invalid icon module", module);
    return;
  }

  iconCache.set(name, Component);
  setIconComponent(() => Component);
});
✔️ Итог
Тебе НЕ нужно писать:

({ color = "currentColor" })
во всех иконках.

💡 Почему у тебя падало
React делал это:

useState(Component)
и думал, что это initializer:

Component() // ← вызывается без props
→ props = null
→ деструктуризация падает

🧾 Вывод
Иконки написаны нормально

Ошибка в useState / setState

Фикс: всегда оборачивай компонент в функцию

setIconComponent(() => Component);
Если хочешь, могу показать финальную версию Icon.tsx без багов и с оптимальным кэшом (pending + resolved).


Верно?

// Icon.create.tsx
import { Icon, type IconProps } from "./Icon";
import type { TIconRegistry } from "./Icon.types";

export const createIcon = <TCustomIcons extends TIconRegistry>() => {
	const TypedIcon = (props: IconProps<TCustomIcons>) => {
		return <Icon<TCustomIcons> {...props} />;
	};

	TypedIcon.displayName = "TypedIcon";

	return TypedIcon;
};

import type { TIconName, TIcon } from "./Icon.types";

type TIconModule = {
	default: TIcon;
};

export const iconPaths: Record<TIconName, () => Promise<TIconModule>> = {
	Close: () => import("../../icons/CloseIcon"),
};

export const defaultIcons = {
	Close: () => import("../../icons/CloseIcon"),
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;

import { memo, useEffect, useMemo, useState } from "react";
import type { TIconName, TIcon, TIconRegistry } from "./Icon.types";
import { useDUIContext } from "../../providers/DUIProvider/DUIProvider.context";
import { defaultIcons } from "./Icon.registry";

// Кэш загруженных иконок
// const iconCache = new Map<TIconName, TIcon>();
const iconCache = new Map<string, TIcon>();

/** Свойства компонента иконки */
export interface IconProps<TCustomIcons extends TIconRegistry = {}> {
	/** Имя иконки */
	name: TIconName<TCustomIcons>;
	/** Приоритетный размер (квадратный) */
	size?: number;
	/** Ширина (если нужен прямоугольник) */
	width?: number;
	/** Высота (если нужен прямоугольник) */
	height?: number;
	/** Цвет иконки */
	color?: string;
	/** Угол поворота */
	deg?: number;
	/** Обработчик клика */
	onClick?: VoidFunction;
	/** Атрибут aria-label */
	ariaLabel?: string;
}

/**
 * Компонент иконки, который динамически загружает SVG иконки по имени.
 *
 * @param props - Свойства компонента иконки
 * @param props.name - Имя иконки для отображения
 * @param props.size - Размер иконки в пикселях (по умолчанию 24)
 * @param props.color - Цвет иконки (по умолчанию "currentColor")
 * @param props.deg - Угол поворота иконки в градусах (по умолчанию 0)
 * @param props.onClick - Обработчик клика по иконке
 *
 * @example
 * <Icon name="Arrow" size={32} color="blue" deg={90} />
 *
 * @returns React-элемент иконки
 */
const IconComponentBase = <TCustomIcons extends TIconRegistry = {}>({
	name,
	size = 24,
	width: propWidth,
	height: propHeight,
	color = "currentColor",
	deg = 0,
	onClick: handleOnClick,
	ariaLabel,
}: IconProps<TCustomIcons>) => {
	const { icons } = useDUIContext<TCustomIcons>();

	const registry = useMemo(
		() => ({
			...defaultIcons,
			...icons,
		}),
		[icons],
	);

	const [IconComponent, setIconComponent] = useState<TIcon | null>(
		() => iconCache.get(name) || null,
	);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Вычисляем итоговые ширину и высоту
	const computedWidth = propWidth ?? size;
	const computedHeight = propHeight ?? size;

	// Мемоизация стилей для предотвращения перерисовок
	const containerStyle = useMemo(
		() => ({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: computedWidth,
			height: computedHeight,
			transform: rotate(${deg}deg),
		}),
		[computedWidth, computedHeight, deg],
	);

	useEffect(() => {
		let ignore = false;

		const loadIcon = async () => {
			const cacheKey = String(name);
			const cachedIcon = iconCache.get(cacheKey);

			if (cachedIcon) {
				setIconComponent(() => cachedIcon as TIcon);
				return;
			}

			const importIcon = registry[name];

			if (!importIcon) {
				console.warn(Иконка "${cacheKey}" не найдена);
				setIconComponent(() => null);
				return;
			}

			setIsLoading(true);
			setIconComponent(() => null);

			importIcon()
				.then((module) => {
					if (ignore) return;

					const Component = module.default;

					iconCache.set(cacheKey, Component);
					setIconComponent(() => Component);
				})
				.catch((error) => {
					if (ignore) return;

					console.error(
						Ошибка загрузки иконки "${cacheKey}":,
						error,
					);
					setIconComponent(() => null);
				})
				.finally(() => {
					if (ignore) return;

					setIsLoading(false);
				});
		};

		loadIcon();

		return () => {
			ignore = true;
		};
	}, [name, registry]);

	// Состояние загрузки: скрываем от скринридера, но сохраняем размеры
	if (isLoading || !IconComponent) {
		return (
			<div
				style={{ ...containerStyle, visibility: "hidden" }}
				role="img"
				aria-hidden="true"
			/>
		);
	}

	return (
		<div
			style={containerStyle}
			onClick={handleOnClick}
			role="img"
			aria-label={ariaLabel || name}
		>
			{IconComponent ? <IconComponent color={color} /> : null}
		</div>
	);
};

IconComponentBase.displayName = "Icon";
export const Icon = memo(IconComponentBase) as typeof IconComponentBase;

import type { ComponentType, SVGProps } from "react";
import type { TDefaultIconName } from "./Icon.registry";

/** Свойства SVG-иконки */
export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
	color?: string;
}

/** Тип React-компонента иконки */
export type TIcon = ComponentType<IIconComponentProps>;

export type TIconModule = {
	default: TIcon;
};

export type TIconLoader = () => Promise<TIconModule>;

export type TIconRegistry = Record<string, TIconLoader>;

export type TIconName<TCustomIcons extends TIconRegistry = {}> =
	| TDefaultIconName
	| Extract<keyof TCustomIcons, string>;


export { Icon } from "./Icon";
export { createIcon } from "./Icon.create";

export type {
	IIconComponentProps,
	TIcon,
	TIconLoader,
	TIconRegistry,
	TIconName,
} from "./Icon.types";

export type { IconProps } from "./Icon";































Почти верно. Нужно поправить 3 места.

1. Icon.paths.ts больше не нужен
У тебя дублирование:

export const iconPaths ...
и

export const defaultIcons ...
Оставь только:

// Icon.registry.ts
export const defaultIcons = {
  Close: () => import("../../icons/CloseIcon"),
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;
2. displayName нужно ставить на экспортируемый memo-компонент
export const Icon = memo(IconComponentBase) as typeof IconComponentBase;

Icon.displayName = "Icon";
А это не нужно:

IconComponentBase.displayName = "Icon";
3. В Icon.create.tsx импорт типа лучше оставить из ./Icon
Твой вариант нормальный:

import { Icon, type IconProps } from "./Icon";
import type { TIconRegistry } from "./Icon.types";

export const createIcon = <TCustomIcons extends TIconRegistry>() => {
  const TypedIcon = (props: IconProps<TCustomIcons>) => {
    return <Icon<TCustomIcons> {...props} />;
  };

  TypedIcon.displayName = "TypedIcon";

  return TypedIcon;
};
Итог
Да, архитектура верная:

defaultIcons через import()

кастомные иконки через DUIProvider

createIcon<TAppIcons>() для autocomplete

iconCache через Map<string, TIcon>

setIconComponent(() => Component) — правильно

Главное — удали старый Icon.paths.ts, чтобы не было двух источников правды.


Свойство "displayName" не существует в типе "<TCustomIcons extends TIconRegistry = {}>({ name, size, width: propWidth, height: propHeight, color, deg, onClick: handleOnClick, ariaLabel, }: IconProps<TCustomIcons>) => Element".

Да, из-за каста:

as typeof IconComponentBase
ты возвращаешь тип обычной функции, у которой нет displayName.

Сделай так:

import type { MemoExoticComponent } from "react";

export const Icon = memo(IconComponentBase) as MemoExoticComponent<
  typeof IconComponentBase
> &
  typeof IconComponentBase;

Icon.displayName = "Icon";
Либо проще:

const MemoizedIcon = memo(IconComponentBase) as MemoExoticComponent<
  typeof IconComponentBase
> &
  typeof IconComponentBase;

MemoizedIcon.displayName = "Icon";

export { MemoizedIcon as Icon };
И не забудь импорт:

import { memo, useEffect, useMemo, useState, type MemoExoticComponent } from "react";

The {} ("empty object") type allows any non-nullish value, including literals like 0 and "".
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowObjectTypes' rule option.
- If you want a type meaning "any object", you probably want object instead.
- If you want a type meaning "any value", you probably want unknown instead.

Это предупреждение из @typescript-eslint/ban-types. Оно про это:

<TCustomIcons extends TIconRegistry = {}>
{} = “любой не-null/undefined”, а не “пустой объект”.

✔️ Правильный вариант
Замени {} на Record<string, never>:

<TCustomIcons extends TIconRegistry = Record<string, never>>
Почему именно так
Тип	Значение
{}	любое значение кроме null/undefined ❌
object	любой объект, но слишком широкий ❌
unknown	вообще всё ❌
Record<string, never>	реально “пустой объект” ✅
Где заменить
1. Icon.types.ts
export type TIconName<
  TCustomIcons extends TIconRegistry = Record<string, never>
> =
  | TDefaultIconName
  | Extract<keyof TCustomIcons, string>;
2. IconProps
export interface IconProps<
  TCustomIcons extends TIconRegistry = Record<string, never>
> {
  name: TIconName<TCustomIcons>;
  ...
}
3. Icon.tsx
const IconComponentBase = <
  TCustomIcons extends TIconRegistry = Record<string, never>
>(props: IconProps<TCustomIcons>) => { ... }
4. createIcon
export const createIcon = <
  TCustomIcons extends TIconRegistry = Record<string, never>
>() => { ... }
5. DUIProvider
export const DUIProvider = <
  TCustomIcons extends TIconRegistry = Record<string, never>
>(...)
✔️ Итог
линтер перестанет ругаться

типы станут корректнее

поведение не изменится

🧾 Коротко
{} ❌
Record<string, never> ✅

напиши весь исправленный код

Думал на протяжении пары секунд
Ниже исправленная версия без {} в generic defaults, с lazy import, cache и displayName.

src/components/Icon/Icon.types.ts
import type { ComponentType, SVGProps } from "react";
import type { TDefaultIconName } from "./Icon.registry";

export type TEmptyIconRegistry = Record<string, never>;

export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
	color?: string;
}

export type TIcon = ComponentType<IIconComponentProps>;

export type TIconModule = {
	default: TIcon;
};

export type TIconLoader = () => Promise<TIconModule>;

export type TIconRegistry = Record<string, TIconLoader>;

export type TIconName<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> = TDefaultIconName | Extract<keyof TCustomIcons, string>;
src/components/Icon/Icon.registry.ts
export const defaultIcons = {
	Close: () => import("../../icons/CloseIcon"),
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;
src/components/Icon/Icon.tsx
import {
	memo,
	useEffect,
	useMemo,
	useState,
	type MemoExoticComponent,
} from "react";
import { useDUIContext } from "../../providers/DUIProvider";
import { defaultIcons } from "./Icon.registry";
import type {
	TEmptyIconRegistry,
	TIcon,
	TIconName,
	TIconRegistry,
} from "./Icon.types";

const iconCache = new Map<string, TIcon>();

export interface IconProps<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	name: TIconName<TCustomIcons>;
	size?: number;
	width?: number;
	height?: number;
	color?: string;
	deg?: number;
	onClick?: VoidFunction;
	ariaLabel?: string;
}

const IconComponentBase = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>({
	name,
	size = 24,
	width: propWidth,
	height: propHeight,
	color = "currentColor",
	deg = 0,
	onClick: handleOnClick,
	ariaLabel,
}: IconProps<TCustomIcons>) => {
	const { icons } = useDUIContext<TCustomIcons>();

	const registry = useMemo(
		() => ({
			...defaultIcons,
			...icons,
		}),
		[icons],
	);

	const [IconComponent, setIconComponent] = useState<TIcon | null>(() => {
		return iconCache.get(String(name)) ?? null;
	});

	const [isLoading, setIsLoading] = useState(false);

	const computedWidth = propWidth ?? size;
	const computedHeight = propHeight ?? size;

	const containerStyle = useMemo(
		() => ({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: computedWidth,
			height: computedHeight,
			transform: `rotate(${deg}deg)`,
		}),
		[computedWidth, computedHeight, deg],
	);

	useEffect(() => {
		let ignore = false;

		const cacheKey = String(name);
		const cachedIcon = iconCache.get(cacheKey);

		if (cachedIcon) {
			setIconComponent(() => cachedIcon);
			return;
		}

		const importIcon = registry[name];

		if (!importIcon) {
			console.warn(`Иконка "${cacheKey}" не найдена`);
			setIconComponent(null);
			return;
		}

		setIsLoading(true);
		setIconComponent(null);

		importIcon()
			.then((module) => {
				if (ignore) return;

				const Component = module.default;

				iconCache.set(cacheKey, Component);
				setIconComponent(() => Component);
			})
			.catch((error) => {
				if (ignore) return;

				console.error(`Ошибка загрузки иконки "${cacheKey}":`, error);
				setIconComponent(null);
			})
			.finally(() => {
				if (ignore) return;

				setIsLoading(false);
			});

		return () => {
			ignore = true;
		};
	}, [name, registry]);

	if (isLoading || !IconComponent) {
		return (
			<div
				style={{ ...containerStyle, visibility: "hidden" }}
				role="img"
				aria-hidden="true"
			/>
		);
	}

	return (
		<div
			style={containerStyle}
			onClick={handleOnClick}
			role="img"
			aria-label={ariaLabel || String(name)}
		>
			<IconComponent color={color} />
		</div>
	);
};

const MemoizedIcon = memo(IconComponentBase) as MemoExoticComponent<
	typeof IconComponentBase
> &
	typeof IconComponentBase;

MemoizedIcon.displayName = "Icon";

export { MemoizedIcon as Icon };
src/components/Icon/Icon.create.tsx
import { Icon, type IconProps } from "./Icon";
import type {
	TEmptyIconRegistry,
	TIconRegistry,
} from "./Icon.types";

export const createIcon = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>() => {
	const TypedIcon = (props: IconProps<TCustomIcons>) => {
		return <Icon<TCustomIcons> {...props} />;
	};

	TypedIcon.displayName = "TypedIcon";

	return TypedIcon;
};
src/components/Icon/index.ts
export { Icon } from "./Icon";
export { createIcon } from "./Icon.create";

export type {
	IIconComponentProps,
	TIcon,
	TIconModule,
	TIconLoader,
	TIconRegistry,
	TIconName,
	TEmptyIconRegistry,
} from "./Icon.types";

export type { IconProps } from "./Icon";
src/providers/DUIProvider/DUIProvider.types.ts
import type { ReactNode } from "react";
import type {
	TEmptyIconRegistry,
	TIconRegistry,
} from "../../components/Icon";

export interface IDUIProviderProps<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	children: ReactNode;
	icons?: TCustomIcons;
}

export interface IDUIContextValue<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	icons: TCustomIcons;
}
src/providers/DUIProvider/DUIProvider.context.ts
import { createContext, useContext } from "react";
import type {
	TEmptyIconRegistry,
	TIconRegistry,
} from "../../components/Icon";
import type { IDUIContextValue } from "./DUIProvider.types";

export const DUIContext = createContext<IDUIContextValue<TIconRegistry>>({
	icons: {},
});

export const useDUIContext = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>() => {
	return useContext(DUIContext) as IDUIContextValue<TCustomIcons>;
};
src/providers/DUIProvider/DUIProvider.tsx
import { useMemo } from "react";
import { DUIContext } from "./DUIProvider.context";
import type {
	TEmptyIconRegistry,
	TIconRegistry,
} from "../../components/Icon";
import type { IDUIProviderProps } from "./DUIProvider.types";

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
src/providers/DUIProvider/index.ts
export { DUIProvider } from "./DUIProvider";
export { useDUIContext } from "./DUIProvider.context";

export type {
	IDUIProviderProps,
	IDUIContextValue,
} from "./DUIProvider.types";
src/icons/CloseIcon.tsx
import type { IIconComponentProps } from "../components/Icon";

const CloseIcon = ({ color }: IIconComponentProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
				fill={color}
			/>
		</svg>
	);
};

export default CloseIcon;
src/index.ts
export * from "./components/Icon";
export * from "./providers/DUIProvider";

export const App = () => {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<DUIProvider icons={appIcons}>
			<div className={style.main}>
				<div
					style={{
						width: "210px",
					}}
				>
					<Switch
						checked={isChecked}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>,
						) => {
							setIsChecked(event.target.checked);
						}}
						label="Привет, это обязательный пункт заполнения"
						labelPosition="left"
					/>
				</div>
			</div>
			<div className={style.main}>
				<div className={clsx(style.buttons, style.white)}>
					<Button variant="primary">Primary</Button>

					<Button variant="primary-black">Primary Black</Button>
				</div>

				<div className={clsx(style.buttons, style.black)}>
					<Button variant="primary">Primary</Button>

					<Button variant="primary-white">Primary White</Button>

					<div style={{ color: "blue" }}>
						{/* Базовая иконка Close */}
						<Icon name="Close" />

						{/* С кастомным размером и цветом */}
						<Icon name="Close" size={32} color="red" />

						{/* С поворотом на 45 градусов */}
						<Icon name="Close" size={40} color="#333" deg={45} />

						{/* С обработчиком клика */}
						<Icon
							name="Close"
							onClick={() => console.log("Clicked!")}
						/>
					</div>
				</div>
			</div>
		</DUIProvider>
	);
};

без провайдера будет работать?

Коротко: да, будет работать — но только для defaultIcons.

✔️ Что произойдет без DUIProvider
В твоём коде контекст объявлен так:

export const DUIContext = createContext<IDUIContextValue<TIconRegistry>>({
  icons: {},
});
👉 Значение по умолчанию:

icons = {}
В Icon.tsx
const registry = {
  ...defaultIcons,
  ...icons, // ← здесь пусто без провайдера
};
✔️ Итог
Сценарий	Работает?	Почему
<Icon name="Close" />	✅	есть в defaultIcons
<Icon name="User" />	❌	нет в registry
❗ Поведение при кастомных иконках
Без провайдера:

<Icon name="User" />
→

Иконка "User" не найдена
✔️ Когда DUIProvider обязателен
<DUIProvider icons={appIcons}>
  <Icon name="User" /> // ✅
</DUIProvider>
💡 Рекомендация
Оставь текущее поведение — оно правильное:

defaultIcons работают без провайдера

кастомные — только через DUIProvider

Это даёт:

удобство (не нужно оборачивать всё ради базовых иконок)

гибкость (расширение через provider)

⚠️ Дополнительно (по желанию)
Можно сделать stricter режим:

if (!importIcon) {
  throw new Error(`Icon "${name}" not found`);
}
Но текущий console.warn — более безопасный DX.

🧾 Вывод
Без DUIProvider:
✔ defaultIcons работают
✖ кастомные не работают
Это ожидаемое и корректное поведение.


import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Switch } from "../components/Switch/Switch";
import { Icon } from "../components/Icon/Icon";
import { DUIProvider } from "../providers/DUIProvider";

import style from "./global.module.scss";
import clsx from "clsx";
import { appIcons } from "./assets/icons";

// TODO: с табами проверить <Activity />

export const App = () => {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<DUIProvider icons={appIcons}>
			<div className={style.main}>
				<div
					style={{
						width: "210px",
					}}
				>
					<Switch
						checked={isChecked}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>,
						) => {
							setIsChecked(event.target.checked);
						}}
						label="Привет, это обязательный пункт заполнения"
						labelPosition="left"
					/>
				</div>
			</div>
			<div className={style.main}>
				<div className={clsx(style.buttons, style.white)}>
					<Button variant="primary">Primary</Button>

					<Button variant="primary-black">Primary Black</Button>
				</div>

				<div className={clsx(style.buttons, style.black)}>
					<Button variant="primary">Primary</Button>

					<Button variant="primary-white">Primary White</Button>

					<div style={{ color: "blue" }}>
						{/* Базовая иконка Close */}
						<Icon name="User" />

						{/* С кастомным размером и цветом */}
						<Icon name="Close" size={32} color="red" />

						{/* С поворотом на 45 градусов */}
						<Icon name="Close" size={40} color="#333" deg={45} />

						{/* С обработчиком клика */}
						<Icon
							name="Close"
							onClick={() => console.log("Clicked!")}
						/>
					</div>
				</div>
			</div>
		</DUIProvider>
	);
};

// app/AppIcon.ts
import { createIcon } from "../../components/Icon";
import type { TAppIcons } from "./icons";

export const AppIcon = createIcon<TAppIcons>();

// app/icons/index.ts
export const appIcons = {
	User: () => import("./UserIcon"),
	Settings: () => import("./SettingsIcon"),
} as const;

export type TAppIcons = typeof appIcons;

а подсказок нет, что есть User и Settings


Подсказок нет, потому что ты используешь базовый:

<Icon name="User" />
Он знает только defaultIcons. Для кастомных иконок нужно использовать созданный typed-wrapper.

Исправь импорт
// было
import { Icon } from "../components/Icon/Icon";

// нужно
import { AppIcon } from "./assets/AppIcon";
Используй так
<AppIcon name="User" />
<AppIcon name="Settings" />
<AppIcon name="Close" />
В твоём коде
<div style={{ color: "blue" }}>
	<AppIcon name="User" />

	<AppIcon name="Close" size={32} color="red" />

	<AppIcon name="Close" size={40} color="#333" deg={45} />

	<AppIcon
		name="Close"
		onClick={() => console.log("Clicked!")}
	/>
</div>
Почему
DUIProvider в runtime даёт иконки компоненту, но TypeScript не выводит типы из Provider вниз.

Поэтому для DX нужен именно:

export const AppIcon = createIcon<TAppIcons>();
И далее использовать только AppIcon, не Icon.


Но в таком случае мы обязаны использовать DUIProvider appIcons?

Да.

<AppIcon name="User" />
даёт только типы и autocomplete.

А вот реальные загрузчики иконок приходят из:

<DUIProvider icons={appIcons}>
То есть нужно оба:

<DUIProvider icons={appIcons}>
  <AppIcon name="User" />
  <AppIcon name="Close" />
</DUIProvider>
Без DUIProvider:

<AppIcon name="User" />
TypeScript пропустит, но runtime не найдёт User.

Как избежать рассинхрона
Можно сделать фабрику, которая создаёт сразу Provider и Icon из одного registry:

export const createIconKit = <TIcons extends TIconRegistry>(icons: TIcons) => {
  const TypedIcon = createIcon<TIcons>();

  const TypedIconProvider = ({ children }: { children: React.ReactNode }) => {
    return <DUIProvider icons={icons}>{children}</DUIProvider>;
  };

  return {
    Icon: TypedIcon,
    IconProvider: TypedIconProvider,
  };
};
Использование:

const { Icon: AppIcon, IconProvider: AppIconProvider } =
  createIconKit(appIcons);
<AppIconProvider>
  <AppIcon name="User" />
  <AppIcon name="Close" />
</AppIconProvider>
Так appIcons указывается один раз.


а напиши коротко документацию, когда мы используем Icon, а когда AppIcon

Использование Icon vs AppIcon
Icon (базовый)
Используется для UIKit-иконок (defaultIcons).

<Icon name="Close" />
Когда использовать:

только встроенные иконки библиотеки

не нужен DUIProvider

простой случай

Ограничения:

нет кастомных иконок

autocomplete только по defaultIcons

AppIcon (typed)
Создаётся через:

const AppIcon = createIcon<TAppIcons>();
Используется для кастомных + встроенных иконок.

<AppIcon name="User" />
<AppIcon name="Close" />
Когда использовать:

есть кастомные иконки

нужен autocomplete (User, Settings, Close)

production код приложения

Требует:

<DUIProvider icons={appIcons}>
  <AppIcon name="User" />
</DUIProvider>
Кратко
Компонент	Иконки	Provider	Autocomplete
Icon	только UIKit	не нужен	базовый
AppIcon	UIKit + кастом	обязателен	полный
Рекомендация
UIKit → Icon

Приложение → AppIcon


import { Icon, type IconProps } from "./Icon";
import type { TEmptyIconRegistry, TIconRegistry } from "./Icon.types";

export const createIcon = <
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
>() => {
	const TypedIcon = (props: IconProps<TCustomIcons>) => {
		return <Icon<TCustomIcons> {...props} />;
	};

	TypedIcon.displayName = "TypedIcon";

	return TypedIcon;
};

напиши tsdoc

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

export const defaultIcons = {
	Close: () => import("../../icons/CloseIcon"),
} as const;

export type TDefaultIconName = keyof typeof defaultIcons;

напиши tsdoc

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

import type { ComponentType, SVGProps } from "react";
import type { TDefaultIconName } from "./Icon.registry";

export type TEmptyIconRegistry = Record<string, never>;

export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
	color?: string;
}

export type TIcon = ComponentType<IIconComponentProps>;

export type TIconModule = {
	default: TIcon;
};

export type TIconLoader = () => Promise<TIconModule>;

export type TIconRegistry = Record<string, TIconLoader>;

export type TIconName<TCustomIcons extends TIconRegistry = TEmptyIconRegistry> =
	| TDefaultIconName
	| Extract<keyof TCustomIcons, string>;

напиши tsdoc

import type { ComponentType, SVGProps } from "react";
import type { TDefaultIconName } from "./Icon.registry";

/**
 * Тип "пустого" реестра иконок.
 *
 * Используется как значение по умолчанию в generic-параметрах,
 * чтобы избежать использования `{}` (который допускает любые значения).
 *
 * @remarks
 * Обеспечивает корректную типизацию без ослабления type safety.
 */
export type TEmptyIconRegistry = Record<string, never>;

/**
 * Базовые пропсы для SVG-иконки.
 *
 * Расширяет стандартные SVG-атрибуты и добавляет поддержку цвета.
 *
 * @property color - Цвет заливки иконки (обычно прокидывается в `fill`)
 */
export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
	color?: string;
}

/**
 * Тип React-компонента иконки.
 *
 * Каждая иконка должна быть функциональным компонентом,
 * принимающим `IIconComponentProps`.
 */
export type TIcon = ComponentType<IIconComponentProps>;

/**
 * Тип модуля, возвращаемого через динамический `import()`.
 *
 * @property default - React-компонент иконки
 */
export type TIconModule = {
	default: TIcon;
};

/**
 * Тип функции-лоадера иконки.
 *
 * Используется для lazy loading (code splitting) через `import()`.
 *
 * @example
 * ```ts
 * const loader: TIconLoader = () => import("./CloseIcon");
 * ```
 */
export type TIconLoader = () => Promise<TIconModule>;

/**
 * Реестр иконок.
 *
 * Представляет собой словарь, где:
 * - ключ — имя иконки
 * - значение — функция загрузки (lazy import)
 *
 * @example
 * ```ts
 * const icons: TIconRegistry = {
 *   Close: () => import("./CloseIcon"),
 * };
 * ```
 */
export type TIconRegistry = Record<string, TIconLoader>;

/**
 * Тип допустимых имён иконок.
 *
 * Объединяет:
 * - встроенные иконки (`TDefaultIconName`)
 * - кастомные иконки (`TCustomIcons`)
 *
 * @typeParam TCustomIcons - Реестр кастомных иконок
 *
 * @example
 * ```ts
 * type Name = TIconName<typeof appIcons>;
 * // "Close" | "User" | "Settings"
 * ```
 */
export type TIconName<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> =
	| TDefaultIconName
	| Extract<keyof TCustomIcons, string>;

import type { ReactNode } from "react";
import type { TEmptyIconRegistry, TIconRegistry } from "../../components/Icon";

export interface IDUIProviderProps<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	children: ReactNode;
	icons?: TCustomIcons;
}

export interface IDUIContextValue<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	icons: TCustomIcons;
}

напиши tsdoc

import type { ReactNode } from "react";
import type { TEmptyIconRegistry, TIconRegistry } from "../../components/Icon";

/**
 * Свойства провайдера `DUIProvider`.
 *
 * Позволяет передать кастомный реестр иконок в контекст,
 * который затем используется компонентом `Icon`/`AppIcon` для их загрузки.
 *
 * @typeParam TCustomIcons - Тип реестра кастомных иконок (обычно `typeof appIcons`)
 *
 * @property children - Дочерние React-элементы
 * @property icons - Реестр кастомных иконок (lazy loaders)
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
 * - Необязателен для использования встроенных (`defaultIcons`) иконок
 * - Обязателен для работы кастомных иконок
 */
export interface IDUIProviderProps<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	children: ReactNode;
	icons?: TCustomIcons;
}

/**
 * Значение контекста `DUIContext`.
 *
 * Содержит объединённый реестр иконок, доступный компонентам внутри дерева.
 *
 * @typeParam TCustomIcons - Тип реестра кастомных иконок
 *
 * @property icons - Реестр кастомных иконок, переданный через `DUIProvider`
 *
 * @remarks
 * Используется внутри `Icon` для формирования итогового registry:
 * ```ts
 * { ...defaultIcons, ...icons }
 * ```
 */
export interface IDUIContextValue<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
	icons: TCustomIcons;
}
