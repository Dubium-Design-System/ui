import { memo, type MemoExoticComponent, useEffect, useMemo, useState } from "react"

import type { TEmptyIconRegistry, TIcon, TIconName, TIconRegistry } from "./Icon.types"

import { useDUIContext } from "../../providers/DUIProvider/DUIProvider.context"
import { defaultIcons } from "./Icon.registry"

/**
 * Кэш загруженных иконок.
 *
 * @remarks
 * Хранит уже загруженные React-компоненты иконок для предотвращения
 * повторных динамических импортов. Ключом является строковое имя иконки.
 */
const iconCache = new Map<string, TIcon>()

/** Свойства компонента иконки */
export interface IconProps<TCustomIcons extends TIconRegistry = TEmptyIconRegistry> {
	/** Атрибут aria-label */
	ariaLabel?: string
	/** Цвет иконки */
	color?: string
	/** Угол поворота */
	deg?: number
	/** Высота (если нужен прямоугольник) */
	height?: number
	/** Имя иконки */
	name: TIconName<TCustomIcons>
	/** Обработчик клика */
	onClick?: VoidFunction
	/** Приоритетный размер (квадратный) */
	size?: number
	/** Ширина (если нужен прямоугольник) */
	width?: number
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
const IconComponentBase = <TCustomIcons extends TIconRegistry = TEmptyIconRegistry>({
	name,
	size = 24,
	width: propWidth,
	height: propHeight,
	color = "currentColor",
	deg = 0,
	onClick: handleOnClick,
	ariaLabel,
}: IconProps<TCustomIcons>) => {
	const { icons } = useDUIContext<TCustomIcons>()

	/**
	 * Объединённый реестр иконок.
	 *
	 * @remarks
	 * Объединяет встроенные иконки (`defaultIcons`) с пользовательскими иконками
	 * из контекста `DUIProvider`. Пользовательские иконки переопределяют встроенные
	 * при совпадении имён. Мемоизирован для предотвращения лишних пересчётов.
	 */
	const registry = useMemo(
		() => ({
			...defaultIcons,
			...icons,
		}),
		[icons],
	)

	/**
	 * Текущий загруженный компонент иконки.
	 *
	 * @remarks
	 * Инициализируется из кэша, если иконка уже была загружена ранее.
	 * В противном случае — `null`, что триггерит динамическую загрузку.
	 */
	const [IconComponent, setIconComponent] = useState<null | TIcon>(() => iconCache.get(name) || null)

	/** Флаг состояния загрузки иконки. */
	const [isLoading, setIsLoading] = useState<boolean>(false)

	/** Итоговая ширина иконки (приоритет у явно заданной ширины). */
	const computedWidth = propWidth ?? size
	/** Итоговая высота иконки (приоритет у явно заданной высоты). */
	const computedHeight = propHeight ?? size

	/**
	 * Мемоизированные стили контейнера иконки.
	 *
	 * @remarks
	 * Включает центрирование через flexbox, размеры и поворот.
	 * Мемоизация предотвращает пересоздание объекта стилей при каждом рендере.
	 */
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
	)

	useEffect(() => {
		let ignore = false

		/**
		 * Асинхронная функция загрузки иконки.
		 *
		 * @remarks
		 * Проверяет кэш, затем реестр иконок. Если иконка найдена в реестре,
		 * выполняет динамический импорт, кэширует результат и устанавливает
		 * компонент в состояние. При ошибке или отсутствии иконки — логирует
		 * предупреждение и сбрасывает компонент.
		 */
		const loadIcon = async () => {
			const cacheKey = String(name)
			const cachedIcon = iconCache.get(cacheKey)

			if (cachedIcon) {
				setIconComponent(() => cachedIcon)
				return
			}

			const importIcon = registry[name]

			if (!importIcon) {
				console.warn(`Иконка "${cacheKey}" не найдена`)
				setIconComponent(() => null)
				return
			}

			setIsLoading(true)
			setIconComponent(() => null)

			importIcon()
				.then((module) => {
					if (ignore) return

					const Component = module.default

					iconCache.set(cacheKey, Component)
					setIconComponent(() => Component)
				})
				.catch((error) => {
					if (ignore) return

					console.error(`Ошибка загрузки иконки "${cacheKey}":`, error)
					setIconComponent(() => null)
				})
				.finally(() => {
					if (ignore) return

					setIsLoading(false)
				})
		}

		loadIcon()

		return () => {
			ignore = true
		}
	}, [name, registry])

	// Состояние загрузки: скрываем от скринридера, но сохраняем размеры
	if (isLoading || !IconComponent) {
		return <div aria-hidden="true" role="img" style={{ ...containerStyle, visibility: "hidden" }} />
	}

	return (
		<div aria-label={ariaLabel || name} onClick={handleOnClick} role="img" style={containerStyle}>
			{IconComponent ? <IconComponent color={color} /> : null}
		</div>
	)
}

const MemoizedIcon = memo(IconComponentBase) as MemoExoticComponent<typeof IconComponentBase> & typeof IconComponentBase

MemoizedIcon.displayName = "Icon"

export { MemoizedIcon as Icon }
