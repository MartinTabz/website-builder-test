"use client";

import { Badge } from "@/components/ui/badge";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import { defaultStyles, EditorBtns } from "@/utils/constants";
import clsx from "clsx";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { Trash } from "lucide-react";

type Props = {
	element: EditorElement;
};

export default function Container({ element }: Props) {
	const { dispatch, state } = useEditor();

	const handleOnDrop = (e: React.DragEvent, type: string) => {
		e.stopPropagation();
		const componentType = e.dataTransfer.getData("componentType") as EditorBtns;

		switch (componentType) {
			case "text":
				dispatch({
					type: "ADD_ELEMENT",
					payload: {
						containerId: element.id,
						elementDetails: {
							content: { innerText: "Textový blok" },
							id: v4(),
							name: "Text",
							styles: {
								color: "#000000",
								...defaultStyles,
							},
							type: "text",
						},
					},
				});
			case "container":
				dispatch({
					type: "ADD_ELEMENT",
					payload: {
						containerId: element.id,
						elementDetails: {
							content: [],
							id: v4(),
							name: "Kontejner",
							styles: {
								...defaultStyles,
							},
							type: "container",
						},
					},
				});
			default:
				break;
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDragStart = (e: React.DragEvent, type: string) => {
		if (type === "__body") return;
		e.dataTransfer.setData("componentType", type);
	};

	const handleOnClickBody = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch({
			type: "CHANGE_CLICKED_ELEMENT",
			payload: {
				elementDetails: element,
			},
		});
	};

	const handleDeleteElement = () => {
		dispatch({
			type: "DELETE_ELEMENT",
			payload: { elementDetails: element },
		});
	};

	return (
		<div
			style={element.styles}
			className={clsx("relative p-4 transition-all group", {
				"max-w-full w-full":
					element.type === "container" || element.type === "2Col",
				"h-fit": element.type === "container",
				"h-full": element.type === "__body",
				"flex flex-col md:!flex-row": element.type === "2Col",

				"!border-blue-500":
					state.editor.selectedElement.id === element.id &&
					!state.editor.liveMode &&
					state.editor.selectedElement.type !== "__body",

				"!border-yellow-400 !border-4":
					state.editor.selectedElement.id === element.id &&
					!state.editor.liveMode &&
					state.editor.selectedElement.type === "__body",

				"!border-solid":
					state.editor.selectedElement.id === element.id &&
					!state.editor.liveMode,

				"border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
			})}
			onDrop={(e) => handleOnDrop(e, element.id)}
			onDragOver={handleDragOver}
			draggable={element.type !== "__body"}
			onDragStart={(e) => handleDragStart(e, "container")}
			onClick={handleOnClickBody}
		>
			<Badge
				className={clsx(
					"absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
					{
						block:
							state.editor.selectedElement.id === element.id &&
							!state.editor.liveMode,
					}
				)}
			>
				{element.name}
			</Badge>

			{Array.isArray(element.content) &&
				element.content.map((childElement) => (
					<Recursive key={childElement.id} element={childElement} />
				))}

			{state.editor.selectedElement.id === element.id &&
				!state.editor.liveMode &&
				state.editor.selectedElement.type !== "__body" && (
					<div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg">
						<Trash size={16} onClick={handleDeleteElement} />
					</div>
				)}
		</div>
	);
}
