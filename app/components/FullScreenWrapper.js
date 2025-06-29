import React, { useRef, useState, useEffect } from 'react';

const FullScreenWrapper = ({
  children,
  className = "",
  isFullScreen: controlledFullScreen,
  setIsFullScreen: setControlledFullScreen,
  hideButton = false,
}) => {
  const wrapperRef = useRef();
  const [internalFullScreen, setInternalFullScreen] = useState(false);

  // Use controlled or uncontrolled state
  const isFullScreen = controlledFullScreen !== undefined ? controlledFullScreen : internalFullScreen;
  const setIsFullScreen = setControlledFullScreen || setInternalFullScreen;

  useEffect(() => {
    const handleFullScreenChange = () => {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      setIsFullScreen(!!(fsElement && wrapperRef.current && fsElement === wrapperRef.current));
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
    };
  }, [setIsFullScreen]);

  const enterFullScreen = () => {
    if (wrapperRef.current) {
      if (wrapperRef.current.requestFullscreen) {
        wrapperRef.current.requestFullscreen();
      } else if (wrapperRef.current.webkitRequestFullscreen) {
        wrapperRef.current.webkitRequestFullscreen();
      } else if (wrapperRef.current.mozRequestFullScreen) {
        wrapperRef.current.mozRequestFullScreen();
      } else if (wrapperRef.current.msRequestFullscreen) {
        wrapperRef.current.msRequestFullscreen();
      }
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // Add a class to make the wrapper fixed and cover the viewport in full screen
  const fullScreenClass = isFullScreen ? "fixed inset-0 z-[500] bg-gray-900 bg-opacity-95 flex flex-col" : "";

  return (
    <div ref={wrapperRef} className={`relative bg-black ${className} ${fullScreenClass}`}>
      {!hideButton && !isFullScreen && (
        <button
          onClick={enterFullScreen}
          className="absolute top-2 right-2 z-20 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title="Full Screen"
        >
          Full Screen
        </button>
      )}
      {!hideButton && isFullScreen && (
        <button
          onClick={exitFullScreen}
          className="absolute top-2 right-2 z-60 bg-red-200 dark:bg-red-700 px-3 py-1 rounded shadow hover:bg-red-300 dark:hover:bg-red-600 transition"
          title="Exit Full Screen"
        >
          Exit Full Screen
        </button>
      )}
      {typeof children === 'function'
        ? children({ enterFullScreen, exitFullScreen, isFullScreen })
        : children}
    </div>
  );
};

export default FullScreenWrapper; 