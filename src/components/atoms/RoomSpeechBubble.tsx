interface RoomSpeechBubbleProps {
  label: string;
  x: number;
  y: number;
}

export function RoomSpeechBubble({ label, x, y }: RoomSpeechBubbleProps) {
  return (
    <span
      className='room-speech-bubble'
      style={{ left: 'clamp(72px, ' + x + '%, calc(100% - 72px))', top: y + '%' }}
      aria-hidden='true'
    >
      {label}
    </span>
  );
}
