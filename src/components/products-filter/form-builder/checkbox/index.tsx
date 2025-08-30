type CheckboxType = {
  type?: string;
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox = ({ type = "", label, name, checked = false, onChange }: CheckboxType) => (
  <label
    htmlFor={`${label}-${name}`}
    className={`checkbox ${type ? `checkbox--${type}` : ""}`}
  >
    <input
      name={name}
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      type="checkbox"
      id={`${label}-${name}`}
    />
    <span className="checkbox__check" />
    <p>{label}</p>
  </label>
);

export default Checkbox;
