import type { IconName, IconType } from "./Icon.types";

export const iconPaths: Record<IconName, () => Promise<{ default: IconType }>> =
	{
		Close: () => import("../../icons/CloseIcon"),
	} satisfies Record<string, () => Promise<{ default: IconType }>>;
