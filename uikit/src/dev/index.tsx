import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Switch } from "../components/Switch/Switch";
import { DUIProvider } from "../providers/DUIProvider";
import { AppIcon } from "./assets/AppIcon";
import { ImageDocs } from "./image-doc";

import style from "./global.module.scss";
import clsx from "clsx";
import { appIcons } from "./assets/icons";

// TODO: с табами проверить <Activity />

export const App = () => {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<DUIProvider icons={appIcons}>
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

					<div style={{ color: "blue" }}>
						{/* Базовая иконка Close */}
						<AppIcon name="User" color="#fff" />

						<AppIcon name="Settings" color="red" />

						{/* С кастомным размером и цветом */}
						<AppIcon name="Close" size={32} color="red" />

						{/* С поворотом на 45 градусов */}
						<AppIcon name="Close" size={40} color="#333" deg={45} />

						{/* С обработчиком клика */}
						<AppIcon
							name="Close"
							onClick={() => console.log("Clicked!")}
						/>
					</div>
				</div>

				<ImageDocs />
			</div>
		</DUIProvider>
	);
};
