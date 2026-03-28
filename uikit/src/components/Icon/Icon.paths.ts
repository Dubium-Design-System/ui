import type { IconName, IconType } from "./Icon.types";

type IconComponent = IconType;

type IconModule = {
	default: IconComponent;
};

export const iconPaths: Record<IconName, () => Promise<IconModule>> = {
	Close: () =>
		import("../../icons/CloseIcon").then((module) => ({
			default: module.CloseIcon,
		})),
} as const;
