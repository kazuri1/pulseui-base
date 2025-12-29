import React from "react";
import styles from "./Spinner.module.scss";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface SpinnerProps extends WithSxProps {
  /** Size of the spinner */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color variant of the spinner */
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "muted";
  /** Speed of the animation */
  speed?: "slow" | "normal" | "fast";
  /** Whether the spinner is visible */
  visible?: boolean;
  /** Accessibility label */
  ariaLabel?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  speed = "normal",
  visible = true,
  ariaLabel = "Loading",
  className = "",
  sx,
  style,
}) => {
  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const spinnerClasses = combineClassNames(
    styles.spinner,
    styles[`size-${size}`],
    styles[`color-${color}`],
    styles[`speed-${speed}`],
    !visible && styles.hidden,
    sxClassName
  );

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <div className={styles.spinnerRing}></div>
      <div className={styles.spinnerRing}></div>
      <div className={styles.spinnerRing}></div>
      <div className={styles.spinnerRing}></div>
    </div>
  );
};

Spinner.displayName = "Spinner";









