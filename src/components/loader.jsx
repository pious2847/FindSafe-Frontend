export const Loader = ({ size = 100, color = "#0047AB" }) => {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        
        {/* Outer rotating circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Inner pulsing shield */}
        <path d="M50 20 L70 35 L70 65 Q50 80 30 65 L30 35 Z" fill={color} opacity="0.7">
          <animate
            attributeName="d"
            values="M50 20 L70 35 L70 65 Q50 80 30 65 L30 35 Z;
                    M50 25 L65 37 L65 63 Q50 75 35 63 L35 37 Z;
                    M50 20 L70 35 L70 65 Q50 80 30 65 L30 35 Z"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Centered dot */}
        <circle cx="50" cy="50" r="5" fill="#FFFFFF">
          <animate
            attributeName="r"
            values="5;7;5"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  };