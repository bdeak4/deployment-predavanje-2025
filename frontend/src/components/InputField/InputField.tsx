import c from "@/components/InputField/inputfield.module.css";
type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
};

export function InputField({
  label,
  type,
  placeholder,
  onChange,
  value,
}: InputFieldProps) {
  return (
    <div className={c.inputWrapper}>
      <label>{label}</label>
      <input
        type={type}
        className={c.input}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
      />
    </div>
  );
}
