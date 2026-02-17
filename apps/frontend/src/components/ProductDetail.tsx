interface ProductDetailProps {
  label: string;
  value: string;
}

export function ProductDetail({ label, value }: ProductDetailProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1">
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </span>
    </div>
  );
}
