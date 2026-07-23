import logoAsset from "@/assets/slogo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoAsset}
        alt="Abdullah Bukhari"
        className="h-10 w-auto object-contain"
      />
      <div className="hidden flex-col leading-none sm:flex">
        <span className="font-heading text-[13px] font-semibold tracking-[0.14em]">
          <span className="text-foreground">ABDULLAH</span>{" "}
          <span className="text-blue">BUKHARI</span>
        </span>
        <span className="mt-1 font-heading text-[9px] tracking-[0.35em] text-subtle uppercase">
          Build · Automate · Scale
        </span>
      </div>
    </div>
  );
}
