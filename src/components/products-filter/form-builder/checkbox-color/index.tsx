type CheckboxColorType = {
  type?: string;
  name: string;
  color: string;
  valueName: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const CheckboxColor = ({
  color,
  name,
  type = "checkbox",
  onChange,
  valueName,
  checked = false,
}: CheckboxColorType) => {
  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label htmlFor={`${color}-${name}`} className="checkbox-color">
      <input
        onChange={onSelect}
        checked={checked}
        value={color}
        data-name={valueName}
        name={name}
        type={type}
        id={`${color}-${name}`}
      />
      <span className="checkbox__check">
        <span className="checkbox__color" style={{ backgroundColor: color }} />
      </span>
    </label>
  );
};

export default CheckboxColor;
