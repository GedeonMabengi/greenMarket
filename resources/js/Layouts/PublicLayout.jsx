import { Link, usePage } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const auth = usePage().props.auth;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <span className="font-bold text-xl text-green-800">GreenMarket</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                href={route('marketplace.index')}
                                className="text-gray-600 hover:text-green-700 font-medium text-sm"
                            >
                                Marché
                            </Link>
                            {auth?.user ? (
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

            <main className="flex-1">{children}</main>

            <footer className="bg-green-900 text-green-100 py-8 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <span className="font-bold text-lg">GreenMarket</span>
                        </div>
                        <p className="text-sm text-green-300">
                            Produits frais, directement du producteur à votre table.
                        </p>
                        <p className="text-sm text-green-400">
                            © {new Date().getFullYear()} GreenMarket
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
