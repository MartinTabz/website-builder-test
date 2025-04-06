import { EditorElement } from "@/providers/editor/editor-provider";
import TextComponent from "./text";

type Props = {
	element: EditorElement;
};

export default function Recursive({ element }: Props) {
	switch (element.type) {
		case "text":
			return <TextComponent element={element} />;
		default:
			return null;
	}
}
