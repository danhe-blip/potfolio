const RAMP = [0.22, 0.36, 0.55, 0.36, 0.55, 0.8, 0.55, 0.8, 1];

export default function Mark({ size = 14 }) {
  return (
    <span className="mark" aria-hidden="true" style={{ width: size, height: size }}>
      {RAMP.map((o, i) => (
        <span key={i} style={{ "--o": o, animationDelay: `${Math.round(o * 300)}ms` }} />
      ))}
    </span>
  );
}
