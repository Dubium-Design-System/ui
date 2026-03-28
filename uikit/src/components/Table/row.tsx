import React, { memo, type JSX } from "react";
import type { Column, Align } from "./types";
import clsx from "clsx";
import style from "./style.module.scss";

type TDataIndex = string | number | boolean | null | undefined;

interface RowProps<T extends object> {
	row: T;
	rowIndex: string | number;
	columns: Column<T>[];
}

const alignToJustify = (
	align: Align | undefined,
): React.CSSProperties["justifyContent"] => {
	switch (align ?? "left") {
		case "left":
			return "flex-start";
		case "center":
			return "center";
		case "right":
			return "flex-end";
	}
};

// Функция для глубокого сравнения объектов
const deepEqual = <T extends object>(a: T, b: T): boolean => {
	if (a === b) return true;

	if (a == null || b == null) return a === b;

	if (typeof a !== "object" || typeof b !== "object") return a === b;

	if (Array.isArray(a) !== Array.isArray(b)) return false;

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) return false;
		}
		return true;
	}

	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	if (keysA.length !== keysB.length) return false;

	for (const key of keysA) {
		if (!keysB.includes(key)) return false;
		// Сравниваем значения свойств
		const valA = (a as Record<string, unknown>)[key];
		const valB = (b as Record<string, unknown>)[key];
		if (
			valA !== valB &&
			!(
				typeof valA === "object" &&
				typeof valB === "object" &&
				valA != null &&
				valB != null &&
				deepEqual(valA, valB)
			)
		) {
			return false;
		}
	}

	return true;
};

const Row = <T extends object>({ row, rowIndex, columns }: RowProps<T>) => {
	return (
		<div className={clsx(style.table__body_row)}>
			{columns.map((col, colIndex) => {
				const value = col.dataIndex
					? (row[col.dataIndex] as TDataIndex)
					: undefined;

				const cellContent = col.render
					? col.render({
							text: value as T[keyof T] | undefined,
							record: row,
							index: rowIndex,
						})
					: value;

				const cellKey = col.dataIndex
					? String(col.dataIndex)
					: String(colIndex);

				return (
					<div
						key={`${rowIndex}-${cellKey}`}
						className={clsx(style.table__body_item)}
						style={{
							justifyContent: alignToJustify(col.alignCell),
						}}
					>
						{cellContent ?? "-"}
					</div>
				);
			})}
		</div>
	);
};

const areRowPropsEqual = <T extends object>(
	prev: RowProps<T>,
	next: RowProps<T>,
): boolean => {
	// Сравниваем примитивные значения
	if (prev.rowIndex !== next.rowIndex) return false;
	if (prev.columns !== next.columns) return false;

	// Глубокое сравнение объектов
	return deepEqual(prev.row, next.row);
};

export const TableRow = memo(
	Row as <T extends object>(props: RowProps<T>) => JSX.Element,
	areRowPropsEqual as <T extends object>(
		prev: RowProps<T>,
		next: RowProps<T>,
	) => boolean,
);
