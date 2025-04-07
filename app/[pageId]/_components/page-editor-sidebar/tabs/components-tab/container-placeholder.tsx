import { EditorBtns } from "@/utils/constants";

type Props = {};

export default function ContainerPlaceholder(props: Props) {
	const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
		if (type === null) return;
		e.dataTransfer.setData("componentType", type);
	};

	return (
		<div
			draggable
			onDragStart={(e) => handleDragState(e, "container")}
			className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
		>
			<div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" />
		</div>
	);
}
