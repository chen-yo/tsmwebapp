import React from 'react';

function SubmitSuccess() {
  return (
    <span
      style={{
        color: 'var(--success)'
      }}
    >
      <i class="fas fa-check mr-1"></i>
      <strong>Saved!</strong>
    </span>
  );
}

function SubmitFailed() {
    return (
      <span
        style={{
          color: 'var(--danger)'
        }}
      >
        <i class="fas fa-times mr-1"></i>
        <strong>Failed!</strong>
      </span>
    );
  }
  

  export {
    SubmitSuccess,
    SubmitFailed
  }
