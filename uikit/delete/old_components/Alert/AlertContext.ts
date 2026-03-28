import { createContext } from "react"

export type AlertType = "success" | "error" | "info"

export interface AlertOptions {
	message: string
	type?: AlertType
	timeout?: number
}

type AlertContextType = (options: AlertOptions) => void
export const AlertContext = createContext<AlertContextType | undefined>(undefined)
