export function formatDateBR(localDateTime: string): string {
  const [datePart] = localDateTime.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}`;
}

export function formatPhoneBR(value: string | number): string {
  const digits = String(value).replace(/\D/g, "");

  if (digits.length === 10) {
    const ddd = digits.slice(0, 2);
    const first = digits.slice(2, 6);
    const last = digits.slice(6);
    return `(${ddd}) ${first}-${last}`;
  }

  // celular: DD + 9 dígitos
  if (digits.length === 11) {
    const ddd = digits.slice(0, 2);
    const first = digits.slice(2, 7);
    const last = digits.slice(7);
    return `(${ddd}) ${first}-${last}`;
  }

  return String(value);
}
