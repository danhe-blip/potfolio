const SHAPES = [
  { rect: { width: 7, height: 7 }, o: 0.27, d: 0 },
  { rect: { x: 11, width: 7, height: 7 }, o: 0.4, d: 35 },
  { path: "M22 0L25.0334 3.5L29 7H22V0Z", o: 0.58, d: 105 },
  { rect: { y: 12, width: 7, height: 7 }, o: 0.41, d: 70 },
  {
    path: "M8 14.6312L13.162 13.162L14.6312 8C14.6312 8 15.4849 12.3877 16.2592 13.162C17.0335 13.9363 21.2624 14.6312 21.2624 14.6312L16.2592 16.2592L14.6312 21.2623L13.162 16.2592L8 14.6312Z",
    o: 0.59,
    d: 175,
  },
  { rect: { x: 22, y: 12, width: 7, height: 7 }, o: 0.82, d: 245 },
  { rect: { y: 23, width: 7, height: 7 }, o: 0.58, d: 140 },
  { rect: { x: 11, y: 23, width: 7, height: 7 }, o: 0.81, d: 210 },
  { path: "M22 23H29L25.0334 26.7333L22 30V23Z", o: 1, d: 280 },
];

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
      {SHAPES.map((s, i) => {
        const style = { "--o": s.o, animationDelay: `${s.d}ms` };
        return s.path ? (
          <path key={i} d={s.path} fill="currentColor" style={style} />
        ) : (
          <rect key={i} {...s.rect} fill="currentColor" style={style} />
        );
      })}
    </svg>
  );
}
