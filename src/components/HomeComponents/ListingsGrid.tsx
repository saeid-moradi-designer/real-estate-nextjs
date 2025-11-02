import Image from "next/image";
import Link from "next/link";

interface Listing {
  id: number | string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface ListingsGridProps {
  listings: Listing[];
}

const ListingsGrid: React.FC<ListingsGridProps> = ({ listings }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <Image
            src={"/images/" + (listing.images?.[0] ?? "placeholder.jpg")}
            alt={listing.title}
            width={400}
            height={250}
            className="w-full h-56 object-cover"
          />

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {listing.title}
            </h3>

            <p className="text-gray-600 flex-grow">{listing.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-blue-600 font-bold">
                {listing.price.toLocaleString()} تومان
              </span>

              <Link
                href={`/listings/${String(listing.id)}`}
                className="text-white bg-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                جزئیات
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListingsGrid;
