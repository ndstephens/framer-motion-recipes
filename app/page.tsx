import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home Page',
};

const links = [
  { path: '/1-steps', label: 'Lesson 1 - Multistep wizard' },
  { path: '/2-email', label: 'Lesson 2 - Email client' },
  { path: '/3-header-part-1', label: 'Lesson 3 - Fixed header: Part 1' },
  { path: '/4-header-part-2', label: 'Lesson 4 - Fixed header: Part 2' },
  { path: '/5-carousel-part-1', label: 'Lesson 5 - Carousel: Part 1' },
  { path: '/6-carousel-part-2', label: 'Lesson 6 - Carousel: Part 2' },
  { path: '/7-resizable-panel', label: 'Lesson 7 - Resizable panel' },
  { path: '/8-calendar', label: 'Lesson 8 - Calendar' },
];

export default function HomePage() {
  return (
    <div className="from-slate-700 to-slate-900 min-h-screen bg-gradient-to-br p-8">
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path} className="text-blue-300 underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
