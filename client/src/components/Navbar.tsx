import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          DEEP SIGH
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/Detect">Detect fake review</Link>
          </li>
          <li>
            <details>
              <summary>How to use ?</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>Coming Soon</li>
                <li>Coming Soon</li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/">Docs & API</Link>
          </li>
          <li>
            <Link href="/Price">Price</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
