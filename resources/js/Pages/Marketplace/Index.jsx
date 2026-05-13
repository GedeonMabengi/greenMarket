import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import ProductCard from '@/Components/ProductCard';
import { useState, useEffect } from 'react';

export default function Index({ auth, products, categories, filters }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        radius: filters.radius || '',
        lat: filters.lat || '',
        lng: filters.lng || '',
    });

    const [locationStatus, setLocationStatus] = useState('');

    useEffect(() => {
        if (!data.lat && !data.lng && navigator.geolocation) {
            setLocationStatus('recherche');
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setData({
                        ...data,
                        lat: pos.coords.latitude.toString(),
                        lng: pos.coords.longitude.toString(),
                        radius: data.radius || '50'
                    });
                    setLocationStatus('trouvée');
                },
                () => setLocationStatus('refusée'),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('marketplace.index'), { preserveState: true });
    };

    const handleCategoryClick = (slug) => {
        const newCategory = data.category === slug ? '' : slug;
        setData('category', newCategory);
        get(route('marketplace.index', { ...data, category: newCategory }), { preserveState: true });
    };

    return (
        <Layout>
            <Head title="Marché agricole" />

            <div className="bg-green-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-green-900 text-center">
                        GreenMarket — Vos produits frais, près de chez vous
                    </h1>
                    <p className="mt-2 text-center text-green-700">
                        Achetez directement auprès des fermiers de votre région
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 max-w-3xl mx-auto space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.search}
                                onChange={e => setData('search', e.target.value)}
                                placeholder="Rechercher un produit..."
                                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                Rechercher
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => handleCategoryClick(cat.slug)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        data.category === cat.slug
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <label className="text-sm text-gray-600">
                                Rayon max :
                                <select
                                    value={data.radius}
                                    onChange={e => setData('radius', e.target.value)}
                                    className="ml-2 rounded-md border-gray-300 text-sm"
                                >
                                    <option value="">Tout</option>
                                    <option value="5">5 km</option>
                                    <option value="10">10 km</option>
                                    <option value="25">25 km</option>
                                    <option value="50">50 km</option>
                                    <option value="100">100 km</option>
                                </select>
                            </label>
                            {locationStatus === 'recherche' && (
                                <span className="text-xs text-gray-500">Localisation en cours...</span>
                            )}
                            {locationStatus === 'refusée' && (
                                <span className="text-xs text-orange-500">Localisation refusée</span>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {products.data.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        Aucun produit trouvé.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center gap-2">
                            {products.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || ''}
                                    preserveState
                                    className={`px-4 py-2 rounded-lg text-sm ${
                                        link.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
