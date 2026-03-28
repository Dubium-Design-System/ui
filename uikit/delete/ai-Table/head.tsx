import { memo, type JSX } from "react";
import type { Column, Align } from "./types";
import { TableSort } from "./sort";
import type { TableManager } from "./manager/TableManager";
import style from "./style.module.scss";

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

const Head = <T extends object>({
	columns,
	manager,
}: {
	columns: Column<T>[];
	manager?: TableManager<T>;
}) => (
	<div className={style.table__head}>
		{columns.map((col, i) => {
			const key = col.dataIndex
				? String(col.dataIndex)
				: `${col.title}-${i}`;

			return (
				<div
					key={key}
					className={style.table__head_item}
					style={{ justifyContent: alignToJustify(col.alignHeader) }}
				>
					{manager ? (
						<TableSort manager={manager} column={col} />
					) : (
						col.title
					)}
				</div>
			);
		})}
	</div>
);

export const TableHead = memo(Head) as <T extends object>(props: {
	columns: Column<T>[];
	manager?: TableManager<T>;
}) => JSX.Element;
