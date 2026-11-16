import { createPortal } from "react-dom";

import "./Portal.css";

/** Свойства портала */
interface PortalProps {
  /** Содержимое для рендера */
  children: React.ReactNode;
  /** ID целевого DOM-элемента */
  containerId?: string;
}

/** Портал */
function Portal({ children, containerId = "modal-root" }: PortalProps) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  return createPortal(children, container);
}

export default Portal;
