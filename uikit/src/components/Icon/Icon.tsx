import { memo, useEffect, useMemo, useState, type ComponentType } from "react";
import type { IconName, IIconComponentProps } from "./Icon.types";
import { iconPaths } from "./Icon.paths";

// Кэш загруженных иконок
const iconCache = new Map<IconName, TIconComponent>();

/** Свойства компонента иконки */
export interface IconProps {
	/** Имя иконки */
	name: IconName;
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

type TIconComponent = ComponentType<IIconComponentProps>;

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
		const [IconComponent, setIconComponent] =
			useState<TIconComponent | null>(() => iconCache.get(name) || null);

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

		// Единый эффект для загрузки иконки при изменении имени
		useEffect(() => {
			let ignore = false;

			const loadIcon = async () => {
				// Если уже есть в кэше — сразу используем
				if (iconCache.has(name)) {
					if (!ignore) {
						setIconComponent(iconCache.get(name) as TIconComponent);
					}
					return;
				}

				// Проверяем, существует ли такая иконка
				if (!iconPaths[name]) {
					console.warn(`Иконка "${name}" не найдена`);
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
					console.error(`Ошибка загрузки иконки "${name}":`, error);
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
