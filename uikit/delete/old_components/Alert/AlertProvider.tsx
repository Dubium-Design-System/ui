import { useState, ReactNode, CSSProperties, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "./Alert";
import { Portal } from "../Portal/Portal";
import {
	AlertContext,
	type AlertOptions,
	type AlertType,
} from "./AlertContext";

type Position =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-right";

interface AlertProviderProps {
	children: ReactNode;
	position?: Position;
	defaultDuration?: number;
}

// Провайдер для уведомлений
export const AlertProvider = ({
	children,
	position = "top-right",
	defaultDuration = 3000,
}: AlertProviderProps) => {
	// Валидация входных параметров
	if (defaultDuration <= 0) {
		console.warn(
			"defaultDuration must be a positive number. Using default value 3000ms."
		);
		defaultDuration = 3000;
	}

	const [alerts, setAlerts] = useState<
		{ message: string; id: number; timeout: number; type: AlertType }[]
	>([]);
	const timeoutsRef = useRef<{
		[key: number]: ReturnType<typeof setTimeout>;
	}>({});
	const [adaptivePosition, setAdaptivePosition] =
		useState<Position>(position);

	useEffect(() => {
		const updatePosition = () => {
			if (window.innerWidth < 1200) {
				setAdaptivePosition("top-center");
			} else {
				setAdaptivePosition(position);
			}
		};

		updatePosition();
		const resizeHandler = () => {
			try {
				updatePosition();
			} catch (error) {
				console.error("Error updating alert position:", error);
			}
		};

		window.addEventListener("resize", resizeHandler);
		return () => window.removeEventListener("resize", resizeHandler);
	}, [position]);

	useEffect(() => {
		// Сохраняем текущее значение ref в переменную
		const currentTimeouts = timeoutsRef.current;

		return () => {
			// Очищаем все таймеры при размонтировании
			Object.values(currentTimeouts).forEach((timeout) => {
				if (timeout) clearTimeout(timeout);
			});
		};
	}, []);

	const addAlert = ({ message, type = "success", timeout }: AlertOptions) => {
		if (!message) {
			console.error("Alert message cannot be empty");
			return;
		}

		try {
			const id = Date.now();
			let alertTimeout = timeout ?? defaultDuration; // Изменено с const на let

			if (alertTimeout <= 0) {
				console.warn(
					"Alert timeout must be a positive number. Using default duration."
				);
				alertTimeout = defaultDuration;
			}

			setAlerts((prev) => [
				{ message, id, timeout: alertTimeout, type },
				...prev,
			]);

			// Очищаем предыдущий таймаут, если он существует
			if (timeoutsRef.current[id]) {
				clearTimeout(timeoutsRef.current[id]);
			}

			timeoutsRef.current[id] = setTimeout(() => {
				try {
					removeAlert(id);
				} catch (error) {
					console.error("Error removing alert:", error);
				}
			}, alertTimeout);
		} catch (error) {
			console.error("Error adding alert:", error);
		}
	};

	const removeAlert = (id: number) => {
		try {
			if (timeoutsRef.current[id]) {
				clearTimeout(timeoutsRef.current[id]);
				delete timeoutsRef.current[id];
			}
			setAlerts((prev) => {
				if (!prev.some((alert) => alert.id === id)) {
					console.warn(`Alert with id ${id} not found`);
					return prev;
				}
				return prev.filter((alert) => alert.id !== id);
			});
		} catch (error) {
			console.error("Error removing alert:", error);
		}
	};

	const getPositionStyle = (): CSSProperties => {
		try {
			switch (adaptivePosition) {
				case "top-left":
					return { top: "10px", left: "10px" };
				case "top-center":
					return {
						top: "10px",
						left: "50%",
						transform: "translateX(-50%)",
					};
				case "top-right":
					return { top: "10px", right: "10px" };
				case "bottom-left":
					return { bottom: "10px", left: "10px" };
				case "bottom-right":
					return { bottom: "10px", right: "10px" };
				default:
					console.warn(
						`Unknown position: ${adaptivePosition}. Using top-right.`
					);
					return { top: "10px", right: "10px" };
			}
		} catch (error) {
			console.error("Error calculating position style:", error);
			return { top: "10px", right: "10px" }; // Fallback position
		}
	};

	return (
		<AlertContext.Provider value={addAlert}>
			{children}
			<Portal>
				<div
					style={{
						position: "fixed",
						zIndex: 9999,
						...getPositionStyle(),
						maxWidth: "100%",
						boxSizing: "border-box",
						padding: "0 10px",
					}}
				>
					<AnimatePresence>
						{alerts.map((alert) => (
							<motion.div
								key={alert.id}
								className={"animatedTransform"}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.3 }}
								style={{ marginBottom: "10px" }}
							>
								<Alert
									message={alert.message}
									onClose={() => removeAlert(alert.id)}
									type={alert.type}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</Portal>
		</AlertContext.Provider>
	);
};
