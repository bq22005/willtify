import styles from "./Button.module.css";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  label: string;
};

export default function Button(props: ButtonProps) {
  const onClick = props.onClick;
  const disabled = props.disabled;
  const label = props.label;

  return (
    <button onClick={onClick} disabled={disabled} className={styles.btn}>{label}</button>
  );
}