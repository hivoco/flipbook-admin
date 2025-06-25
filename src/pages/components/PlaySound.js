import React, { useEffect, useRef } from "react";

export default function PlaySound({ enabled }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (enabled) {
      audioRef.current.play();
    }
  }, [enabled]);

  return <audio ref={audioRef} src="/page-sound.mp3" />;
}
