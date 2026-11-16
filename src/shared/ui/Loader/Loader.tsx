import { memo } from "react";

import "./Loader.css";

/** Спиннер загрузки */
const Loader = memo(function Loader({ size = 24 }: { size?: number }) {
  return <div className="loader" style={{ width: size, height: size }} role="status" />;
});

export default Loader;
