export const appIcons = {
	User: () => import("./UserIcon"),
	Settings: () => import("./SettingsIcon"),
} as const;

export type TAppIcons = typeof appIcons;
