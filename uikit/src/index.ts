// Components
export { Button, type IButtonProps } from "./components/Button"
export { Highlight } from "./components/Highlight"
export {
	createIcon,
	Icon,
	type IconProps,
	type IIconComponentProps,
	type TEmptyIconRegistry,
	type TIcon,
	type TIconLoader,
	type TIconModule,
	type TIconName,
	type TIconRegistry,
} from "./components/Icon"

export {
	type IImageProps,
	type IImageSource,
	Image,
	type TImageSrcSet,
	type TImageSrcSetCandidate,
} from "./components/Image"
// TODO: Обновить
export { type IInputProps, Input } from "./components/Input"
// TODO: Сделать компонент
export { type IPaginationProps, Pagination } from "./components/Pagination"
export { type IPortalProps, Portal } from "./components/Portal"
export { type ISwitchProps, Switch } from "./components/Switch"
export { Tabs, type TabsProps } from "./components/Tabs/Tabs"
export { TextArea, type TextAreaProps } from "./components/Textarea/Textarea"
export { Typography } from "./components/Typography"

// Providers
export { DUIProvider, type IDUIContextValue, type IDUIProviderProps, useDUIContext } from "./providers/DUIProvider"
