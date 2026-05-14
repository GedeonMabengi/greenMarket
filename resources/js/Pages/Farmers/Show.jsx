import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import ProductCard from '@/Components/ProductCard';

export default function Show({ auth, farmer, products }) {
    const Layout = auth?.user ? AuthenticatedLayout : PublicLayout;

    return (
        <Layout>
            <Head title={farmer.name} />

            <div className="bg-green-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            {farmer.avatar ? (
                                <img src={`/storage/${farmer.avatar}`} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-green-100 text-green-700 text-2xl font-bold">
                                    {farmer.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900">{farmer.name}</h1>
                            {farmer.bio && <p className="mt-1 text-gray-600 max-w-xl">{farmer.bio}</p>}
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 justify-center sm:justify-start">
                                {farmer.phone && <span>📞 {farmer.phone}</span>}
                                {farmer.address && <span>📍 {farmer.address}</span>}
                            </div>
                            {(farmer.latitude && farmer.longitude) && (
                                <a
                                    href={`https://www.google.com/maps?q=${farmer.latitude},${farmer.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-sm text-green-600 hover:underline"
                                >
                                    Voir la localisation sur Google Maps
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Produits en vente ({products.length})
                </h2>
                {products.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">Ce vendeur n'a pas de produits disponibles.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
