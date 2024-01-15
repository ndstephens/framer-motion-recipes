'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import useKeypress from 'react-use-keypress';
import { useMeasure } from '@uidotdev/usehooks';

const images = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
];

const collapsedAspectRatio = 1 / 3;
const expandedAspectRatio = 3 / 2;
const marginPercentage = 12;
const gapPercentage = 3;

export default function Page() {
  let [index, setIndex] = useState(0);
  const [ref, { height }] = useMeasure();

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  });
  useKeypress('ArrowRight', () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center py-28">
          <div
            ref={ref}
            className="relative flex h-full items-center overflow-hidden"
          >
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              style={{
                maxWidth: (height || 0) * expandedAspectRatio,
                aspectRatio: expandedAspectRatio,
              }}
              className="flex"
            >
              {images.map((image, i) => (
                <motion.img
                  src={image}
                  key={image}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="h-full w-full object-cover"
                />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-6 flex h-14 justify-center overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              x: `-${
                index * 100 * (collapsedAspectRatio / expandedAspectRatio) +
                marginPercentage +
                index * gapPercentage
              }%`,
            }}
            style={{
              aspectRatio: expandedAspectRatio,
              gap: `${gapPercentage}%`,
            }}
            className="flex"
          >
            {images.map((image, i) => (
              <motion.button
                key={image}
                initial={false}
                whileHover={{ opacity: 1 }}
                animate={i === index ? 'active' : 'inactive'}
                variants={{
                  active: {
                    aspectRatio: expandedAspectRatio,
                    marginInline: `${marginPercentage}%`,
                    opacity: 1,
                  },
                  inactive: {
                    aspectRatio: collapsedAspectRatio,
                    marginInline: 0,
                    opacity: 0.5,
                  },
                }}
                className="shrink-0"
                onClick={() => setIndex(i)}
              >
                <img src={image} className="h-full object-cover" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
