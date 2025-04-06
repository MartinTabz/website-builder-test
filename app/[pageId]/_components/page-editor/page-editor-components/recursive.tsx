import { EditorElement } from "@/providers/editor/editor-provider";
import TextComponent from "./text";
import Container from "./container";

type Props = {
	element: EditorElement;
};

export default function Recursive({ element }: Props) {
	switch (element.type) {
		case "text":
			return <TextComponent element={element} />;
		case "__body":
			return <Container element={element} />;
		default:
			return null;
	}
}
