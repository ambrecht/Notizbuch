// Dateiname: NavigationButton.js
'use client';

// Dateiname: NavigationButton.js

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavigationButton() {
  const pathname = usePathname();

  if (pathname === '/lesen') {
    return (
      <Link href="/schreiben">
        <button className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
          Schreiben
        </button>
      </Link>
    );
  } else if (pathname === '/') {
    return (
      <>
        <Link href="/schreiben">
          <button className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
            Schreiben
          </button>
        </Link>
        <Link href="/lesen">
          <button className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
            Lesen
          </button>
        </Link>
      </>
    );
  } else {
    return (
      <Link href="/lesen">
        <button className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
          Lesen
        </button>
      </Link>
    );
  }
}
