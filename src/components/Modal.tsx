import { useEffect, type ReactNode, type MouseEvent } from "react";

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  footer,
  size = "md", // "sm" | "md" | "lg"
}: {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass =
    size === "sm"
      ? "max-w-md"
      : size === "lg"
        ? "max-w-3xl"
        : "max-w-xl";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
    >
      <div
        className={`w-full ${sizeClass} rounded-2xl bg-white shadow-xl`}
        onMouseDown={(e: MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="Modal schließen"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer (optional) */}
        {footer ? (
          <div className="flex items-center justify-end gap-2 border-t px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
