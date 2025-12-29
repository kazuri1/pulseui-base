import React, { useState, forwardRef } from "react";
import styles from "./Toggle.module.scss";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface ToggleOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToggleProps extends WithSxProps {
  /** Unique identifier for the toggle */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Currently selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Array of toggle options */
  options: ToggleOption[];
  /** Label for the toggle group */
  label?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Whether the toggle is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Callback when toggle receives focus */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** Callback when toggle loses focus */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  ({
    id,
    name,
    value,
    defaultValue,
    options,
    label,
    disabled = false,
    required = false,
    error,
    size = "md",
    onChange,
    onFocus,
    onBlur,
    className = "",
    sx,
    style,
  }) => {
    const [internalValue, setInternalValue] = useState(
      defaultValue || options[0]?.value || ""
    );

    const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
      sx,
      style,
      className
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleOptionClick = (option: ToggleOption) => {
      if (option.disabled || disabled) return;

      const newValue = option.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleKeyDown = (
      event: React.KeyboardEvent,
      option: ToggleOption
    ) => {
      if (disabled || option.disabled) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleOptionClick(option);
      }
    };

    const toggleId = id || React.useId();
    const errorId = error ? `${toggleId}-error` : undefined;

    const containerClasses = combineClassNames(
      styles.toggleContainer,
      sxClassName
    );

    return (
      <div className={containerClasses} style={sxStyle}>
        {label && (
          <label
            htmlFor={toggleId}
            className={`
              ${styles.label}
              ${styles[`size-${size}`]}
              ${disabled ? styles.disabled : ""}
            `}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div
          className={`
            ${styles.toggleGroup}
            ${styles[`size-${size}`]}
            ${disabled ? styles.disabled : ""}
            ${error ? styles.error : ""}
          `}
          role="radiogroup"
          aria-labelledby={label ? toggleId : undefined}
          aria-describedby={errorId}
          aria-invalid={!!error}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={option.value === currentValue}
              aria-disabled={option.disabled || disabled}
              disabled={option.disabled || disabled}
              className={`
                ${styles.toggleOption}
                ${styles[`size-${size}`]}
                ${option.value === currentValue ? styles.selected : ""}
                ${option.disabled || disabled ? styles.disabled : ""}
              `}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              tabIndex={option.value === currentValue ? 0 : -1}
            >
              {option.label}
            </button>
          ))}
        </div>

        {error && (
          <div
            id={errorId}
            className={`
              ${styles.errorMessage}
              ${styles[`size-${size}`]}
            `}
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;









