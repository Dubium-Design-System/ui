import { useRef, useEffect, type Ref } from "react";

/**
 * Комбинирует несколько ref в один
 * @template T - Тип DOM-элемента
 * @param refs - Массив ref (callback ref, object ref, mutable ref)
 * @returns Единый ref, который обновляет все переданные ref
 */
export const useCombinedRefs = <T>(
	...refs: Array<Ref<T> | null | undefined>
) => {
	const targetRef = useRef<T>(null);

	useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === "function") {
				ref(targetRef.current);
			} else if ("current" in ref) {
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef;
};
