import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import "./Alert.scss";
import { CloseIcon } from "../icon/CloseIcon";

/**
 * Пропсы для компонента Alert.
 */
export interface AlertProps {
	/**
	 * Текст сообщения в уведомлении.
	 *
	 * @example
	 * <Alert message="Операция выполнена успешно" onClose={handleClose} />
	 */
	message: string;

	/**
	 * Функция, вызываемая при закрытии уведомления.
	 *
	 * @example
	 * const handleClose = () => {
	 *   console.log("Уведомление закрыто")
	 * }
	 *
	 * <Alert message="Ошибка загрузки" onClose={handleClose} />
	 */
	onClose(): void;

	/**
	 * Тип уведомления, влияющий на его стиль.
	 * - `"success"` — успешное уведомление (зеленый).
	 * - `"error"` — уведомление об ошибке (красный).
	 * - `"info"` — информационное уведомление (синий).
	 *
	 * @default "default"
	 *
	 * @example
	 * <Alert message="Файл загружен" type="success" onClose={handleClose} />
	 */
	type?: "success" | "error" | "info";
}

/**
 * Компонент уведомления.
 *
 * @param message - Текст уведомления.
 * @param onClose - Функция для закрытия уведомления.
 * @param type - Тип уведомления (по умолчанию `"default"`).
 *
 * @returns JSX-элемент уведомления.
 *
 * @example
 * <Alert message="Не удалось сохранить данные" type="error" onClose={handleClose} />
 */
export const Alert: FC<AlertProps> = ({
	message,
	onClose,
	type = "success",
}) => (
	<AnimatePresence>
		<motion.div
			className={classNames("alert", [type], "animatedTransform")}
		>
			<div className="alert_text">{message}</div>

			<button className="alert_button" onClick={onClose}>
				<CloseIcon size={24} color="currentColor" />
			</button>
		</motion.div>
	</AnimatePresence>
);

Alert.displayName = "Alert";
