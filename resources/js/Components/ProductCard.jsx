import { Link } from '@inertiajs/react';

function imageUrl(path) {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/images/')) return path;
    return `/storage/${path}`;
}

export default function ProductCard({ product }) {
    const img = imageUrl(product.image);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
                {img ? (
                    <img
                        src={img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {product.distance !== null && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.distance} km
                    </span>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{product.category?.name}</p>
                    </div>
                    <span className="font-bold text-green-700">
                        {Number(product.price).toLocaleString()} FCFA
                    </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {Number(product.quantity).toLocaleString()} {product.unit} dispo
                    </span>
                    <Link
                        href={route('farmers.show', product.user_id)}
                        className="text-sm text-green-600 hover:text-green-800"
                    >
                        {product.user?.name}
                    </Link>
                </div>
                <Link
                    href={route('products.show', product.id)}
                    className="mt-4 block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                    Voir le produit
                </Link>
            </div>
        </div>
    );
}
