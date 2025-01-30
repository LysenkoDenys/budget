import Link from 'next/link';
import ThemeSwitch from '../../components/ThemeSwitch/index';

export default function NavBar() {
  return (
    <>
      <nav
        style={{
          padding: '1rem',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="">
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '1rem',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/statistics">Statistics</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </div>
        <div className="flex wrap ">
          <ThemeSwitch />
        </div>
      </nav>
    </>
  );
}
