import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Switch } from "../components/Switch/Switch";

import style from "./global.module.scss";
import clsx from "clsx";

// TODO: с табами проверить <Activity />

export const App = () => {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<>
			<div className={style.main}>
				<div
					style={{
						width: "210px",
					}}
				>
					<Switch
						checked={isChecked}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>,
						) => {
							setIsChecked(event.target.checked);
						}}
						label="Привет, это обязательный пункт заполнения"
						labelPosition="left"
					/>
				</div>
			</div>
			<div className={style.main}>
				<div className={clsx(style.buttons, style.white)}>
					<Button variant="primary">Primary</Button>

					<Button variant="primary-black">Primary Black</Button>
				</div>

				<div className={clsx(style.buttons, style.black)}>
					<Button variant="primary">Primary</Button>

					<Button variant="primary-white">Primary White</Button>
				</div>
			</div>
		</>
	);
};
