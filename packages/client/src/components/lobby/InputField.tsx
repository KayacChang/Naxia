type InputFieldProps = {
  id: string;
  label: string;
  password?: boolean;
  onChange?: (value: string) => void;
};
export function InputField({ id, label, password, onChange }: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-bold" htmlFor={id}>
        {label}
      </label>

      <input
        type={password ? "password" : "text"}
        className="border py-2 px-3 text-black"
        id={id}
        onChange={(event) => onChange?.(event.currentTarget.value)}
      />
    </div>
  );
}
