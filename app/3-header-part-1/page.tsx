'use client';

import {
  useMotionValueEvent,
  useScroll,
  motion,
  // useTransform,
  useMotionValue,
} from 'framer-motion';

export default function Header() {
  const { scrollY } = useScroll();
  // const height = useTransform(scrollY, (value) => Math.max(80 - value, 50));
  let height = useMotionValue(80);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - scrollY.getPrevious();
    const speedControl = 0.2;

    console.log('diff', diff);
    console.log('height', height.get());

    if (diff > 0) {
      // scrolling down, min height of 50
      height.set(Math.max(height.get() - diff * speedControl, 50));
    } else {
      // scrolling up, max height of 80
      height.set(Math.min(height.get() - diff * speedControl, 80));
    }
    // Simplified version, but too clever for me to easily understand
    // height.set(Math.min(Math.max(height.get() - diff, 50), 80));
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{ height }}
          className="fixed inset-x-0 flex h-20 bg-white shadow"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <p className="flex origin-left items-center text-xl font-semibold uppercase">
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </p>
            <nav className="flex space-x-4 text-xs font-medium text-slate-400">
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </nav>
          </div>
        </motion.header>

        <main className="px-8 pt-28">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
