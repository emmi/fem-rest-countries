export const Value = ({
  label,
  value
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <p className="country-property">
      {label}: <span className="label">{value}</span>
    </p>
  );
};
