export default function Mark({ size = 14 }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 29 30"
      fill="none"
      aria-hidden="true"
    >
      <rect width="7" height="7" fill="#45251C" style={{ animationDelay: "0ms" }} />
      <rect x="11" width="7" height="7" fill="#673122" style={{ animationDelay: "35ms" }} />
      <path d="M22 0L25.0334 3.5L29 7H22V0Z" fill="#944229" style={{ animationDelay: "105ms" }} />
      <rect y="12" width="7" height="7" fill="#693426" style={{ animationDelay: "70ms" }} />
      <path
        d="M8 14.6312L13.162 13.162L14.6312 8C14.6312 8 15.4849 12.3877 16.2592 13.162C17.0335 13.9363 21.2624 14.6312 21.2624 14.6312L16.2592 16.2592L14.6312 21.2623L13.162 16.2592L8 14.6312Z"
        fill="#96462E"
        style={{ animationDelay: "175ms" }}
      />
      <rect x="22" y="12" width="7" height="7" fill="#D05B38" style={{ animationDelay: "245ms" }} />
      <rect y="23" width="7" height="7" fill="#944229" style={{ animationDelay: "140ms" }} />
      <rect x="11" y="23" width="7" height="7" fill="#CF5934" style={{ animationDelay: "210ms" }} />
      <path d="M22 23H29L25.0334 26.7333L22 30V23Z" fill="#FF6A3C" style={{ animationDelay: "280ms" }} />
    </svg>
  );
}
