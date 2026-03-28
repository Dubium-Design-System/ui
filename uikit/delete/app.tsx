import { useState } from "react";
import { Button, Image, Input } from "../delete/old_components";

const InputValue = () => {
	const [value, setValue] = useState<string>("");

	return (
		<Input
			label="Привет"
			name="Qwerty"
			value={value}
			onChange={({ target }) => {
				setValue(target.value);
				console.log({ onChange: target.value });
			}}
			onInput={({ target }) => {
				console.log({ onInput: target.value });
			}}
			required
			placeholder="Какой-то текст"
			error={false}
			autoFocus
		/>
	);
};

export const App = () => {
	return (
		<div style={{ width: "1200px", margin: "15px auto" }}>
			<Button>Button</Button>

			<Image
				src="https://picsum.photos/600/400.jpg"
				webpSrc="https://picsum.photos/600/400.webp"
				aspectRatio="16/9"
				objectFit="cover"
				objectPosition="center"
				width="960px"
				loading="lazy"
				alt="Какой-то длинный текст"
				errorComponent={<div>Ошибка загрузки изображения</div>}
			/>

			<InputValue />
		</div>
	);
};
