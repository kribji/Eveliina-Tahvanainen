import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container section">
      <h1 className="h1">Not found</h1>
      <p className="lead">We couldn’t find that page.</p>
      <Link href="/" className="btn">
        Back to home
      </Link>
    </main>
  );
}
