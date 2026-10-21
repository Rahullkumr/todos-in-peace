// Realistic thumbtack drawn as an SVG (head viewed slightly from above)
const Thumbtack = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    style={{ filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.45))' }}
  >
    <defs>
      <radialGradient id="pinHead" cx="38%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#ff9c9c" />
        <stop offset="45%" stopColor="#e23b3b" />
        <stop offset="100%" stopColor="#8f1414" />
      </radialGradient>
      <linearGradient id="pinNeck" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7a0f0f" />
        <stop offset="50%" stopColor="#c62b2b" />
        <stop offset="100%" stopColor="#7a0f0f" />
      </linearGradient>
      <linearGradient id="pinNeedle" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7c7c7c" />
        <stop offset="45%" stopColor="#e8e8e8" />
        <stop offset="100%" stopColor="#6a6a6a" />
      </linearGradient>
    </defs>
    {/* Needle */}
    <polygon points="30,44 34,44 32.6,62 31.4,62" fill="url(#pinNeedle)" />
    {/* Neck under the head */}
    <rect x="26" y="34" width="12" height="12" rx="3" fill="url(#pinNeck)" />
    {/* Round head */}
    <circle cx="32" cy="24" r="20" fill="url(#pinHead)" />
    {/* Shine */}
    <ellipse cx="24" cy="16" rx="7" ry="5" fill="#ffffff" opacity="0.55" />
  </svg>
);

export default Thumbtack;
