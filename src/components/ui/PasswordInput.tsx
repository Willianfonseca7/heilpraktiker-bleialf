"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
};

const baseInputClassName =
  "w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-teal-600";

const baseAdminInputClassName =
  "w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-slate-200";

function getInputClassName(inputClassName?: string) {
  if (!inputClassName) return baseInputClassName;
  if (inputClassName.includes("focus:ring")) {
    return `${baseAdminInputClassName} ${inputClassName}`;
  }
  return `${baseInputClassName} ${inputClassName}`;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { label, containerClassName, inputClassName, id, className, ...props },
    ref
  ) {
    const generatedId = useId();
    const [isVisible, setIsVisible] = useState(false);
    const inputId = id ?? generatedId;

    return (
      <div className={containerClassName ?? "space-y-2"}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          <input
            {...props}
            id={inputId}
            ref={ref}
            type={isVisible ? "text" : "password"}
            className={getInputClassName(inputClassName ?? className)}
          />

          <button
            type="button"
            aria-label={isVisible ? "Passwort verbergen" : "Passwort anzeigen"}
            aria-pressed={isVisible}
            onClick={() => setIsVisible((prev) => !prev)}
            className="absolute inset-y-0 right-3 inline-flex items-center text-gray-500 transition hover:text-gray-700"
          >
            {isVisible ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </button>
        </div>
      </div>
    );
  }
);

export default PasswordInput;
