import React from "react";

export const setScrollLock = (() => {
  
  const lockScroll = React.useCallback( () => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = React.useCallback( () => {
    document.body.style.overflow = "";
  }, []);

  return {
    lockScroll,
    unlockScroll
  }

})

