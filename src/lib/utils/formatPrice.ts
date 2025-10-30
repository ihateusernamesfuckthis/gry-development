/**
 * Formats a price amount with currency
 * @param amount - Price amount as string
 * @param currency - Currency code (e.g., 'DKK', 'USD')
 * @returns Formatted price string
 */
export function formatPrice(amount: string, currency: string): string {
  const numAmount = parseFloat(amount);
  const formatted = numAmount.toLocaleString("da-DK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (currency === "DKK") {
    return `${formatted} DKK`;
  }
  return `${formatted} ${currency}`;
}
