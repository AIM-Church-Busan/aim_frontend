import localFont from 'next/font/local';

const aimWordmarkFont = localFont({
  src: '../../../app/fonts/tilt-warp/TiltWarp.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['sans-serif'],
  adjustFontFallback: false,
});

export default function AimWordmark({ className = '' }) {
  return (
    <span
      className={`${aimWordmarkFont.className} ${className}`}
      style={{ fontFamily: aimWordmarkFont.style.fontFamily, fontWeight: 400 }}
    >
      AIM
    </span>
  );
}
