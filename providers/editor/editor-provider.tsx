import { EditorBtns } from "@/utils/constants";
import { EditorAction } from "./editor-actions";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement = {
	id: string;
	styles: React.CSSProperties;
	name: string;
	type: EditorBtns;
	content: EditorElement[] | {};
};

export type Editor = {
	liveMode: boolean;
	elements: EditorElement[];
	selectedElement: EditorElement;
	device: DeviceTypes;
	previewMode: boolean;
	pageId: string;
};

export type HistoryState = {
	history: Editor[];
	currentIndex: number;
};

export type EditorState = {
	editor: Editor;
	history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
	elements: [
		{
			content: [],
			id: "__body",
			name: "Body",
			styles: {},
			type: "__body",
		},
	],
	selectedElement: {
		id: "",
		content: [],
		name: "",
		styles: {},
		type: null,
	},
	device: "Desktop",
	previewMode: false,
	liveMode: false,
	pageId: "",
};

const initialHistoryState: HistoryState = {
	history: [initialEditorState],
	currentIndex: 0,
};

const initialState: EditorState = {
	editor: initialEditorState,
	history: initialHistoryState,
};
