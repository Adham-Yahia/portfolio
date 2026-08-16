import { useCallback } from 'react';
import soundManager from '../utils/sounds';
import hapticFeedback from '../utils/haptics';

/**
 * Custom hook for combined audio and haptic feedback
 * Provides unified interface for user feedback
 */
export const useFeedback = () => {
  const triggerClick = useCallback(() => {
    soundManager.playClick();
    hapticFeedback.tap();
  }, []);

  const triggerSuccess = useCallback(() => {
    soundManager.playSuccess();
    hapticFeedback.success();
  }, []);

  const triggerError = useCallback(() => {
    soundManager.playError();
    hapticFeedback.error();
  }, []);

  const triggerHover = useCallback(() => {
    soundManager.playHover();
    hapticFeedback.pulse();
  }, []);

  const triggerWarning = useCallback(() => {
    soundManager.playError();
    hapticFeedback.warning();
  }, []);

  const toggleSound = useCallback(() => {
    const isMuted = soundManager.toggleMute();
    if (!isMuted) {
      triggerClick();
    }
    return !isMuted;
  }, [triggerClick]);

  return {
    triggerClick,
    triggerSuccess,
    triggerError,
    triggerHover,
    triggerWarning,
    toggleSound,
    isSoundMuted: soundManager.isMuted,
    isHapticSupported: hapticFeedback.isSupported(),
  };
};

export default useFeedback;
