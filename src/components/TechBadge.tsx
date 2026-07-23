interface Props {
  name: string;
  logo: string;
}

export default function TechBadge({ name, logo }: Props) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-full
      border
      border-border
      bg-card/70
      backdrop-blur-md
      px-5
      py-2
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-primary
      hover:shadow-lg
      "
    >
      <img
        src={logo}
        alt={name}
        className="h-6 w-6 object-contain"
      />

      <span className="font-heading text-sm font-medium">
        {name}
      </span>
    </div>
  );
}