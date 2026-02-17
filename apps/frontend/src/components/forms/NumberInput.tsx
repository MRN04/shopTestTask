import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  step?: string;
}

export function NumberInput({ field, placeholder = "0", step }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      field.onChange(value);
    }
  };

  return (
    <Input
      type="number"
      placeholder={placeholder}
      step={step}
      {...field}
      onChange={handleChange}
    />
  );
}
