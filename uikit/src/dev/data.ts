import type { ReactNode } from "react";

export interface User {
	id: string;
	name: string;
	email: string;
	age: number;
	address: string;
	phone: string;
	role: string;
	createAt: string;
	updateAt: string;
}

export type TableAlign = "left" | "center" | "right";

export interface Column<T extends object> {
	key: string;
	title: string;
	dataIndex?: keyof T;
	width?: number;
	alignHeader?: TableAlign;
	alignCell?: TableAlign;
	searchable?: boolean;
	render?: (args: {
		value: unknown;
		record: T;
		column: Column<T>;
		index: number;
	}) => ReactNode;
}

export const users: User[] = [
	{
		id: "1",
		name: "Mikhail Ivanov",
		email: "mikhail.ivanov@test.dev",
		age: 29,
		address: "Moscow, Tverskaya St, 12",
		phone: "+7-999-111-22-33",
		role: "Tech Lead",
		createAt: "2026-01-10",
		updateAt: "2026-03-28",
	},
	{
		id: "2",
		name: "Ivan Petrov",
		email: "ivan.petrov@test.dev",
		age: 25,
		address: "Saint Petersburg, Nevsky Ave, 45",
		phone: "+7-999-222-33-44",
		role: "Frontend Developer",
		createAt: "2026-01-12",
		updateAt: "2026-03-22",
	},
	{
		id: "3",
		name: "Petr Sidorov",
		email: "petr.sidorov@test.dev",
		age: 31,
		address: "Kazan, Bauman St, 18",
		phone: "+7-999-333-44-55",
		role: "Backend Developer",
		createAt: "2026-01-15",
		updateAt: "2026-03-30",
	},
	{
		id: "4",
		name: "Anna Smirnova",
		email: "anna.smirnova@test.dev",
		age: 27,
		address: "Yekaterinburg, Lenin Ave, 7",
		phone: "+7-999-444-55-66",
		role: "UI Designer",
		createAt: "2026-01-18",
		updateAt: "2026-03-26",
	},
	{
		id: "5",
		name: "Sergey Volkov",
		email: "sergey.volkov@test.dev",
		age: 34,
		address: "Novosibirsk, Sovetskaya St, 33",
		phone: "+7-999-555-66-77",
		role: "DevOps Engineer",
		createAt: "2026-01-20",
		updateAt: "2026-03-25",
	},
	{
		id: "6",
		name: "Elena Kozlova",
		email: "elena.kozlova@test.dev",
		age: 30,
		address: "Samara, Gagarina St, 21",
		phone: "+7-999-666-77-88",
		role: "Project Manager",
		createAt: "2026-01-24",
		updateAt: "2026-03-24",
	},
	{
		id: "7",
		name: "Dmitry Morozov",
		email: "dmitry.morozov@test.dev",
		age: 28,
		address: "Nizhny Novgorod, Bolshaya Pokrovskaya, 10",
		phone: "+7-999-777-88-99",
		role: "QA Engineer",
		createAt: "2026-01-27",
		updateAt: "2026-03-20",
	},
	{
		id: "8",
		name: "Olga Fedorova",
		email: "olga.fedorova@test.dev",
		age: 26,
		address: "Rostov-on-Don, Pushkinskaya St, 14",
		phone: "+7-999-888-99-00",
		role: "Frontend Developer",
		createAt: "2026-02-01",
		updateAt: "2026-03-18",
	},
	{
		id: "9",
		name: "Alexey Pavlov",
		email: "alexey.pavlov@test.dev",
		age: 32,
		address: "Krasnodar, Severnaya St, 56",
		phone: "+7-999-101-20-30",
		role: "Backend Developer",
		createAt: "2026-02-03",
		updateAt: "2026-03-19",
	},
	{
		id: "10",
		name: "Natalia Orlova",
		email: "natalia.orlova@test.dev",
		age: 24,
		address: "Ufa, October Ave, 63",
		phone: "+7-999-202-30-40",
		role: "HR Manager",
		createAt: "2026-02-05",
		updateAt: "2026-03-21",
	},
	{
		id: "11",
		name: "Kirill Lebedev",
		email: "kirill.lebedev@test.dev",
		age: 33,
		address: "Chelyabinsk, Kirova St, 9",
		phone: "+7-999-303-40-50",
		role: "System Analyst",
		createAt: "2026-02-08",
		updateAt: "2026-03-17",
	},
	{
		id: "12",
		name: "Maria Nikolaeva",
		email: "maria.nikolaeva@test.dev",
		age: 28,
		address: "Perm, Lenin St, 40",
		phone: "+7-999-404-50-60",
		role: "Product Manager",
		createAt: "2026-02-10",
		updateAt: "2026-03-16",
	},
	{
		id: "13",
		name: "Andrey Zaitsev",
		email: "andrey.zaitsev@test.dev",
		age: 35,
		address: "Voronezh, Mira St, 27",
		phone: "+7-999-505-60-70",
		role: "Security Engineer",
		createAt: "2026-02-13",
		updateAt: "2026-03-15",
	},
	{
		id: "14",
		name: "Svetlana Belova",
		email: "svetlana.belova@test.dev",
		age: 29,
		address: "Volgograd, Rabochaya St, 11",
		phone: "+7-999-606-70-80",
		role: "Support Engineer",
		createAt: "2026-02-15",
		updateAt: "2026-03-14",
	},
	{
		id: "15",
		name: "Roman Egorov",
		email: "roman.egorov@test.dev",
		age: 27,
		address: "Omsk, Karl Marx Ave, 52",
		phone: "+7-999-707-80-90",
		role: "Mobile Developer",
		createAt: "2026-02-18",
		updateAt: "2026-03-12",
	},
];

export const columns = [
	{
		key: "id",
		title: "ID",
		dataIndex: "id",
		width: 80,
		searchable: true,
	},
	{
		key: "name",
		title: "Name",
		dataIndex: "name",
		searchable: true,
	},
	{
		key: "email",
		title: "Email",
		dataIndex: "email",
		searchable: true,
	},
	{
		key: "age",
		title: "Age",
		dataIndex: "age",
		width: 100,
		alignHeader: "center",
		alignCell: "center",
		searchable: true,
	},
	{
		key: "address",
		title: "Address",
		dataIndex: "address",
		searchable: true,
	},
	{
		key: "phone",
		title: "Phone",
		dataIndex: "phone",
		searchable: true,
	},
	{
		key: "role",
		title: "Role",
		dataIndex: "role",
		searchable: true,
	},
	{
		key: "createAt",
		title: "Created At",
		dataIndex: "createAt",
		searchable: true,
	},
	{
		key: "updateAt",
		title: "Updated At",
		dataIndex: "updateAt",
		searchable: true,
	},
] satisfies Column<User>[];
