/** TemelashCard logo mark. Decorative: the adjacent text carries the name, so it is hidden from screen readers. */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={32}
      height={32}
      className={`${className} object-contain inline-block shrink-0`}
      aria-hidden="true"
    />
  );
}
