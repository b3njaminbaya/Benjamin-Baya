import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Update these numbers as the business grows
const STATS = [
  { value: 20, suffix: '+', label: 'Projects Shipped' },
  { value: 5,  suffix: '+', label: 'Countries Served' },
  { value: 15, suffix: '+', label: 'Happy Clients' },
];

function CountUp({ target, suffix, duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const StatsBar = () => (
  <div className="relative bg-gray-950 py-14 overflow-hidden">
    {/* Subtle ambient glows — same visual language as the Header */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-[-60%] left-[15%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-60%] right-[15%] w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[90px]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {STATS.map(({ value, suffix, label }) => (
          <div key={label}>
            <p className="text-5xl font-extrabold tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
              <CountUp target={value} suffix={suffix} />
            </p>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StatsBar;
