export const NOTIFICATION_SOUND =
  'data:audio/mpeg;base64,SUQzAwAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAA...';

export const playNotificationSound = () => {
  const audio = new Audio(NOTIFICATION_SOUND);
  audio.play().catch(err => console.error('Sound play error:', err));
};
