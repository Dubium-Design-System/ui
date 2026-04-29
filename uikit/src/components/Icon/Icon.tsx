import {
	memo,
	useEffect,
	useMemo,
	useState,
	type MemoExoticComponent,
} from "react";
import type {
	TIconName,
	TIcon,
	TIconRegistry,
	TEmptyIconRegistry,
} from "./Icon.types";
import { useDUIContext } from "../../providers/DUIProvider/DUIProvider.context";
import { defaultIcons } from "./Icon.registry";

// Кэш загруженных иконок
const iconCache = new Map<string, TIcon>();

/** Свойства компонента иконки */
export interface IconProps<
	TCustomIcons extends TIconRegistry = TEmptyIconRegistry,
> {
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
			transform: `rotate(${deg}deg)`,
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
				console.warn(`Иконка "${cacheKey}" не найдена`);
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
						`Ошибка загрузки иконки "${cacheKey}":`,
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

const MemoizedIcon = memo(IconComponentBase) as MemoExoticComponent<
	typeof IconComponentBase
> &
	typeof IconComponentBase;

MemoizedIcon.displayName = "Icon";

export { MemoizedIcon as Icon };
