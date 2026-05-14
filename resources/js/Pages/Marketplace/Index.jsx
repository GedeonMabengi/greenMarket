import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import ProductCard from '@/Components/ProductCard';
import { useState, useEffect } from 'react';

export default function Index({ auth, products, categories, filters }) {
    const Layout = auth?.user ? AuthenticatedLayout : PublicLayout;
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

    const categoryColors = {
        legumes: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
        fruits: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
        cereales: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200',
        'produits-laitiers': 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
        viandes: 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200',
        oeufs: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200',
        miel: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200',
        plantes: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
    };

    const categoryIcons = {
        legumes: '🥕',
        fruits: '🍊',
        cereales: '🌾',
        'produits-laitiers': '🥛',
        viandes: '🍗',
        oeufs: '🥚',
        miel: '🍯',
        plantes: '🌿',
    };

    return (
        <Layout>
            <Head title="Marché agricole" />

            {/* Hero */}
            <div className="bg-green-600 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Découvrez les produits de votre région
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-green-100">
                            Achetez directement auprès des fermiers près de chez vous. Frais, locaux et livrés avec le sourire.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
                            <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-xl">
                                <input
                                    type="text"
                                    value={data.search}
                                    onChange={e => setData('search', e.target.value)}
                                    placeholder="Rechercher tomates, lait, miel..."
                                    className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-300"
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
                                >
                                    Rechercher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Filtres & contenu */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {/* Catégories */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                                    data.category === cat.slug
                                        ? 'bg-green-600 border-green-600 text-white shadow-md'
                                        : (categoryColors[cat.slug] || 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200')
                                }`}
                            >
                                <span className="text-lg">{categoryIcons[cat.slug] || '📦'}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Barre de filtres secondaires */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                    <p className="text-gray-600">
                        {products.total} produit{products.total > 1 ? 's' : ''} trouvé{products.total > 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-600 flex items-center gap-2">
                            Rayon :
                            <select
                                value={data.radius}
                                onChange={e => {
                                    setData('radius', e.target.value);
                                    get(route('marketplace.index', { ...data, radius: e.target.value }), { preserveState: true });
                                }}
                                className="rounded-lg border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
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
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Localisation...</span>
                        )}
                        {locationStatus === 'refusée' && (
                            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">Géolocalisation refusée</span>
                        )}
                        {data.lat && data.lng && (
                            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">📍 {Number(data.lat).toFixed(2)}, {Number(data.lng).toFixed(2)}</span>
                        )}
                    </div>
                </div>

                {/* Grille produits */}
                {products.data.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900">Aucun produit trouvé</h3>
                        <p className="text-gray-500 mt-2">Essayez de modifier vos filtres ou votre recherche.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            {products.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || ''}
                                    preserveState
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-green-600 text-white shadow-md'
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
