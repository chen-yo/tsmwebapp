import React, { useEffect, useRef } from 'react';

export default function DfpAdUnitWarning({ error }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.disabled = false;
      ref.current.focus();
      ref.current.disabled = true;
    }
  }, [error]);

  let content = null;

  if (error) {
    content = (
      <>
        <p>These Ad Units are unknown:</p>
        <textarea
          style={{height: "200px"}}
          ref={ref}
          className="form-control form-control-lg is-warning-box"
          value={error.join('\n')}
        ></textarea>
      </>
    );
  }

  return content;
}
