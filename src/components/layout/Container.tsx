type ContainerProps = {
  children: React.ReactNode;
  /** `wide` for grids, `prose` for reading columns. */
  width?: "default" | "wide" | "prose";
  className?: string;
};

const widths = {
  default: "max-w-5xl",
  wide: "max-w-6xl",
  prose: "max-w-2xl",
};

export default function Container({
  children,
  width = "default",
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-8 ${widths[width]} ${className}`}>
      {children}
    </div>
  );
}
