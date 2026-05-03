// Components
export { Button, type IButtonProps } from "./components/Button";
export {
	Icon,
	createIcon,
	type IIconComponentProps,
	type TIcon,
	type TIconModule,
	type TIconLoader,
	type TIconRegistry,
	type TIconName,
	type TEmptyIconRegistry,
	type IconProps,
} from "./components/Icon";
export {
	Image,
	type IImageProps,
	type IImageSource,
	type TImageSrcSet,
	type TImageSrcSetCandidate,
} from "./components/Image";

// TODO: Обновить
export { Input, type IInputProps } from "./components/Input";
// TODO: Сделать компонент
export { Pagination, type IPaginationProps } from "./components/Pagination";
export { Portal, type IPortalProps } from "./components/Portal";
export { Switch, type ISwitchProps } from "./components/Switch";
export { Tabs, type TabsProps } from "./components/Tabs/Tabs";
export { TextArea, type TextAreaProps } from "./components/Textarea/Textarea";

// Providers
export {
	DUIProvider,
	useDUIContext,
	type IDUIProviderProps,
	type IDUIContextValue,
} from "./providers/DUIProvider";
