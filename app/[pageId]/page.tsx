import EditorProvider from "@/providers/editor/editor-provider";
import { notFound } from "next/navigation";
import PageEditorNavigation from "./_components/page-editor-navigation";
import { getSupabase } from "@/lib/supabase";

type Props = {
	params: Promise<{ pageId: string }>;
};

export default async function FunnelPage({ params }: Props) {
	const { pageId } = await params;

	const supabase = getSupabase();

	const { data: pageDetails, error: pageErr } = await supabase
		.from("pages")
		.select("*")
		.eq("id", pageId)
		.single();

	if (pageErr && pageErr.details != "The result contains 0 rows") {
		console.error(pageErr);
		throw new Error("Něco se pokazilo při načítání stránky");
	}

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
