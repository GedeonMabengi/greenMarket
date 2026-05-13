import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tableau de bord</h2>}
        >
            <Head title="Tableau de bord" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Profile card */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Mon profil</h3>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                                    {user.avatar ? (
                                        <img src={`/storage/${user.avatar}`} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-green-100 text-green-700 text-xl font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    <span className={`mt-1 inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                        user.role === 'seller' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user.role === 'seller' ? 'Vendeur' : 'Acheteur'}
                                    </span>
                                </div>
                            </div>
                            <Link href={route('profile.edit')} className="mt-4 inline-block text-sm text-green-600 hover:text-green-800">
                                Modifier mon profil →
                            </Link>
                        </div>

                        {/* Quick actions */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('marketplace.index')}
                                    className="block w-full text-center bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100 font-medium"
                                >
                                    Explorer le marché
                                </Link>
                                {user.is_seller && (
                                    <>
                                        <Link
                                            href={route('products.index')}
                                            className="block w-full text-center bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100 font-medium"
                                        >
                                            Gérer mes produits
                                        </Link>
                                        <Link
                                            href={route('products.create')}
                                            className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium"
                                        >
                                            + Ajouter un produit
                                        </Link>
                                    </>
                                )}
                                <Link
                                    href={route('orders.index')}
                                    className="block w-full text-center bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 font-medium"
                                >
                                    Voir mes commandes
                                </Link>
                            </div>
                        </div>

                        {/* Stats for seller */}
                        {user.is_seller && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Produits en vente</span>
                                        <span className="text-2xl font-bold text-green-700">{user.products_count || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Commandes reçues</span>
                                        <span className="text-2xl font-bold text-green-700">{user.orders_as_seller_count || 0}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
