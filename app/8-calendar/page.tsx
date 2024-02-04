'use client';

import { PropsWithChildren, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import {
  AnimatePresence,
  MotionConfig,
  Transition,
  Variants,
  motion,
} from 'framer-motion';
import useMeasure from 'react-use-measure';

//* VARIANTS
const variants: Variants = {
  initial: (direction) => ({ x: `${direction * 100}%`, opacity: 0 }),
  animate: { x: '0%', opacity: 1 },
  exit: (direction) => ({ x: `${direction * -100}%`, opacity: 0 }),
};
// The `removeImmediately` variant is used to remove the element immediately b/c otherwise it would overlap with the new element and could affect the UI layout or cause other issues such as darkening of the element.
const removeImmediately: Variants = { exit: { visibility: 'hidden' } };

//* TRANSITION
const transition: Transition = { type: 'spring', bounce: 0.3, duration: 0.3 };

//* PAGE COMPONENT
export default function Page() {
  const [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'));
  const [direction, setDirection] = useState(1);
  // This state is used to prevent the user from clicking the next or previous month button while the animation is in progress. This is to prevent the user from clicking the button multiple times and causing the animation to be out of sync and causing other issues.
  const [isAnimating, setIsAnimating] = useState(false);

  const month = parse(monthString, 'yyyy-MM', new Date());

  function nextMonth() {
    if (isAnimating) return;
    const next = addMonths(month, 1);
    setMonthString(format(next, 'yyyy-MM'));
    setDirection(1);
    setIsAnimating(true);
  }

  function previousMonth() {
    if (isAnimating) return;
    const previous = subMonths(month, 1);
    setMonthString(format(previous, 'yyyy-MM'));
    setDirection(-1);
    setIsAnimating(true);
  }

  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig transition={transition}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
          <div className="py-8">
            <div className="relative flex flex-col justify-center overflow-hidden rounded text-center">
              {/* Month */}
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={monthString}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Header */}
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.p
                        variants={variants}
                        custom={direction}
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, 'MMMM yyyy')}
                      </motion.p>
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      {/* Gradient to hide month behind buttons during transition */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)',
                        }}
                      />
                    </header>
                    {/* Days of Week */}
                    <motion.div
                      variants={removeImmediately}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8"
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>
                    {/* Calendar */}
                    <motion.div
                      variants={variants}
                      custom={direction}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8"
                    >
                      {daysOfMonth.map((day) => (
                        <time
                          className={`${isSameMonth(day, month) ? '' : 'text-stone-300'} font-semibold`}
                          key={day.toISOString()}
                          dateTime={day.toISOString()}
                          role="time"
                        >
                          {format(day, 'd')}
                        </time>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

//* =============================================
//*            RESIZABLE COMPONENT              =
//*==============================================
// THIS CAN BE REUSED ELSEWHERE...SUPER HANDY!
function ResizablePanel({ children }: PropsWithChildren) {
  const [ref, bounds] = useMeasure();
  return (
    <motion.div
      animate={{
        // leave "auto" to let the browser handle the height on initial render
        height: bounds.height > 0 ? bounds.height : 'auto',
      }}
    >
      <div ref={ref} className="relative">
        {children}
      </div>
    </motion.div>
  );
}
