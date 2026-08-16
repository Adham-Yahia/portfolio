// Haptic Feedback Utility - Vibration for touch devices
// Uses Vibration API for mobile haptic feedback

export const hapticFeedback = {
  /**
   * Light tap - short vibration
   */
  tap: () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  },

  /**
   * Medium pulse - felt on most devices
   */
  pulse: () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  },

  /**
   * Strong feedback - long vibration
   */
  heavy: () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  },

  /**
   * Double tap pattern
   */
  doubleTap: () => {
    if (navigator.vibrate) {
      navigator.vibrate([30, 30, 30]);
    }
  },

  /**
   * Success pattern - ascending vibrations
   */
  success: () => {
    if (navigator.vibrate) {
      navigator.vibrate([20, 30, 20, 30, 40]);
    }
  },

  /**
   * Error pattern - rapid vibrations
   */
  error: () => {
    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 50, 50, 50]);
    }
  },

  /**
   * Warning pattern - medium vibrations
   */
  warning: () => {
    if (navigator.vibrate) {
      navigator.vibrate([40, 40, 40]);
    }
  },

  /**
   * Complex selection pattern
   */
  selection: () => {
    if (navigator.vibrate) {
      navigator.vibrate([10, 40, 10, 40, 10]);
    }
  },

  /**
   * Check if device supports haptics
   */
  isSupported: () => {
    return !!navigator.vibrate;
  },
};

export default hapticFeedback;
