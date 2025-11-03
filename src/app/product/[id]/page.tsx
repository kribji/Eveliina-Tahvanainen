import Link from 'next/link';

type Item = { id: string; name: string; price: string };
const items: Item[] = [
  { id: 'sample-1', name: 'Sample One', price: '€29' },
  { id: 'sample-2', name: 'Sample Two', price: '€39' },
  { id: 'sample-3', name: 'Sample Three', price: '€49' },
];

export default function ProductListPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Products</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group rounded-2xl border overflow-hidden bg-white block"
            >
              <div className="aspect-square bg-slate-100" />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-slate-500">{p.price}</div>
                </div>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition">View</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
