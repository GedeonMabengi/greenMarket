import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="GreenMarket" />
            <div className="min-h-screen bg-green-50">
                <nav className="bg-white border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">G</span>
                                </div>
                                <span className="font-bold text-xl text-green-800">GreenMarket</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                                    >
                                        Tableau de bord
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                                            Connexion
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                                        >
                                            S'inscrire
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-20 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900">
                        Vos produits frais,<br />directement du producteur
                    </h1>
                    <p className="mt-4 text-lg text-green-700 max-w-2xl mx-auto">
                        GreenMarket connecte les fermiers avec les consommateurs. Trouvez des produits frais près de chez vous et soutenez l'agriculture locale.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href={route('marketplace.index')}
                            className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 font-semibold text-lg"
                        >
                            Explorer le marché
                        </Link>
                        <Link
                            href={route('register')}
                            className="bg-white text-green-700 border-2 border-green-600 px-8 py-3 rounded-xl hover:bg-green-50 font-semibold text-lg"
                        >
                            Devenir vendeur
                        </Link>
                    </div>
                </div>

                <div className="py-16 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Proche de chez vous</h3>
                                <p className="mt-2 text-gray-600">Trouvez des produits frais dans un rayon de quelques kilomètres grâce à la géolocalisation.</p>
                            </div>
                            <div className="p-6">
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Prix direct producteur</h3>
                                <p className="mt-2 text-gray-600">Achetez sans intermédiaires et profitez de prix justes pour vous et le fermier.</p>
                            </div>
                            <div className="p-6">
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Qualité garantie</h3>
                                <p className="mt-2 text-gray-600">Tous les produits sont frais, locaux et vendus par des agriculteurs vérifiés.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
