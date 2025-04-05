"use client";

import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusEventHandler, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

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

	const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
		event
	) => {
		if (event.target.value === pageDetails.name) return;
		if (event.target.value) {
			const supabase = createClient();

			const { error } = await supabase
				.from("pages")
				.update({ name: event.target.value })
				.eq("id", pageId)
				.select();

			if (error) {
				console.error(error);
				toast("Ups", { description: "Něco se pokazilo při úpravě názvu" });
			} else {
				toast("Skvěle", { description: "Název stránky byl úspěšně upraven" });
				router.refresh();
			}
		} else {
			toast("Ups", { description: "Stránka musí mít název" });
			event.target.value = pageDetails.name;
		}
	};

	return (
		<TooltipProvider>
			<nav
				className={clsx(
					"border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all",
					{ "!h-0 !p-0 !overflow-hidden": state.editor.previewMode }
				)}
			>
				<aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
					<Link href={"/"}>
						<ArrowLeftCircle />
					</Link>
					<div className="flex flex-col w-full">
						<Input
							defaultValue={pageDetails.name}
							className="border-none h-5 m-0 p-0 text-lg"
							onBlur={handleOnBlurTitleChange}
						/>
						<span className="text-sm text-muted-foreground">
							Cesta: /{pageDetails.path_name}
						</span>
					</div>
				</aside>
			</nav>
		</TooltipProvider>
	);
}
