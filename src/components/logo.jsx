/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

export const Logo = ({height, width}) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 300 300">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0047AB" stopOpacity="1" />
            <stop offset="100%" stopColor="#0075FF" stopOpacity="1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
      
        <circle cx="150" cy="150" r="145" fill="url(#bgGradient)" />
      
        <circle cx="150" cy="150" r="130" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="20,10" opacity="0.6">
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="rotate" 
            from="0 150 150" 
            to="360 150 150" 
            dur="60s" 
            repeatCount="indefinite" 
          />
        </circle>
      
        <path d="M150 30 L225 90 L225 180 Q150 240 75 180 L75 90 Z" fill="#FF7F00" filter="url(#shadow)" />
      
        <path d="M120 80 L180 80 L180 110 L150 110 L150 140 L175 140 L175 170 L150 170 L150 220 L120 220 Z" fill="#FFF" />
      
        <circle cx="150" cy="150" r="10" fill="#FFF">
          <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
      
        <text x="150" y="270" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#FFF">
          FindSafe
        </text>
      </svg>
    )
  }