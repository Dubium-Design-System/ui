import type { ReactNode } from "react";
import type { TableManager } from "./manager/TableManager";

export type Align = "left" | "center" | "right";

/**
 * Описание конфигурации колонки таблицы.
 *
 * @template T - Тип объекта данных, из которого строится строка таблицы.
 */
export interface Column<T extends object> {
	/** Заголовок колонки, отображаемый в шапке таблицы. */
	title: string;

	/**
	 * Выравнивание содержимого в заголовке.
	 * @default "left"
	 */
	alignHeader?: Align;

	/**
	 * Выравнивание содержимого в ячейках таблицы.
	 * @default "left"
	 */
	alignCell?: Align;

	/** Фиксированная ширина колонки (в пикселях). */
	width?: number;

	/**
	 * Ключ поля объекта данных, отображаемого в колонке.
	 * Используется для автоматического извлечения значения из строки (`row[dataIndex]`).
	 */
	dataIndex?: keyof T;

	/**
	 * Кастомный рендер содержимого ячейки.
	 */
	render?(args: {
		text: T[keyof T] | undefined;
		record: T;
		index: string | number;
	}): ReactNode;
}

/** Настройки таблицы через экземпляр TableManager */
export interface TableSettings<T extends object> {
	/** Экземпляр TableManager для управления функциональностью таблицы */
	manager?: TableManager<T>;
}

/**
 * Пропсы таблицы.
 *
 * @template T - Тип объекта данных, из которого строятся строки таблицы.
 */
export interface TableProps<T extends { id?: string | number }> {
	/**
	 * Ключ для идентификации строк.
	 * Может быть строкой - ключом объекта, или функцией, возвращающей уникальный идентификатор.
	 */
	rowKey?: keyof T | ((row: T) => string | number);

	/** Массив колонок, определяющих структуру и поведение таблицы. */
	columns: Column<T>[];

	/** Массив данных, используемых для рендеринга строк таблицы. */
	data: T[] | null;
}

/** Расширенные пропсы таблицы с поддержкой настроек */
export interface TablePropsWithSettings<T extends { id?: string | number }>
	extends TableProps<T>, TableSettings<T> {}
