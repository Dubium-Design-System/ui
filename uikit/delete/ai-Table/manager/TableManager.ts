export interface TableModule {
	reset(): void;
	destroy(): void;
}

export interface SortState {
	columnKey: string | null;
	direction: "asc" | "desc" | null;
}

export interface FilterState {
	[columnKey: string]: unknown;
}

export interface SearchState {
	term: string;
}

export interface PaginationState {
	currentPage: number;
	pageSize: number;
}

export interface ColumnState {
	hidden: string[];
}

export type ModuleName = "sort" | "filter" | "search" | "pagination" | "column";

/**
 * Менеджер состояния/модулей таблицы.
 * Хранит состояние модулей и уведомляет подписчиков об изменениях.
 */
export class TableManager<T extends object> {
	private enabled: Set<ModuleName> = new Set();

	private sortState: SortState = { columnKey: null, direction: null };
	private filterState: FilterState = {};
	private searchState: SearchState = { term: "" };
	private paginationState: PaginationState = { currentPage: 1, pageSize: 10 };
	private columnState: ColumnState = { hidden: [] };

	private instances: Map<ModuleName, TableModule> = new Map();

	private listeners: Set<() => void> = new Set();
	private version = 0;

	/** Для useSyncExternalStore */
	public getVersion(): number {
		return this.version;
	}

	public subscribe(listener: () => void): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notifyChange(): void {
		this.version += 1;
		for (const l of this.listeners) l();
	}

	public enableModule(name: ModuleName): void {
		if (!this.enabled.has(name)) {
			this.enabled.add(name);
			this.notifyChange();
		}
	}

	public disableModule(name: ModuleName): void {
		if (this.enabled.has(name)) {
			this.enabled.delete(name);
			this.resetModuleState(name);

			const inst = this.instances.get(name);
			if (inst) {
				inst.destroy();
				this.instances.delete(name);
			}

			this.notifyChange();
		}
	}

	public isModuleEnabled(name: ModuleName): boolean {
		return this.enabled.has(name);
	}

	public get enabledModules(): ModuleName[] {
		return Array.from(this.enabled);
	}

	private resetModuleState(name: ModuleName): void {
		switch (name) {
			case "sort":
				this.sortState = { columnKey: null, direction: null };
				break;
			case "filter":
				this.filterState = {};
				break;
			case "search":
				this.searchState = { term: "" };
				break;
			case "pagination":
				this.paginationState = { currentPage: 1, pageSize: 10 };
				break;
			case "column":
				this.columnState = { hidden: [] };
				break;
		}
	}

	private getModuleInstance<M extends TableModule>(
		name: ModuleName,
		factory: () => M,
	): M {
		const existing = this.instances.get(name);
		if (existing) return existing as M;

		const created = factory();
		this.instances.set(name, created);
		return created;
	}

	// ---- Modules (getters) ----

	public get sort() {
		if (!this.isModuleEnabled("sort")) return null;
		return this.getModuleInstance("sort", () => new SortModule<T>(this));
	}

	public get filter() {
		if (!this.isModuleEnabled("filter")) return null;
		return this.getModuleInstance(
			"filter",
			() => new FilterModule<T>(this),
		);
	}

	public get column() {
		if (!this.isModuleEnabled("column")) return null;
		return this.getModuleInstance(
			"column",
			() => new ColumnModule<T>(this),
		);
	}

	public get search() {
		if (!this.isModuleEnabled("search")) return null;
		return this.getModuleInstance(
			"search",
			() => new SearchModule<T>(this),
		);
	}

	public get pagination() {
		if (!this.isModuleEnabled("pagination")) return null;
		return this.getModuleInstance(
			"pagination",
			() => new PaginationModule<T>(this),
		);
	}

	// ---- State getters (copies) ----

	public getSortState(): SortState {
		return { ...this.sortState };
	}

	public getFilterState(): FilterState {
		return { ...this.filterState };
	}

	public getSearchState(): SearchState {
		return { ...this.searchState };
	}

	public getPaginationState(): PaginationState {
		return { ...this.paginationState };
	}

	public getColumnState(): ColumnState {
		return { ...this.columnState };
	}

	// ---- State updaters ----

	public updateSortState(state: Partial<SortState>): void {
		this.sortState = { ...this.sortState, ...state };
		this.notifyChange();
	}

	public updateFilterState(state: FilterState): void {
		this.filterState = { ...this.filterState, ...state };
		this.notifyChange();
	}

	public updateSearchState(state: Partial<SearchState>): void {
		this.searchState = { ...this.searchState, ...state };
		this.notifyChange();
	}

	public updatePaginationState(state: Partial<PaginationState>): void {
		this.paginationState = { ...this.paginationState, ...state };
		this.notifyChange();
	}

	public updateColumnState(state: Partial<ColumnState>): void {
		this.columnState = { ...this.columnState, ...state };
		this.notifyChange();
	}

	// ---- Lifecycle ----

	public reset(): void {
		this.enabled.clear();

		this.sortState = { columnKey: null, direction: null };
		this.filterState = {};
		this.searchState = { term: "" };
		this.paginationState = { currentPage: 1, pageSize: 10 };
		this.columnState = { hidden: [] };

		for (const m of this.instances.values()) m.reset();
		for (const m of this.instances.values()) m.destroy();
		this.instances.clear();

		this.notifyChange();
	}

	public destroy(): void {
		for (const m of this.instances.values()) m.destroy();
		this.instances.clear();
		this.listeners.clear();
	}
}

// ---------------- Modules ----------------

class SortModule<T extends object> implements TableModule {
	constructor(private manager: TableManager<T>) {}

	public get state(): SortState {
		return this.manager.getSortState();
	}

	public setSort(columnKey: string, direction: "asc" | "desc"): void {
		this.manager.updateSortState({ columnKey, direction });
	}

	public clearSort(): void {
		this.manager.updateSortState({ columnKey: null, direction: null });
	}

	public reset(): void {}
	public destroy(): void {}
}

class FilterModule<T extends object> implements TableModule {
	constructor(private manager: TableManager<T>) {}

	public get state(): FilterState {
		return this.manager.getFilterState();
	}

	public setFilter(columnKey: string, value: unknown): void {
		this.manager.updateFilterState({ ...this.state, [columnKey]: value });
	}

	public removeFilter(columnKey: string): void {
		const next = { ...this.state };
		delete next[columnKey];
		this.manager.updateFilterState(next);
	}

	public clearFilters(): void {
		this.manager.updateFilterState({});
	}

	public reset(): void {}
	public destroy(): void {}
}

class ColumnModule<T extends object> implements TableModule {
	constructor(private manager: TableManager<T>) {}

	public get state(): ColumnState {
		return this.manager.getColumnState();
	}

	public hideColumn(columnKey: string): void {
		if (this.state.hidden.includes(columnKey)) return;
		this.manager.updateColumnState({
			hidden: [...this.state.hidden, columnKey],
		});
	}

	public showColumn(columnKey: string): void {
		this.manager.updateColumnState({
			hidden: this.state.hidden.filter((k) => k !== columnKey),
		});
	}

	public isColumnHidden(columnKey: string): boolean {
		return this.state.hidden.includes(columnKey);
	}

	public reset(): void {}
	public destroy(): void {}
}

class SearchModule<T extends object> implements TableModule {
	constructor(private manager: TableManager<T>) {}

	public get state(): SearchState {
		return this.manager.getSearchState();
	}

	public setSearch(term: string): void {
		this.manager.updateSearchState({ term });
	}

	public clearSearch(): void {
		this.manager.updateSearchState({ term: "" });
	}

	public reset(): void {}
	public destroy(): void {}
}

class PaginationModule<T extends object> implements TableModule {
	constructor(private manager: TableManager<T>) {}

	public get state(): PaginationState {
		return this.manager.getPaginationState();
	}

	public setPage(page: number): void {
		this.manager.updatePaginationState({ currentPage: page });
	}

	public setPageSize(pageSize: number): void {
		this.manager.updatePaginationState({ pageSize });
	}

	public reset(): void {}
	public destroy(): void {}
}
