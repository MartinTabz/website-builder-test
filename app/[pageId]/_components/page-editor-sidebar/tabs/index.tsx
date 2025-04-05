import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Plus, SettingsIcon, SquareStackIcon } from "lucide-react";

export default function TabList() {
	return (
		<TabsList className="flex flex-col w-full justify-evenly gap-0 bg-transparent items-center py-2">
			<TabsTrigger
				value="Settings"
				className="w-10 p-0 py-[18px] cursor-pointer data-[state=active]:bg-muted"
			>
				<SettingsIcon />
			</TabsTrigger>
			<TabsTrigger
				value="Components"
				className="w-10 p-0 py-[18px] cursor-pointer data-[state=active]:bg-muted"
			>
				<Plus />
			</TabsTrigger>
			<TabsTrigger
				value="Layers"
				className="w-10 p-0 py-[18px] cursor-pointer data-[state=active]:bg-muted"
			>
				<SquareStackIcon />
			</TabsTrigger>
			<TabsTrigger
				value="Media"
				className="w-10 p-0 py-[18px] cursor-pointer data-[state=active]:bg-muted"
			>
				<Database />
			</TabsTrigger>
		</TabsList>
	);
}
