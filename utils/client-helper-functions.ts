export const formatDate = (utcString: string) => {
	const date = new Date(utcString);

	const formatter = new Intl.DateTimeFormat("cs-CZ", {
		timeZone: "Europe/Prague",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	});

	return formatter
		.format(date)
		.replace(",", "")
		.replace(" ", "")
		.replace(" ", "");
};
