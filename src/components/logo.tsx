import { cn } from "@/lib/utils";

export const Logo = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground h-7 w-auto", className)}
    >
      <text
        x="0"
        y="22"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="2"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      >
        RGIT
      </text>
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="120"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoIcon = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7", className)}
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="6"
        stroke={uniColor ? "currentColor" : "url(#logo-gradient)"}
        strokeWidth="3"
      />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      >
        R
      </text>
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9B99FE" />
          <stop offset="1" stopColor="#2BC8B7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-10 w-10", className)}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="5"
        y="28"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="24"
        letterSpacing="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        RGIT
      </text>
    </svg>
  );
};
