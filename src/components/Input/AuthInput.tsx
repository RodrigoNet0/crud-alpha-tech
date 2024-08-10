import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "@/schemas/schemaAuth";

interface FormInputProps {
  id: keyof FormData;
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  error?: string;
}

const FormInput = ({ id, label, type, placeholder, register, error, } : FormInputProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} placeholder={placeholder} {...register(id)} />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default FormInput;
