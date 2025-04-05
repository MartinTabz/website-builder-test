import type { Database as DB } from "@/utils/database.types";

declare global {
	type Database = DB;
	type Page = Database["public"]["Tables"]["pages"]["Row"];
}
