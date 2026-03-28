import type { Column } from "./types";
import type { TableManager, SortState } from "./manager/TableManager";

export interface SortConfig<T> {
	key: keyof T | null;
	direction: "asc" | "desc" | null;
}

export const TableSort = <T extends object>({
	manager,
	column,
}: {
	manager: TableManager<T>;
	column: Column<T>;
}) => {
	const sortState: SortState = manager.sort?.state ?? {
		columnKey: null,
		direction: null,
	};

	const handleSort = () => {
		if (!column.dataIndex) return;

		// ✅ гарантируем, что модуль включён
		if (!manager.isModuleEnabled("sort")) manager.enableModule("sort");

		const currentKey = String(column.dataIndex);

		const current = manager.sort?.state;
		if (!current) return;

		if (current.columnKey === currentKey && current.direction) {
			const newDirection = current.direction === "asc" ? "desc" : "asc";
			manager.sort.setSort(currentKey, newDirection);
			return;
		}

		manager.sort.setSort(currentKey, "asc");
	};

	const getSortIcon = (): string => {
		if (!column.dataIndex) return "";

		const currentKey = String(column.dataIndex);
		if (currentKey !== sortState.columnKey) return "↕️";

		return sortState.direction === "asc" ? "↑" : "↓";
	};

	const isSortable = Boolean(column.dataIndex);

	return (
		<div
			onClick={isSortable ? handleSort : undefined}
			style={{
				cursor: isSortable ? "pointer" : "default",
				display: "inline-flex",
				alignItems: "center",
				gap: "4px",
				userSelect: "none",
			}}
		>
			<span>{column.title}</span>
			{isSortable && <span>{getSortIcon()}</span>}
		</div>
	);
};
