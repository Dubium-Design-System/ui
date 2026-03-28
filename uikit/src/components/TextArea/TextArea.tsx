import {
	forwardRef,
	useId,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";

export interface TextAreaProps
	extends InputHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	before?: ReactNode;
	after?: ReactNode;
	required?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, before, after, required, ...props }, ref) => {
		const id = useId();

		return (
			<div>
				{label ? (
					<label htmlFor={id}>
						<span>{label}</span>
						{required ? <span>*</span> : null}
					</label>
				) : null}

				<div>
					{before ? before : null}

					<textarea
						ref={ref}
						id={id}
						required={required}
						{...props}
					/>

					{after ? after : null}
				</div>
			</div>
		);
	},
);

TextArea.displayName = "TextArea";
