import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/utils/constants";
import TextPlaceholder from "./text-placeholder";
import ContainerPlaceholder from "./container-placeholder";

type Props = {};

export default function ComponentsTab(props: Props) {
	const elements: {
		Component: React.ReactNode;
		label: string;
		id: EditorBtns;
		group: "layout" | "elements";
	}[] = [
		{
			Component: <TextPlaceholder />,
			label: "Text",
			id: "text",
			group: "elements",
		},
		{
			Component: <ContainerPlaceholder />,
			label: "Kontejner",
			id: "container",
			group: "layout",
		},
	];

	return (
		<Accordion
			type="multiple"
			className="w-fill"
			defaultValue={["Layout", "Elements"]}
		>
			<AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
				<AccordionTrigger className="!no-underline">Rozložení</AccordionTrigger>
				<AccordionContent className="flex flex-wrap gap-2">
					{elements
						.filter((element) => element.group === "layout")
						.map((element) => (
							<div
								key={element.id}
								className="flex-col items-center justify-center flex"
							>
								{element.Component}
								<span className="text-muted-foreground">{element.label}</span>
							</div>
						))}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="Elements" className="px-6 py-0">
				<AccordionTrigger className="!no-underline">Prvky</AccordionTrigger>
				<AccordionContent className="flex flex-wrap gap-2">
					{elements
						.filter((element) => element.group === "elements")
						.map((element) => (
							<div
								key={element.id}
								className="flex-col items-center justify-center flex"
							>
								{element.Component}
								<span className="text-muted-foreground">{element.label}</span>
							</div>
						))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
