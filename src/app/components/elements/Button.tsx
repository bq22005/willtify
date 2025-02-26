import styles from "./Button.module.css";

type ButtonProps = {
    onClick?: () => void;
    label: string;
};

export default function Button(props: ButtonProps) {
    const onClick = props.onClick;
    const label = props.label;

    return (
        <button onClick={onClick} className={styles.btn}>{label}</button>
    );
}