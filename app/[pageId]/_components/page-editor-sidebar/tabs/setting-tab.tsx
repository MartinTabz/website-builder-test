"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/providers/editor/editor-provider";

export default function SettingsTab() {
	const { state, dispatch } = useEditor();

	const handleChangeCustomValues = (e: any) => {
		const settingsProperty = e.target.id;
		let value = e.target.value;
		const styleObject = {
			[settingsProperty]: value,
		};

		dispatch({
			type: "UPDATE_ELEMENT",
			payload: {
				elementDetails: {
					...state.editor.selectedElement,
					content: {
						...state.editor.selectedElement.content,
						...styleObject,
					},
				},
			},
		});
	};

	const handleOnChanges = (e: any) => {
		const styleSettings = e.target.id;
		let value = e.target.value;

		const styleObject = {
			[styleSettings]: value,
		};

		dispatch({
			type: "UPDATE_ELEMENT",
			payload: {
				elementDetails: {
					...state.editor.selectedElement,
					styles: {
						...state.editor.selectedElement.styles,
						...styleObject,
					},
				},
			},
		});
	};

	return (
		<Accordion
			type="multiple"
			className="w-full"
			defaultValue={["Typografie", "Rozmery", "Dekorace", "Flexbox"]}
		>
			<AccordionItem value="Custom" className="px-6 py-0">
				<AccordionTrigger className="!no-underline">Vlastní</AccordionTrigger>
				<AccordionContent>
					{state.editor.selectedElement.type === "link" &&
						!Array.isArray(state.editor.selectedElement.content) && (
							<div className="flex flex-col gap-2">
								<p className="text-muted-foreground">URL Odkazu</p>
								<Input
									id="href"
									placeholder="https://www.ukazka.com/cesta"
									onChange={handleChangeCustomValues}
									value={state.editor.selectedElement.content.href}
								/>
							</div>
						)}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="Typografie" className="px-6 py-0 border-y-[1px]">
				<AccordionTrigger className="!no-underline">
					Typografie
				</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<p className="text-muted-foreground">Barva</p>
						<Input
							id="color"
							onChange={handleOnChanges}
							value={state.editor.selectedElement.styles.color}
						/>
					</div>

					<div>
						<Label className="text-muted-foreground">Průhlednost</Label>
						<div className="flex items-center justify-end">
							<small className="p-2">
								{typeof state.editor.selectedElement.styles?.opacity ===
								"number"
									? state.editor.selectedElement.styles?.opacity
									: parseFloat(
											(
												state.editor.selectedElement.styles?.opacity || "0"
											).replace("%", "")
									  ) || 100}
								%
							</small>
						</div>
						<Slider
							onValueChange={(e) => {
								handleOnChanges({
									target: { id: "opacity", value: `${e[0]}%` },
								});
							}}
							defaultValue={[
								typeof state.editor.selectedElement.styles?.opacity === "number"
									? state.editor.selectedElement.styles?.opacity
									: parseFloat(
											(
												state.editor.selectedElement.styles?.opacity || "0"
											).replace("%", "")
									  ) || 100,
							]}
							max={100}
							step={1}
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
