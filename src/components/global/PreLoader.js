import React from 'react'

export default function PreLoader({load, error}) {
  return (
    load ?
      <div className="preloader">
        <span className="anim__load"></span>
        <span className="anim__load"></span>
        <span className="anim__load"></span>
        <span className="anim__load"></span>
      </div>
    : error && <span style={{color:"red"}}>ERROR: {error}</span>
  );
}
