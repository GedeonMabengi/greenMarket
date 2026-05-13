import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-green-50 pt-6 sm:justify-center sm:pt-0">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">G</span>
                </div>
                <Link href="/" className="font-bold text-2xl text-green-800 hover:text-green-900">
                    GreenMarket
                </Link>
            </div>

            <div className="mt-2 w-full overflow-hidden bg-white px-8 py-8 shadow-xl sm:max-w-lg sm:rounded-2xl border border-green-100">
                {children}
            </div>

            <p className="mt-6 text-sm text-green-700/70">
                © {new Date().getFullYear()} GreenMarket — Produits frais, près de chez vous.
            </p>
        </div>
    );
}
