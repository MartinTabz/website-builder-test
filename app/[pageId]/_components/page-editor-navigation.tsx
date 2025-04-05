"use client";

import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeviceTypes, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import {
	ArrowLeftCircle,
	EyeIcon,
	Laptop,
	Redo2,
	Smartphone,
	Tablet,
	Undo2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusEventHandler, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatDate } from "@/utils/client-helper-functions";

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
				.update({
					name: event.target.value,
					updated_at: new Date().toISOString(),
				})
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

	const handlePreviewClick = () => {
		dispatch({ type: "TOGGLE_PREVIEW_MODE" });
		dispatch({ type: "TOGGLE_LIVE_MODE" });
	};

	const handleUndo = () => {
		dispatch({ type: "UNDO" });
	};

	const handleRedo = () => {
		dispatch({ type: "REDO" });
	};

	const handleOnSave = async () => {
		const supabase = createClient();

		const { error } = await supabase
			.from("pages")
			.update({
				content: JSON.stringify(state.editor.elements),
				updated_at: new Date().toISOString(),
			})
			.eq("id", pageId)
			.select();

		if (error) {
			console.error(error);
			toast("Ups", { description: "Něco se pokazilo při ukládání" });
		} else {
			toast("Skvěle", { description: "Stránka byla uložena" });
			router.refresh();
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
							className="border-none h-5 m-0 p-0 text-lg focus:outline-none focus:border-none"
							onBlur={handleOnBlurTitleChange}
						/>
						<span className="text-sm text-muted-foreground">
							Cesta: /{pageDetails.path_name}
						</span>
					</div>
				</aside>
				<aside>
					<Tabs
						defaultValue="Desktop"
						className="w-fit"
						value={state.editor.device}
						onValueChange={(value) => {
							dispatch({
								type: "CHANGE_DEVICE",
								payload: { device: value as DeviceTypes },
							});
						}}
					>
						<TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
							<TabsTrigger
								value="Desktop"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
							>
								<Laptop />
							</TabsTrigger>

							<TabsTrigger
								value="Tablet"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
							>
								<Tablet />
							</TabsTrigger>

							<TabsTrigger
								value="Mobile"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
							>
								<Smartphone />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</aside>
				<aside className="flex items-center gap-2">
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800"
						onClick={handlePreviewClick}
					>
						<EyeIcon />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800"
						onClick={handleUndo}
						disabled={!(state.history.currentIndex > 0)}
					>
						<Undo2 />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800 mr-4"
						onClick={handleRedo}
						disabled={
							!(state.history.currentIndex < state.history.history.length - 1)
						}
					>
						<Redo2 />
					</Button>
					<div className="flex flex-col items-end mr-4">
						<div className="flex flex-row items-center gap-4">
							Návrh
							<Switch disabled defaultChecked={true} />
							Publikováno
						</div>
						<span className="text-muted-foreground text-xs">
							{pageDetails.updated_at != null &&
								`Naposledy upraveno ${formatDate(pageDetails.updated_at)}`}
						</span>
					</div>
					<Button onClick={handleOnSave}>Uložit</Button>
				</aside>
			</nav>
		</TooltipProvider>
	);
}
