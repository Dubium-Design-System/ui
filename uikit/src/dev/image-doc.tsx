import { type ReactNode, useId, useMemo, useState } from "react";
import { Image } from "../components/Image";

const PREVIEW_BLUR =
	"https://ux-journal.ru/wp-content/uploads/2021/05/Screenshot-2021-05-30-at-22.30.09.png";

interface AccordionExample {
	id: string;
	title: string;
	description?: string;
	code: string;
	render: () => ReactNode;
}

const Code = ({ children }: { children: ReactNode }) => {
	return (
		<pre
			style={{
				margin: 0,
				padding: 16,
				overflowX: "auto",
				background: "#f7f7f7",
				borderRadius: 8,
				fontSize: 13,
				lineHeight: 1.5,
			}}
		>
			<code>{children}</code>
		</pre>
	);
};

const CustomLoader = () => {
	return (
		<div
			style={{
				display: "grid",
				placeItems: "center",
				width: "100%",
				height: "100%",
				background: "#f2f2f2",
				color: "#666",
				fontSize: 14,
			}}
		>
			Загрузка...
		</div>
	);
};

const Grid = ({ children }: { children: ReactNode }) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
				gap: 16,
				alignItems: "start",
			}}
		>
			{children}
		</div>
	);
};

interface AccordionItemProps {
	title: string;
	description?: string;
	code: string;
	isOpen: boolean;
	wasOpened: boolean;
	onToggle: () => void;
	render: () => ReactNode;
}

const AccordionItem = ({
	title,
	description,
	code,
	isOpen,
	wasOpened,
	onToggle,
	render,
}: AccordionItemProps) => {
	const reactId = useId();
	const buttonId = `${reactId}-button`;
	const panelId = `${reactId}-panel`;

	return (
		<section
			style={{
				border: "1px solid #e5e5e5",
				borderRadius: 12,
				overflow: "hidden",
				background: "#fff",
			}}
		>
			<button
				id={buttonId}
				type="button"
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={onToggle}
				style={{
					display: "grid",
					gridTemplateColumns: "1fr auto",
					gap: 16,
					width: "100%",
					padding: 20,
					border: 0,
					background: "#fff",
					textAlign: "left",
					cursor: "pointer",
				}}
			>
				<span>
					<span
						style={{
							display: "block",
							fontSize: 18,
							fontWeight: 600,
						}}
					>
						{title}
					</span>

					{description ? (
						<span
							style={{
								display: "block",
								marginTop: 6,
								color: "#666",
								lineHeight: 1.5,
							}}
						>
							{description}
						</span>
					) : null}

					<span
						style={{
							display: "block",
							marginTop: 8,
							color: wasOpened ? "#267a35" : "#999",
							fontSize: 13,
						}}
					>
						{isOpen
							? "Состояние: пример смонтирован"
							: wasOpened
								? "Состояние: пример размонтирован, уже открывался"
								: "Состояние: пример ещё не монтировался"}
					</span>
				</span>

				<span
					aria-hidden="true"
					style={{
						fontSize: 22,
						lineHeight: 1,
						transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
						transition: "transform 150ms ease",
					}}
				>
					+
				</span>
			</button>

			{isOpen ? (
				<div
					id={panelId}
					role="region"
					aria-labelledby={buttonId}
					style={{
						display: "grid",
						gap: 16,
						padding: "0 20px 20px",
					}}
				>
					<div
						style={{
							padding: 16,
							border: "1px solid #eee",
							borderRadius: 10,
						}}
					>
						{render()}
					</div>

					<Code>{code}</Code>
				</div>
			) : null}
		</section>
	);
};

export const ImageDocs = () => {
	const [openedIds, setOpenedIds] = useState<Set<string>>(() => new Set());
	const [openedOnceIds, setOpenedOnceIds] = useState<Set<string>>(
		() => new Set(),
	);
	const [events, setEvents] = useState<string[]>([]);

	const toggleAccordion = (id: string) => {
		setOpenedIds((prev) => {
			const next = new Set(prev);

			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}

			return next;
		});

		setOpenedOnceIds((prev) => {
			if (prev.has(id)) return prev;

			const next = new Set(prev);
			next.add(id);
			return next;
		});
	};

	const pushEvent = (event: string) => {
		setEvents((prev) => [event, ...prev].slice(0, 5));
	};

	const examples = useMemo<AccordionExample[]>(
		() => [
			{
				id: "basic",
				title: "1. Базовое использование",
				description:
					"Минимальный пример. Компонент Image монтируется только после открытия аккордиона.",
				code: `<Image
	src="https://picsum.photos/id/1018/600/400.jpg"
	alt="Горный пейзаж"
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1018/600/400.jpg"
						alt="Горный пейзаж"
						aspectRatio="16/9"
						width="100%"
						height="auto"
						objectFit="cover"
					/>
				),
			},
			{
				id: "webp",
				title: "2. WebP через sources",
				description:
					"Старый webpSrc заменён на универсальный sources. JPG остаётся fallback.",
				code: `<Image
	src="https://picsum.photos/id/1025/600/400.jpg"
	alt="Собака"
	sources={[
		{
			type: "image/webp",
			srcSet: "https://picsum.photos/id/1025/600/400.webp",
		},
	]}
	aspectRatio="3/2"
	width="100%"
	height="auto"
	objectFit="cover"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1025/600/400.jpg"
						alt="Собака"
						sources={[
							{
								type: "image/webp",
								srcSet: "https://picsum.photos/id/1025/600/400.webp",
							},
						]}
						aspectRatio="3/2"
						width="100%"
						height="auto"
						objectFit="cover"
					/>
				),
			},
			{
				id: "avif-webp-fallback",
				title: "3. AVIF / WebP / fallback",
				description:
					"Браузер выбирает первый подходящий source. Если source не загрузился, компонент отключит sources и попробует fallback src.",
				code: `<Image
	src="https://picsum.photos/id/1062/600/450.jpg"
	alt="Изображение товара"
	sources={[
		{
			type: "image/avif",
			srcSet: "https://picsum.photos/id/1062/600/450.avif",
		},
		{
			type: "image/webp",
			srcSet: "https://picsum.photos/id/1062/600/450.webp",
		},
	]}
	aspectRatio="4/3"
	width="100%"
	height="auto"
	objectFit="cover"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1062/600/450.jpg"
						alt="Изображение товара"
						sources={[
							{
								type: "image/avif",
								srcSet: "https://picsum.photos/id/1062/600/450.avif",
							},
							{
								type: "image/webp",
								srcSet: "https://picsum.photos/id/1062/600/450.webp",
							},
						]}
						aspectRatio="4/3"
						width="100%"
						height="auto"
						objectFit="cover"
					/>
				),
			},
			{
				id: "responsive-img",
				title: "4. Адаптивный srcSet для fallback img",
				description:
					"srcSet можно передавать массивом. Компонент сам нормализует его в строку.",
				code: `<Image
	src="https://picsum.photos/id/1035/600/338.jpg"
	alt="Адаптивное изображение"
	srcSet={[
		{ src: "https://picsum.photos/id/1035/320/180.jpg", width: 320 },
		{ src: "https://picsum.photos/id/1035/600/338.jpg", width: 600 },
		{ src: "https://picsum.photos/id/1035/1200/675.jpg", width: 1200 },
	]}
	sizes="(max-width: 768px) 100vw, 600px"
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1035/600/338.jpg"
						alt="Адаптивное изображение"
						srcSet={[
							{
								src: "https://picsum.photos/id/1035/320/180.jpg",
								width: 320,
							},
							{
								src: "https://picsum.photos/id/1035/600/338.jpg",
								width: 600,
							},
							{
								src: "https://picsum.photos/id/1035/1200/675.jpg",
								width: 1200,
							},
						]}
						sizes="(max-width: 768px) 100vw, 600px"
						aspectRatio="16/9"
						width="100%"
						height="auto"
						objectFit="cover"
					/>
				),
			},
			{
				id: "responsive-picture",
				title: "5. Полный responsive picture",
				description:
					"AVIF/WebP sources плюс fallback JPG srcSet. Все картинки появляются только после открытия.",
				code: `<Image
	src="https://picsum.photos/id/1043/600/338.jpg"
	alt="Карточка"
	sources={[
		{
			type: "image/avif",
			srcSet: [
				{ src: "https://picsum.photos/id/1043/320/180.avif", width: 320 },
				{ src: "https://picsum.photos/id/1043/600/338.avif", width: 600 },
				{ src: "https://picsum.photos/id/1043/1200/675.avif", width: 1200 },
			],
			sizes: "(max-width: 768px) 100vw, 600px",
		},
		{
			type: "image/webp",
			srcSet: [
				{ src: "https://picsum.photos/id/1043/320/180.webp", width: 320 },
				{ src: "https://picsum.photos/id/1043/600/338.webp", width: 600 },
				{ src: "https://picsum.photos/id/1043/1200/675.webp", width: 1200 },
			],
			sizes: "(max-width: 768px) 100vw, 600px",
		},
	]}
	srcSet={[
		{ src: "https://picsum.photos/id/1043/320/180.jpg", width: 320 },
		{ src: "https://picsum.photos/id/1043/600/338.jpg", width: 600 },
		{ src: "https://picsum.photos/id/1043/1200/675.jpg", width: 1200 },
	]}
	sizes="(max-width: 768px) 100vw, 600px"
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1043/600/338.jpg"
						alt="Карточка"
						sources={[
							{
								type: "image/avif",
								srcSet: [
									{
										src: "https://picsum.photos/id/1043/320/180.avif",
										width: 320,
									},
									{
										src: "https://picsum.photos/id/1043/600/338.avif",
										width: 600,
									},
									{
										src: "https://picsum.photos/id/1043/1200/675.avif",
										width: 1200,
									},
								],
								sizes: "(max-width: 768px) 100vw, 600px",
							},
							{
								type: "image/webp",
								srcSet: [
									{
										src: "https://picsum.photos/id/1043/320/180.webp",
										width: 320,
									},
									{
										src: "https://picsum.photos/id/1043/600/338.webp",
										width: 600,
									},
									{
										src: "https://picsum.photos/id/1043/1200/675.webp",
										width: 1200,
									},
								],
								sizes: "(max-width: 768px) 100vw, 600px",
							},
						]}
						srcSet={[
							{
								src: "https://picsum.photos/id/1043/320/180.jpg",
								width: 320,
							},
							{
								src: "https://picsum.photos/id/1043/600/338.jpg",
								width: 600,
							},
							{
								src: "https://picsum.photos/id/1043/1200/675.jpg",
								width: 1200,
							},
						]}
						sizes="(max-width: 768px) 100vw, 600px"
						aspectRatio="16/9"
						width="100%"
						height="auto"
						objectFit="cover"
					/>
				),
			},
			{
				id: "art-direction",
				title: "6. Art direction через media",
				description:
					"Разные изображения для mobile/desktop. Открой пример и измени ширину viewport.",
				code: `<Image
	src="https://picsum.photos/id/1050/900/506.jpg"
	alt="Главный баннер"
	sources={[
		{
			media: "(max-width: 767px)",
			type: "image/webp",
			srcSet: "https://picsum.photos/id/1050/500/700.webp",
		},
		{
			media: "(max-width: 767px)",
			type: "image/jpeg",
			srcSet: "https://picsum.photos/id/1050/500/700.jpg",
		},
		{
			media: "(min-width: 768px)",
			type: "image/webp",
			srcSet: "https://picsum.photos/id/1050/900/506.webp",
		},
	]}
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1050/900/506.jpg"
						alt="Главный баннер"
						sources={[
							{
								media: "(max-width: 767px)",
								type: "image/webp",
								srcSet: "https://picsum.photos/id/1050/500/700.webp",
							},
							{
								media: "(max-width: 767px)",
								type: "image/jpeg",
								srcSet: "https://picsum.photos/id/1050/500/700.jpg",
							},
							{
								media: "(min-width: 768px)",
								type: "image/webp",
								srcSet: "https://picsum.photos/id/1050/900/506.webp",
							},
						]}
						aspectRatio="16/9"
						width="100%"
						height="auto"
						objectFit="cover"
					/>
				),
			},
			{
				id: "density",
				title: "7. Density srcSet: 1x / 2x",
				description:
					"Подходит для аватаров, иконок и изображений фиксированного размера.",
				code: `<Image
	src="https://picsum.photos/id/1005/64/64.jpg"
	alt="Аватар пользователя"
	srcSet={[
		{ src: "https://picsum.photos/id/1005/64/64.jpg", density: 1 },
		{ src: "https://picsum.photos/id/1005/128/128.jpg", density: 2 },
	]}
	aspectRatio="1/1"
	width={64}
	height={64}
	objectFit="cover"
	style={{ borderRadius: "50%" }}
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1005/64/64.jpg"
						alt="Аватар пользователя"
						srcSet={[
							{
								src: "https://picsum.photos/id/1005/64/64.jpg",
								density: 1,
							},
							{
								src: "https://picsum.photos/id/1005/128/128.jpg",
								density: 2,
							},
						]}
						aspectRatio="1/1"
						width={64}
						height={64}
						objectFit="cover"
						style={{
							borderRadius: "50%",
						}}
					/>
				),
			},
			{
				id: "blur",
				title: "8. Blur placeholder",
				description:
					"При первом открытии виден blur placeholder. При повторном открытии cache должен убрать лишнее мигание.",
				code: `<Image
	src="https://picsum.photos/id/1067/600/400.jpg"
	alt="Изображение с blur placeholder"
	aspectRatio="3/2"
	width="100%"
	height="auto"
	objectFit="cover"
	placeholder="blur"
	blurDataURL="${PREVIEW_BLUR}"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1067/600/400.jpg"
						alt="Изображение с blur placeholder"
						aspectRatio="3/2"
						width="100%"
						height="auto"
						objectFit="cover"
						placeholder="blur"
						blurDataURL={PREVIEW_BLUR}
					/>
				),
			},
			{
				id: "loader",
				title: "9. Custom loader",
				description:
					"Показывает кастомный loader, пока изображение загружается.",
				code: `<Image
	src="https://picsum.photos/id/1074/600/400.jpg"
	alt="Изображение с loader"
	aspectRatio="3/2"
	width="100%"
	height="auto"
	objectFit="cover"
	loader={<CustomLoader />}
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1074/600/400.jpg"
						alt="Изображение с loader"
						aspectRatio="3/2"
						width="100%"
						height="auto"
						objectFit="cover"
						loader={<CustomLoader />}
					/>
				),
			},
			{
				id: "error",
				title: "10. Error state",
				description:
					"Демонстрация errorComponent. Здесь src намеренно сломан.",
				code: `<Image
	src="/broken-image.jpg"
	alt="Сломанное изображение"
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
	errorComponent={
		<div>
			Ошибка загрузки изображения
		</div>
	}
/>`,
				render: () => (
					<Image
						src="/broken-image.jpg"
						alt="Сломанное изображение"
						aspectRatio="16/9"
						width="100%"
						height="auto"
						objectFit="cover"
						errorComponent={
							<div
								style={{
									display: "grid",
									placeItems: "center",
									minHeight: 180,
									padding: 16,
									background: "#fff4f4",
									color: "#a40000",
									border: "1px solid #ffd1d1",
									borderRadius: 8,
								}}
							>
								Ошибка загрузки изображения
							</div>
						}
					/>
				),
			},
			{
				id: "container-img-props",
				title: "11. Props контейнера и props img",
				description:
					"className/style относятся к контейнеру. imgClassName/imgStyle относятся к img.",
				code: `<Image
	src="https://picsum.photos/id/1084/600/338.jpg"
	alt="Карточка товара"
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
	objectPosition="center"
	className="image-container"
	style={{
		borderRadius: 12,
		overflow: "hidden",
		border: "2px solid #ccc",
	}}
	imgClassName="image-element"
	imgStyle={{
		filter: "contrast(1.05)",
	}}
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1084/600/338.jpg"
						alt="Карточка товара"
						aspectRatio="16/9"
						width="100%"
						height="auto"
						objectFit="cover"
						objectPosition="center"
						className="image-container"
						style={{
							borderRadius: 12,
							overflow: "hidden",
							border: "2px solid #ccc",
						}}
						imgClassName="image-element"
						imgStyle={{
							filter: "contrast(1.05)",
						}}
					/>
				),
			},
			{
				id: "native-img-props",
				title: "12. Нативные img props",
				description:
					"Неконфликтующие props уходят напрямую в img через ...imgProps.",
				code: `<Image
	src="https://picsum.photos/id/1080/600/400.jpg"
	alt="Фотография"
	aspectRatio="3/2"
	width="100%"
	height="auto"
	objectFit="cover"
	loading="lazy"
	decoding="async"
	fetchPriority="low"
	crossOrigin="anonymous"
	referrerPolicy="no-referrer"
	draggable={false}
	data-testid="photo-image"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/1080/600/400.jpg"
						alt="Фотография"
						aspectRatio="3/2"
						width="100%"
						height="auto"
						objectFit="cover"
						loading="lazy"
						decoding="async"
						fetchPriority="low"
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
						draggable={false}
						data-testid="photo-image"
					/>
				),
			},
			{
				id: "events",
				title: "13. onLoad / onError",
				description:
					"Callback-и вызываются только после монтирования Image внутри открытого аккордиона.",
				code: `<Image
	src="https://picsum.photos/id/1024/600/338.jpg"
	alt="Фотография"
	aspectRatio="16/9"
	width="100%"
	height="auto"
	objectFit="cover"
	onLoad={() => {
	console.log("Изображение загружено");
	}}
	onError={() => {
	console.log("Ошибка загрузки изображения");
	}}
/>`,
				render: () => (
					<Grid>
						<Image
							src="https://picsum.photos/id/1024/600/338.jpg"
							alt="Фотография"
							aspectRatio="16/9"
							width="100%"
							height="auto"
							objectFit="cover"
							onLoad={() => {
								pushEvent("onLoad: изображение загружено");
							}}
							onError={() => {
								pushEvent("onError: ошибка загрузки");
							}}
						/>

						<div
							style={{
								padding: 12,
								background: "#f7f7f7",
								borderRadius: 8,
								minHeight: 80,
							}}
						>
							<strong>Events:</strong>

							{events.length > 0 ? (
								<ul
									style={{
										margin: "8px 0 0",
										paddingLeft: 18,
									}}
								>
									{events.map((event, index) => (
										<li key={`${event}-${index}`}>
											{event}
										</li>
									))}
								</ul>
							) : (
								<p style={{ margin: "8px 0 0", color: "#666" }}>
									Пока событий нет
								</p>
							)}
						</div>
					</Grid>
				),
			},
			{
				id: "decorative",
				title: "14. Декоративное изображение",
				description:
					'Для декоративных изображений передаём alt="" и aria-hidden.',
				code: `<Image
	src="https://picsum.photos/id/111/900/120.jpg"
	alt=""
	aspectRatio="auto"
	width="100%"
	height={120}
	objectFit="cover"
	aria-hidden="true"
/>`,
				render: () => (
					<Image
						src="https://picsum.photos/id/111/900/120.jpg"
						alt=""
						aspectRatio="auto"
						width="100%"
						height={120}
						objectFit="cover"
						aria-hidden="true"
					/>
				),
			},
			{
				id: "sizes",
				title: "15. Размеры контейнера",
				description:
					"width и height относятся к контейнеру компонента, а не к нативным атрибутам img.",
				code: `<Grid>
	<Image
		src="https://picsum.photos/id/1011/300/300.jpg"
		alt="Fixed size"
		aspectRatio="1/1"
		width={160}
		height={160}
		objectFit="cover"
	/>

	<Image
		src="https://picsum.photos/id/1016/600/338.jpg"
		alt="Fluid width"
		aspectRatio="16/9"
		width="100%"
		height="auto"
		objectFit="cover"
	/>

	<Image
		src="https://picsum.photos/id/1020/600/400.jpg"
		alt="Auto aspect ratio"
		aspectRatio="auto"
		width="100%"
		height={220}
		objectFit="cover"
	/>
</Grid>`,
				render: () => (
					<Grid>
						<Image
							src="https://picsum.photos/id/1011/300/300.jpg"
							alt="Fixed size"
							aspectRatio="1/1"
							width={160}
							height={160}
							objectFit="cover"
						/>

						<Image
							src="https://picsum.photos/id/1016/600/338.jpg"
							alt="Fluid width"
							aspectRatio="16/9"
							width="100%"
							height="auto"
							objectFit="cover"
						/>

						<Image
							src="https://picsum.photos/id/1020/600/400.jpg"
							alt="Auto aspect ratio"
							aspectRatio="auto"
							width="100%"
							height={220}
							objectFit="cover"
						/>
					</Grid>
				),
			},
		],
		[events],
	);

	return (
		<div
			style={{
				display: "grid",
				gap: 16,
				padding: 8,
				maxWidth: 1600,
				width: "100%",
				margin: "0 auto",
				fontFamily:
					"Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
			}}
		>
			<header
				style={{
					display: "grid",
					gap: 8,
					marginBottom: 8,
				}}
			>
				<h1 style={{ margin: 0, fontSize: 32 }}>Image component</h1>

				<p
					style={{
						margin: 0,
						color: "#666",
						lineHeight: 1.6,
						maxWidth: 820,
					}}
				>
					Каждый пример находится внутри аккордиона. Пока аккордион
					закрыт, компонент <code>Image</code> не монтируется и
					изображение не начинает загружаться.
				</p>
			</header>

			<div
				style={{
					display: "grid",
					gap: 12,
				}}
			>
				{examples.map((example) => (
					<AccordionItem
						key={example.id}
						title={example.title}
						description={example.description}
						code={example.code}
						isOpen={openedIds.has(example.id)}
						wasOpened={openedOnceIds.has(example.id)}
						onToggle={() => toggleAccordion(example.id)}
						render={example.render}
					/>
				))}
			</div>
		</div>
	);
};
