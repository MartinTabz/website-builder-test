import EditorProvider from "@/providers/editor/editor-provider";
import { pages } from "@/utils/data";
import { Page } from "@/utils/types";
import { notFound } from "next/navigation";
import PageEditorNavigation from "./_components/page-editor-navigation";

type Props = {
	params: Promise<{ pageId: string }>;
};

export default async function FunnelPage({ params }: Props) {
	const { pageId } = await params;

	const pageDetails = pages.find((page: Page) => page.id === pageId);

	if (pageDetails == undefined) {
		notFound();
	}

	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
			<EditorProvider pageId={pageId} pageDetails={pageDetails}>
				<PageEditorNavigation pageDetails={pageDetails} pageId={pageId} />
			</EditorProvider>
		</div>
	);
}
