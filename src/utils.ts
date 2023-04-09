/**
 * Formats a file size in bytes to a human readable string
 * @param size - The size in bytes
 * @returns The human readable string
 */
export function format_size(size: number): string {
	if (size < 1024) {
		return size + " B";
	} else if (size < 1048576) {
		return (size / 1024).toFixed(1) + " KB";
	} else if (size < 1073741824) {
		return (size / 1048576).toFixed(1) + " MB";
	} else {
		return (size / 1073741824).toFixed(1) + " GB";
	}
}