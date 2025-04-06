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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlignCenter,
	AlignHorizontalJustifyCenter,
	AlignHorizontalJustifyEnd,
	AlignHorizontalJustifyStart,
	AlignHorizontalSpaceAround,
	AlignHorizontalSpaceBetween,
	AlignJustify,
	AlignLeft,
	AlignRight,
	AlignVerticalJustifyCenter,
	AlignVerticalJustifyEnd,
	Check,
	Code,
	EyeClosed,
	ImageDown,
	SquareX,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsTab() {
	const { state, dispatch } = useEditor();
	const [bgClrPickerOpened, setBgClrPickerOpened] = useState<boolean>(false);
	const [clrPickerOpened, setClrPickerOpened] = useState<boolean>(false);

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
		<>
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
						{/* Zarovnání textu */}
						<div className="flex flex-col gap-2 w-full">
							<Label className="text-muted-foreground">Zarovnání textu</Label>
							<Tabs
								onValueChange={(e) =>
									handleOnChanges({
										target: {
											id: "textAlign",
											value: e,
										},
									})
								}
								value={state.editor.selectedElement.styles.textAlign}
								className="w-full"
							>
								<TabsList className="w-full flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="start"
									>
										<AlignLeft size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="end"
									>
										<AlignRight size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="center"
									>
										<AlignCenter size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="justify"
									>
										<AlignJustify size={18} />
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						{/* Font family */}
						<div className="flex flex-col gap-2">
							<Label className="text-muted-foreground">Font</Label>
							<Input
								id="fontFamily"
								onChange={handleOnChanges}
								value={state.editor.selectedElement.styles.fontFamily}
							/>
						</div>

						{/* Barva */}
						<div className="flex flex-col gap-2">
							<Label className="text-muted-foreground">Barva</Label>
							<div className="h-9 w-full border rounded-md flex">
								<div
									className="w-10 h-full rounded-l-md border-r"
									style={{
										backgroundColor: state.editor.selectedElement.styles.color,
									}}
								/>
								<div className="w-[calc(100%-40px)] relative flex items-center uppercase rounded-r-md">
									<span
										className="p-2 h-full rounded-r-md w-full cursor-pointer duration-200 ease-in-out hover:bg-primary-foreground"
										onClick={() => setClrPickerOpened(!clrPickerOpened)}
									>
										{state.editor.selectedElement.styles.color}
									</span>
								</div>
							</div>
						</div>

						{/* Váha a velikost písma */}
						<div className="w-full grid grid-cols-3 gap-2">
							<div className="col-span-2 flex flex-col gap-2">
								<Label className="text-muted-foreground">Váha</Label>
								<Select
									onValueChange={(e) => {
										handleOnChanges({
											target: {
												id: "fontWeight",
												value: e,
											},
										});
									}}
									value={state.editor.selectedElement.styles.fontWeight?.toString()}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Vyber váhu" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="100">100</SelectItem>
										<SelectItem value="200">200</SelectItem>
										<SelectItem value="300">300</SelectItem>
										<SelectItem value="400">400</SelectItem>
										<SelectItem value="500">500</SelectItem>
										<SelectItem value="600">600</SelectItem>
										<SelectItem value="700">700</SelectItem>
										<SelectItem value="800">800</SelectItem>
										<SelectItem value="900">900</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Velikost</Label>
								<Input
									id="fontSize"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.fontSize}
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="Rozmery" className="px-6 py-0 border-y-[1px]">
					<AccordionTrigger className="!no-underline">Rozměry</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-5">
						{/* Výška a šířka */}
						<div className="grid grid-cols-2 gap-2 w-full">
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Výška</Label>
								<Input
									id="height"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.height}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Šířka</Label>
								<Input
									id="width"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.width}
								/>
							</div>
						</div>

						{/* Vnější odsazení - Margin */}
						<div className="grid grid-cols-2 gap-x-2 gap-y-3 w-full">
							<Label className="col-span-2 pt-2">
								{"Vnější odsazení (Margin)"}
							</Label>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Horní</Label>
								<Input
									id="marginTop"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.marginTop}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Spodní</Label>
								<Input
									id="marginBottom"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.marginBottom}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Levé</Label>
								<Input
									id="marginLeft"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.marginLeft}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Pravé</Label>
								<Input
									id="marginRight"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.marginRight}
								/>
							</div>
						</div>

						{/* Vnitřní odsazení - Padding */}
						<div className="grid grid-cols-2 gap-x-2 gap-y-3 w-full">
							<Label className="col-span-2 pt-2">
								{"Vnitřní odsazení (Padding)"}
							</Label>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Horní</Label>
								<Input
									id="paddingTop"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.paddingTop}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Spodní</Label>
								<Input
									id="paddingBottom"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.paddingBottom}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Levé</Label>
								<Input
									id="paddingLeft"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.paddingLeft}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-muted-foreground">Pravé</Label>
								<Input
									id="paddingRight"
									placeholder="px"
									onChange={handleOnChanges}
									value={state.editor.selectedElement.styles.paddingRight}
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="Dekorace" className="px-6 py-0 border-y-[1px]">
					<AccordionTrigger className="!no-underline">
						Dekorace
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-5">
						{/* Průhlednost */}
						<div>
							<Label className="text-muted-foreground relative top-2">
								Průhlednost
							</Label>
							<div className="flex items-center justify-end">
								<small className="p-2">
									{typeof state.editor.selectedElement.styles?.opacity ===
									"number"
										? state.editor.selectedElement.styles?.opacity
										: parseFloat(
												(
													state.editor.selectedElement.styles?.opacity || "0"
												).replace("%", "")
										  ) || 0}
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
									typeof state.editor.selectedElement.styles?.opacity ===
									"number"
										? state.editor.selectedElement.styles?.opacity
										: parseFloat(
												(
													state.editor.selectedElement.styles?.opacity || "0"
												).replace("%", "")
										  ) || 0,
								]}
								max={100}
								step={1}
							/>
						</div>

						{/* Border Radius */}
						<div>
							<Label className="text-muted-foreground relative top-2">
								Poloměr ohraničení
							</Label>
							<div className="flex items-center justify-end">
								<small className="p-2">
									{typeof state.editor.selectedElement.styles?.borderRadius ===
									"number"
										? state.editor.selectedElement.styles?.borderRadius
										: parseFloat(
												(
													state.editor.selectedElement.styles?.borderRadius ||
													"0"
												).replace("px", "")
										  ) || 0}
									px
								</small>
							</div>
							<Slider
								onValueChange={(e) => {
									handleOnChanges({
										target: { id: "borderRadius", value: `${e[0]}px` },
									});
								}}
								defaultValue={[
									typeof state.editor.selectedElement.styles?.borderRadius ===
									"number"
										? state.editor.selectedElement.styles?.borderRadius
										: parseFloat(
												(
													state.editor.selectedElement.styles?.borderRadius ||
													"0"
												).replace("px", "")
										  ) || 0,
								]}
								max={50}
								step={1}
							/>
						</div>

						{/* Background color */}
						<div className="flex flex-col gap-2">
							<Label className="text-muted-foreground">Barva pozadí</Label>
							<div className="h-9 w-full border rounded-md flex">
								<div
									className="w-10 h-full rounded-l-md border-r"
									style={{
										backgroundColor:
											state.editor.selectedElement.styles.backgroundColor,
									}}
								/>
								<div className="w-[calc(100%-40px)] relative flex items-center uppercase rounded-r-md">
									<span
										className="p-2 h-full rounded-r-md w-full cursor-pointer duration-200 ease-in-out hover:bg-primary-foreground"
										onClick={() => setBgClrPickerOpened(!bgClrPickerOpened)}
									>
										{state.editor.selectedElement.styles.backgroundColor}
									</span>
								</div>
							</div>
						</div>

						{/* Obrázek pozadí */}
						<div className="flex flex-col gap-2">
							<Label className="text-muted-foreground">Obrázek pozadí</Label>
							<div className="flex border-[1px] rounded-md overflow-clip">
								<div
									className="w-12"
									style={{
										backgroundImage:
											state.editor.selectedElement.styles.backgroundImage,
									}}
								/>
								<Input
									placeholder="url()"
									className="!border-y-0 rounded-none !border-r-0 mr-2"
									id="backgroundImage"
									onChange={handleOnChanges}
									value={
										state.editor.selectedElement.styles.backgroundImage || ""
									}
								/>
							</div>
						</div>

						{/* Pozice obrázku */}
						<div className="flex flex-col gap-2 w-full">
							<Label className="text-muted-foreground">Pozice obrázku</Label>
							<Tabs
								onValueChange={(e) =>
									handleOnChanges({
										target: {
											id: "objectPosition",
											value: e,
										},
									})
								}
								value={state.editor.selectedElement.styles.objectPosition?.toString()}
								className="w-full"
							>
								<TabsList className="w-full flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="left"
									>
										<Code size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="center"
									>
										<AlignCenter size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="bottom"
									>
										<ImageDown size={18} />
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="Flexbox" className="px-6 py-0 border-y-[1px]">
					<AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-5">
						{/* Display flex */}
						<div className="flex items-center space-x-2">
							<Checkbox
								className="cursor-pointer"
								id="flex"
								onCheckedChange={(e) => {
									handleOnChanges({
										target: {
											id: "display",
											value: e == true ? "flex" : "block",
										},
									});
								}}
								checked={
									state.editor.selectedElement.styles.display == "flex"
										? true
										: false
								}
							/>
							<label
								htmlFor="flex"
								className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Flex
							</label>
						</div>

						{/* Justify content */}
						<div className="flex flex-col gap-2 w-full">
							<Label className="text-muted-foreground">Justify Content</Label>
							<Tabs
								onValueChange={(e) =>
									handleOnChanges({
										target: {
											id: "justifyContent",
											value: e,
										},
									})
								}
								value={state.editor.selectedElement.styles.justifyContent}
								className="w-full"
							>
								<TabsList className="w-full flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="space-between"
									>
										<AlignHorizontalSpaceBetween size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="space-evenly"
									>
										<AlignHorizontalSpaceAround size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="center"
									>
										<AlignHorizontalJustifyCenter size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="flex-start"
									>
										<AlignHorizontalJustifyStart size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="flex-end"
									>
										<AlignHorizontalJustifyEnd size={18} />
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						{/* Align items */}
						<div className="flex flex-col gap-2 w-full">
							<Label className="text-muted-foreground">Align items</Label>
							<Tabs
								onValueChange={(e) =>
									handleOnChanges({
										target: {
											id: "alignItems",
											value: e,
										},
									})
								}
								value={state.editor.selectedElement.styles.alignItems}
								className="w-full"
							>
								<TabsList className="w-full flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="flex-start"
									>
										<AlignVerticalJustifyCenter size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="center"
									>
										<AlignVerticalJustifyCenter size={18} />
									</TabsTrigger>
									<TabsTrigger
										className="w-10 h-10 p-0 data-[state=active]:bg-muted cursor-pointer"
										value="flex-end"
									>
										<AlignVerticalJustifyEnd size={18} />
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						{/* Flex direction */}
						<div className="flex flex-col gap-2 w-full">
							<Label className="text-muted-foreground">
								{"Směr (Direction)"}
							</Label>
							<Select
								onValueChange={(e) => {
									handleOnChanges({
										target: {
											id: "flexDirection",
											value: e,
										},
									});
								}}
								value={state.editor.selectedElement.styles.flexDirection}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Vyber směr" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="row">Řádek</SelectItem>
									<SelectItem value="column">Sloupec</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			{bgClrPickerOpened && (
				<div className="bg-[#171717d0] absolute w-full h-full left-0 top-0 flex items-center justify-center">
					<div className="w-[200px] flex flex-col gap-3">
						<HexColorPicker
							color={state.editor.selectedElement.styles.backgroundColor}
							onChange={(e) => {
								handleOnChanges({
									target: { id: "backgroundColor", value: e },
								});
							}}
						/>
						<Input
							value={state.editor.selectedElement.styles.backgroundColor || ""}
							onChange={handleOnChanges}
							id="backgroundColor"
							placeholder="#000000"
						/>
						<Button
							onClick={() => setBgClrPickerOpened(false)}
							className="cursor-pointer w-full"
							size={"sm"}
						>
							<Check />
						</Button>
					</div>
				</div>
			)}
			{clrPickerOpened && (
				<div className="bg-[#171717d0] absolute w-full h-full left-0 top-0 flex items-center justify-center">
					<div className="w-[200px] flex flex-col gap-3">
						<HexColorPicker
							color={state.editor.selectedElement.styles.color}
							onChange={(e) => {
								handleOnChanges({
									target: { id: "color", value: e },
								});
							}}
						/>
						<Input
							value={state.editor.selectedElement.styles.color || ""}
							onChange={handleOnChanges}
							id="color"
							placeholder="#000000"
						/>
						<Button
							onClick={() => setClrPickerOpened(false)}
							className="mb-1 cursor-pointer"
							size={"sm"}
						>
							<Check />
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
