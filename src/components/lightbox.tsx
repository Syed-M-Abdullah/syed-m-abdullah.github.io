import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";

/**
 * Native <dialog> lightbox (loaded on first open). showModal() traps focus and Esc closes it;
 * ← / → move between images, and a horizontal swipe does the same on touch screens. Focus
 * returns to the thumbnail that opened it.
 */
export default function Lightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: ProjectImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const img = images[index];
  const count = images.length;
  const go = (step: number) => onIndex((index + step + count) % count);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={`Image ${index + 1} of ${count}`}
      className="lightbox"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50 && count > 1) go(dx < 0 ? 1 : -1);
      }}
    >
      <figure className="lightbox-figure">
        <img
          key={img.full}
          src={img.full}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="lightbox-img"
          draggable={false}
        />
        <figcaption className="mt-3 text-center text-[13px] text-white/80">
          {img.alt}
          {count > 1 && (
            <span className="ml-2 font-mono text-white/60">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="lightbox-btn top-4 right-4"
        autoFocus
      >
        <X size={20} aria-hidden />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="lightbox-btn top-1/2 left-3 -translate-y-1/2"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="lightbox-btn top-1/2 right-3 -translate-y-1/2"
          >
            <ChevronRight size={22} aria-hidden />
          </button>
        </>
      )}
    </dialog>
  );
}
