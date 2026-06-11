"use client";

import { useEffect, useId, useRef, useState } from "react";

export type BrandedSelectOption = {
  value: string;
  label: string;
};

type BrandedSelectProps = {
  id?: string;
  name: string;
  options: readonly BrandedSelectOption[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
};

const ChevronDownIcon = () => (
  <svg
    className="h-4 w-4 shrink-0 text-gold"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const BrandedSelect = ({
  id,
  name,
  options,
  placeholder,
  required = false,
  disabled = false,
  value,
  onChange,
  ariaLabel,
  className = "",
}: BrandedSelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayLabel = selectedOption?.label ?? placeholder;

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    setIsOpen((current) => !current);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((current) => !current);
    }

    if (event.key === "ArrowDown" && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className={`relative mt-1.5 ${className}`}>
      <input
        type="hidden"
        name={name}
        value={selectedValue}
        required={required}
        disabled={disabled}
      />

      <button
        type="button"
        id={selectId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel ?? placeholder}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between rounded-md border bg-cream px-4 py-2.5 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-70 ${
          isOpen
            ? "border-gold ring-2 ring-gold/20"
            : "border-sage/20 hover:border-gold/40"
        }`}
      >
        <span className={selectedValue ? "text-charcoal" : "text-charcoal-light"}>
          {displayLabel}
        </span>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={selectId}
          className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md border border-sage/15 bg-white py-1 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = option.value === selectedValue;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream focus:bg-cream focus:outline-none ${
                    isSelected
                      ? "bg-sage/10 font-medium text-sage"
                      : "text-charcoal"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
