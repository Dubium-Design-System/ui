import { useContext } from "react"
import { AlertContext } from "./AlertContext"

// Определяем тип для контекста уведомлений
type AlertOptions = { message: string; type?: "success" | "error" | "info"; timeout?: number }

type AlertContextType = (options: AlertOptions) => void

// Хук для использования уведомлений
export const useAlert = (): AlertContextType => {
	const context = useContext(AlertContext)
	if (!context) {
		throw new Error("useAlert должен использоваться внутри AlertProvider")
	}
	return context
}
