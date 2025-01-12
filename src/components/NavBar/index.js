import Link from 'next/link';

export default function NavBar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
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
      </ul>
    </nav>
  );
}
