interface ProductSpecProps {
  label: string;
  value: string;
}

export function ProductSpec({ label, value }: ProductSpecProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
