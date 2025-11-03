import Link from 'next/link';

export default function Home() {
  return (
    <section className="section">
      <div className="container space-y-6">
        <h1 className="h1">Hello 👋</h1>
        <p className="lead">This is your clean boilerplate. Replace this with your hero section.</p>

        <div className="flex gap-3">
          <Link href="/product" className="btn btn-primary">
            View products
          </Link>
          <Link href="/about" className="btn">
            About
          </Link>
        </div>
      </div>
    </section>
  );
}
