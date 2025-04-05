"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import TabList from "./tabs";
import SettingsTab from "./tabs/setting-tab";

type Props = {
	pageId: string;
};

export default function PageEditorSidebar({ pageId }: Props) {
	const { state, dispatch } = useEditor();

	return (
		<Sheet open={true} modal={false}>
			<Tabs className="w-full" defaultValue="Settings">
				<SheetContent
					showX={false}
					side="right"
					className={clsx(
						"mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden",
						{ hidden: state.editor.previewMode }
					)}
				>
					<TabList />
					<div className="hidden">
						<SheetHeader>
							<SheetTitle></SheetTitle>
							<SheetDescription></SheetDescription>
						</SheetHeader>
					</div>
				</SheetContent>
				<SheetContent
					showX={false}
					side="right"
					className={clsx(
						"mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden",
						{ hidden: state.editor.previewMode }
					)}
				>
					<div className="grid gap-4 h-full pb-36 overflow-scroll">
						<TabsContent value="Settings">
							<SheetHeader className="text-left p-6">
								<SheetTitle>Styly</SheetTitle>
								<SheetDescription>
									Ukaž svoji kreativitu. Můžeš upravit jakýkoliv komponent podle
									sebe
								</SheetDescription>
							</SheetHeader>
							<SettingsTab />
						</TabsContent>
					</div>
				</SheetContent>
			</Tabs>
		</Sheet>
	);
}
