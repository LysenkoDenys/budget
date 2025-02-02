'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const Portal = ({ children }) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    let portalDiv = document.getElementById('portal-root');
    if (!portalDiv) {
      portalDiv = document.createElement('div');
      portalDiv.id = 'portal-root';
      document.body.appendChild(portalDiv);
    }
    setContainer(portalDiv);

    return () => {
      portalDiv?.remove(); // Cleanup (optional)
    };
  }, []);

  return container ? createPortal(children, container) : null;
};

export default Portal;
