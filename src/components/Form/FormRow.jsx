/* eslint-disable react/prop-types */
import styles from "./Form.module.css";

export default function FormRow({ label, error, children }) {
  return (
    <div className={styles.formRow}>
      {label && (
        <label className={styles.formLabel} htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.formSpan}>{error}</span>}
    </div>
  );
}
