import {
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
	type JSX,
} from "react";
import clsx from "clsx";
import { TableRow } from "./row";
import { TableHead } from "./head";
import type { TablePropsWithSettings } from "./types";
import style from "./style.module.scss";

const TableComponent = <T extends { id?: string | number }>({
	rowKey,
	columns,
	data,
	manager,
}: TablePropsWithSettings<T>) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [containerWidth, setContainerWidth] = useState<number>();

	// подписка на manager
	useSyncExternalStore(
		(onStoreChange) =>
			manager ? manager.subscribe(onStoreChange) : () => {},
		() => (manager ? manager.getVersion() : 0),
		() => 0,
	);

	const getRowKey = (row: T): string | number => {
		if (rowKey === undefined) {
			if ("id" in row && row.id !== undefined && row.id !== null)
				return row.id;
			throw new Error(
				"rowKey is required when 'id' field is not present in data objects",
			);
		}

		if (typeof rowKey === "function") return rowKey(row);

		const key = row[rowKey];
		if (key === undefined || key === null) {
			throw new Error(
				`rowKey "${String(rowKey)}" returned null/undefined`,
			);
		}
		return key as unknown as string | number;
	};

	// валидация ключей (warning)
	useEffect(() => {
		if (!data) return;

		const seen = new Set<string | number>();
		for (const row of data) {
			const key = getRowKey(row);
			if (seen.has(key)) {
				// eslint-disable-next-line no-console
				console.warn(`Duplicate rowKey found:`, key, row);
			}
			seen.add(key);
		}
	}, [data, rowKey]);

	const visibleColumns = useMemo(() => {
		if (!manager?.column) return columns;

		const hidden = manager.column.state.hidden;
		return columns.filter(
			(col) => !col.dataIndex || !hidden.includes(String(col.dataIndex)),
		);
	}, [columns, manager]);

	useEffect(() => {
		if (!containerRef.current) return;

		const observer = new ResizeObserver(([entry]) =>
			setContainerWidth(entry.contentRect.width),
		);
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);

	const columnTemplate = useMemo(
		() =>
			visibleColumns
				.map((col) => (col.width ? `${col.width}px` : "1fr"))
				.join(" "),
		[visibleColumns],
	);

	// ✅ применяем сортировку к данным
	const renderedData = useMemo(() => {
		if (!data || data.length === 0) return [];

		const sort = manager?.sort?.state;
		if (!sort?.columnKey || !sort.direction) return data;

		// ищем колонку по columnKey и проверяем что она sortable
		const sortCol = columns.find(
			(c) => c.dataIndex && String(c.dataIndex) === sort.columnKey,
		);
		if (!sortCol || !sortCol.dataIndex) return data;

		const dir = sort.direction === "asc" ? 1 : -1;
		const dataIndex = sortCol.dataIndex;

		// сортируем копию, чтобы не мутировать props
		return [...data].sort((a, b) => {
			const av = a[dataIndex];
			const bv = b[dataIndex];

			// null/undefined всегда вниз
			const aNil = av === null || av === undefined;
			const bNil = bv === null || bv === undefined;
			if (aNil && bNil) return 0;
			if (aNil) return 1;
			if (bNil) return -1;

			// число
			if (typeof av === "number" && typeof bv === "number") {
				return (av - bv) * dir;
			}

			// дата (если реально Date)
			if (av instanceof Date && bv instanceof Date) {
				return (av.getTime() - bv.getTime()) * dir;
			}

			// строка/прочее
			return (
				String(av).localeCompare(String(bv), undefined, {
					numeric: true,
					sensitivity: "base",
				}) * dir
			);
		});
	}, [data, manager, columns]);

	return (
		<div ref={containerRef} className={style.table_container}>
			<div
				className={style.table}
				style={{ gridTemplateColumns: columnTemplate }}
			>
				<TableHead columns={visibleColumns} manager={manager} />

				<div className={clsx(style.table__body)}>
					{renderedData.length > 0 ? (
						renderedData.map((row) => {
							const key = getRowKey(row);
							return (
								<TableRow
									key={String(key)}
									row={row}
									rowIndex={key}
									columns={visibleColumns}
								/>
							);
						})
					) : (
						<div style={{ gridColumn: "1 / -1", padding: "10px" }}>
							No Data
						</div>
					)}
				</div>
			</div>

			{containerWidth !== undefined && (
				<div style={{ position: "absolute", width: containerWidth }} />
			)}
		</div>
	);
};

const shallowEqualArrays = (arrA: unknown[], arrB: unknown[]): boolean =>
	arrA.length === arrB.length &&
	arrA.every((item, index) => item === arrB[index]);

export const Table = memo(
	TableComponent,
	(prev, next) =>
		prev.columns === next.columns &&
		shallowEqualArrays(prev.data ?? [], next.data ?? []) &&
		prev.manager === next.manager &&
		prev.rowKey === next.rowKey,
) as <T extends { id?: string | number }>(
	props: TablePropsWithSettings<T>,
) => JSX.Element;
