"use client";

import { useEditor } from "@/providers/editor/editor-provider";
import { Page } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
	pageId: string;
	pageDetails: Page;
};

export default function PageEditorNavigation({ pageId, pageDetails }: Props) {
	const router = useRouter();
	const { state, dispatch } = useEditor();

	useEffect(() => {
		dispatch({
			type: "SET_PAGE_ID",
			payload: { pageId: pageId },
		});
	}, [pageId]);

	return <div>FunnelEditorNavigation</div>;
}
