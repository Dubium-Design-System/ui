import type { Column } from "../components/Table/types";

// Тип для данных таблицы
export interface SampleDataItem {
	id?: string;
	name: string;
	age: number;
	email: string;
}

// Пример колонок для таблицы
export const sampleColumns: Column<SampleDataItem>[] = [
	{
		title: "Имя",
		dataIndex: "name",
		alignCell: "left",
	},
	{
		title: "Возраст",
		dataIndex: "age",
		alignCell: "center",
	},
	{
		title: "Email",
		dataIndex: "email",
		alignCell: "left",
	},
];

// Пример данных для таблицы (25 записей)
export const sampleData: SampleDataItem[] = [
	{ id: "1", name: "Иван Иванов", age: 30, email: "ivan@example.com" },
	{ id: "2", name: "Мария Петрова", age: 25, email: "maria@example.com" },
	{ id: "3", name: "Алексей Сидоров", age: 35, email: "alexey@example.com" },
	{ id: "4", name: "Елена Васильева", age: 28, email: "elena@example.com" },
	{ id: "5", name: "Дмитрий Козлов", age: 42, email: "dmitry@example.com" },
	{ id: "6", name: "Анна Морозова", age: 31, email: "anna@example.com" },
	{ id: "7", name: "Сергей Новиков", age: 38, email: "sergey@example.com" },
	{ id: "8", name: "Ольга Лебедева", age: 29, email: "olga@example.com" },
	{ id: "9", name: "Андрей Павлов", age: 45, email: "andrey@example.com" },
	{
		id: "10",
		name: "Татьяна Семенова",
		age: 26,
		email: "tatiana@example.com",
	},
	{ id: "11", name: "Михаил Волков", age: 33, email: "mikhail@example.com" },
	{
		id: "12",
		name: "Наталья Зайцева",
		age: 37,
		email: "natalia@example.com",
	},
	{ id: "13", name: "Артем Федоров", age: 24, email: "artem@example.com" },
	{ id: "14", name: "Юлия Михайлова", age: 32, email: "yulia@example.com" },
	{
		id: "15",
		name: "Владимир Смирнов",
		age: 39,
		email: "vladimir@example.com",
	},
	{
		id: "16",
		name: "Екатерина Иванова",
		age: 27,
		email: "ekaterina@example.com",
	},
	{ id: "17", name: "Игорь Соколов", age: 41, email: "igor@example.com" },
	{
		id: "18",
		name: "Светлана Орлова",
		age: 34,
		email: "svetlana@example.com",
	},
	{
		id: "19",
		name: "Николай Абрамов",
		age: 44,
		email: "nikolay@example.com",
	},
	{
		id: "20",
		name: "Виктория Андреева",
		age: 30,
		email: "viktoria@example.com",
	},
	{
		id: "21",
		name: "Константин Никифоров",
		age: 36,
		email: "konstantin@example.com",
	},
	{ id: "22", name: "Алина Кузнецова", age: 23, email: "alina@example.com" },
	{ id: "23", name: "Роман Макаров", age: 40, email: "roman@example.com" },
	{ id: "24", name: "Дарья Алексеева", age: 28, email: "darya@example.com" },
	{
		id: "25",
		name: "Станислав Белов",
		age: 43,
		email: "stanislav@example.com",
	},
];
