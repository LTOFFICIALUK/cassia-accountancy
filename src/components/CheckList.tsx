type CheckListProps = {
  items: readonly string[];
  light?: boolean;
};

export const CheckList = ({ items, light = false }: CheckListProps) => {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              light ? "bg-gold text-white" : "bg-sage/10 text-sage"
            }`}
            aria-hidden="true"
          >
            ✓
          </span>
          <span
            className={`text-sm leading-relaxed sm:text-base ${
              light ? "text-cream/90" : "text-charcoal"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};
