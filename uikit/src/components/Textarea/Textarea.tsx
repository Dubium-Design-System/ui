import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  after?: ReactNode;
  before?: ReactNode;
  label?: string;
  required?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, before, after, required, ...props }, ref) => {
    /** Уникальный ID для связи label и textarea. */
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
          {before || null}

          <textarea id={id} ref={ref} required={required} {...props} />

          {after || null}
        </div>
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
