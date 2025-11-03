import Link from 'next/link';

export default function NotFound404() {
  return (
    <main className="container section">
      <h1 className="h1">404 – Page not found</h1>
      <p className="lead">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="btn btn-primary">
        Go home
      </Link>
    </main>
  );
}
