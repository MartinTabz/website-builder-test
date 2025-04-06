"use client";

import {
	Sheet,
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
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ComponentsTab from "./tabs/components-tab";

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
						<TabsContent value="Media">
							<SheetHeader className="text-left p-6">
								<SheetTitle>Obsah</SheetTitle>
								<SheetDescription>
									Zde se mohou načítat obrázky z databáze
								</SheetDescription>
							</SheetHeader>
							<div className="flex flex-col gap-3 p-6">
								<Button>
									<Upload />
								</Button>
								<div className="mt-2">
									<img
										className="w-full h-[120px] object-cover rounded-t-md"
										src={
											"https://elvora.cz/cdn/shop/files/elvora-migraineband.webp"
										}
										alt=""
									/>
									<div className="bg-accent rounded-b-md grid grid-cols-4 p-3 h-20 items-center justify-between">
										<div className="col-span-3 flex flex-col">
											<span className="text-xs">Po,Led 1.1.2025</span>
											<b className="text-sm">Maska</b>
										</div>
										<div className="flex flex-col gap-0.5 items-end pr-3 cursor-pointer">
											<div className="bg-primary w-1 h-1 rounded-full"></div>
											<div className="bg-primary w-1 h-1 rounded-full"></div>
											<div className="bg-primary w-1 h-1 rounded-full"></div>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="Components">
							<SheetHeader className="text-left p-6">
								<SheetTitle>Komponenty</SheetTitle>
								<SheetDescription>
									Můžeš přetánout a vložit komponenty do editoru
								</SheetDescription>
							</SheetHeader>
							<ComponentsTab />
						</TabsContent>
					</div>
				</SheetContent>
			</Tabs>
		</Sheet>
	);
}
