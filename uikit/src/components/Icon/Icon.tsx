import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ComponentType,
	type SVGProps,
} from "react";
import type { IconName } from "./Icon.types";
import { iconPaths } from "./Icon.paths";

// Кэш загруженных иконок
const iconCache = new Map<IconName, ComponentType<SVGProps<SVGSVGElement>>>();

/** Свойства компонента иконки */
export interface IconProps {
	/** Имя иконки */
	name: IconName;
	/** Размер в пикселях */
	size?: number;
	/** Цвет иконки */
	color?: string;
	/** Угол поворота */
	deg?: number;
	/** Обработчик клика */
	onClick?: () => void;
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
export const Icon = ({
	name,
	size = 24,
	color = "currentColor",
	deg = 0,
	onClick: handleOnClick,
}: IconProps) => {
	const [IconComponent, setIconComponent] = useState<ComponentType<
		SVGProps<SVGSVGElement>
	> | null>(() => iconCache.get(name) || null);
	const [isLoading, setIsLoading] = useState(false);

	const mountedRef = useRef(true);

	// Мемоизация стилей для предотвращения перерисовок
	const iconStyle = useMemo(
		() => ({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: size,
			height: size,
			transform: `rotate(${deg}deg)`,
		}),
		[size, deg],
	);

	/**
	 * Асинхронная функция для загрузки компонента иконки по имени.
	 * Проверяет наличие иконки в кэше и загружает при необходимости.
	 *
	 * @returns Promise<void>
	 */
	const loadIcon = useCallback(async () => {
		if (!iconPaths[name]) {
			console.warn(`Иконка "${name}" не найдена`);
			return;
		}

		if (iconCache.has(name)) {
			return;
		}

		setIsLoading(true);

		try {
			const importFn = iconPaths[name];
			const module = await importFn();
			const Component = module.default;

			if (Component && mountedRef.current) {
				iconCache.set(name, Component);
				setIconComponent(() => Component);
			}
		} catch (error) {
			console.error(`Ошибка загрузки иконки: "${name}":`, error);
		} finally {
			if (mountedRef.current) {
				setIsLoading(false);
			}
		}
	}, [name]);

	useEffect(() => {
		mountedRef.current = true;

		if (!IconComponent && !isLoading) {
			loadIcon();
		}

		return () => {
			mountedRef.current = false;
		};
	}, [name, IconComponent, isLoading, loadIcon]);

	return (
		<div style={iconStyle} onClick={handleOnClick}>
			{IconComponent ? <IconComponent color={color} /> : null}
		</div>
	);
};

Icon.displayName = "Icon";
