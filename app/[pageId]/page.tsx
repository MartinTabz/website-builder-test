import EditorProvider from "@/providers/editor/editor-provider";
import { notFound } from "next/navigation";
import PageEditorNavigation from "./_components/page-editor-navigation";
import { createClient } from "@/utils/supabase/server";

type Props = {
	params: Promise<{ pageId: string }>;
};

export default async function FunnelPage({ params }: Props) {
	const { pageId } = await params;

	const supabase = await createClient();

	const { data: pageDetails } = await supabase
		.from("pages")
		.select("*")
		.eq("id", pageId)
		.single();

	if (!pageDetails) {
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
