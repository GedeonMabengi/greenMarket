import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';

function imageUrl(path) {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/images/')) return path;
    return `/storage/${path}`;
}

export default function Show({ auth, product }) {
    const Layout = auth?.user ? AuthenticatedLayout : PublicLayout;
    const img = imageUrl(product.image);

    return (
        <Layout>
            <Head title={product.name} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            <div className="h-64 md:h-auto bg-gray-200 flex items-center justify-center">
                                {img ? (
                                    <img
                                        src={img}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                                        {product.category?.name}
                                    </span>
                                    {product.is_available ? (
                                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Disponible</span>
                                    ) : (
                                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">Indisponible</span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                                <p className="mt-4 text-3xl font-bold text-green-700">
                                    {Number(product.price).toLocaleString()} <span className="text-lg font-normal text-gray-600">FCFA / {product.unit}</span>
                                </p>
                                <p className="mt-4 text-gray-600">{product.description || 'Aucune description.'}</p>

                                <div className="mt-6 space-y-2 text-sm text-gray-700">
                                    <p><span className="font-medium">Stock :</span> {Number(product.quantity).toLocaleString()} {product.unit}</p>
                                    <p>
                                        <span className="font-medium">Vendeur :</span>{' '}
                                        <Link href={route('farmers.show', product.user_id)} className="text-green-600 hover:underline">
                                            {product.user?.name}
                                        </Link>
                                    </p>
                                    {(product.latitude && product.longitude) && (
                                        <p>
                                            <span className="font-medium">Position :</span>{' '}
                                            <a
                                                href={`https://www.google.com/maps?q=${product.latitude},${product.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline"
                                            >
                                                Voir sur la carte
                                            </a>
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8">
                                    {auth?.user ? (
                                        <Link
                                            href={route('farmers.show', product.user_id)}
                                            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
                                        >
                                            Contacter le vendeur
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium"
                                        >
                                            Connectez-vous pour acheter
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
