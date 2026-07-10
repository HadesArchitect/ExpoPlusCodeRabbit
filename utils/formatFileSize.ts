/**
 * Formats a byte count into a human-readable string (B, KB, MB, GB).
 *
 * @param bytes - The number of bytes.
 * @param fractionDigits - Number of digits to show after the decimal point.
 * @returns A human-readable size string, e.g. "1.5 MB".
 */
export function formatFileSize(bytes: number, fractionDigits = 1): string {
  if (bytes < 0 || Number.isNaN(bytes)) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const rounded =
    unitIndex === 0 ? Math.round(value) : Number(value.toFixed(fractionDigits));

  return `${rounded} ${units[unitIndex]}`;
}
