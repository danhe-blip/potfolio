import { useState, useEffect } from "react";
import { SITE, WORKS, ABOUT } from "./config";
import Home from "./Home";
import WorkPage from "./WorkPage";
import NotFound from "./NotFound";
import Mark from "./Mark";

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "America/Los_Angeles",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <span>{SITE.location} {now}</span>;
}

const getRoute = () => window.location.hash.replace(/^#\/?/, "") || "home";

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (r) => {
    const target = r === "home" ? "#/" : `#/${r}`;
    if (window.location.hash === target) return;
    window.location.hash = target;
  };

  const work = WORKS.find((w) => w.id === route && !w.confidential);
  const doc = route === "about" ? ABOUT : work;

  return (
    <div className="site">
      <header className="topbar mono">
        <button className="brand" onClick={() => navigate("home")}>
          <Mark />
          <span>{SITE.name}</span>
        </button>
        <nav>
          <button onClick={() => navigate("home")}>Index</button>
          <button onClick={() => navigate("about")}>About</button>
          <a href={`mailto:${SITE.email}`}>Contact</a>
        </nav>
        <div className="meta">
          <span className="loc"><Clock /></span>
        </div>
      </header>

      <div key={route} className="glitch-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {route === "home" ? (
          <Home navigate={navigate} />
        ) : doc ? (
          <WorkPage doc={doc} navigate={navigate} />
        ) : (
          <NotFound navigate={navigate} />
        )}
      </div>
    </div>
  );
}
