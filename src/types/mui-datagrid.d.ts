import "@mui/x-data-grid";

declare module "@mui/x-data-grid" {
    interface ToolbarPropsOverrides {
        /**
         * Search value synced with URL
         */
        value?: string;

        /**
         * Called after debounce
         */
        onSearchChange?: (value: string) => void;

        debounceMs?: number;
    }
}
