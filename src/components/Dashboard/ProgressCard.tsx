import styles from "./ProgressCard.module.css";

interface ProgressCardProps {
    title: string;
    value: string | number;
    description?: string;
}

export default function ProgressCard({ title, value, description }: ProgressCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.value}>{value}</div>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
}
