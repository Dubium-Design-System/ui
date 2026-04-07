import type { ComponentType, SVGProps } from "react";

/** Тип React-компонента иконки */
export interface IIconComponentProps extends SVGProps<SVGSVGElement> {
	color?: string;
}
export type IconType = ComponentType<IIconComponentProps>;

/** Имена доступных иконок */
export type IconName = "Close";
