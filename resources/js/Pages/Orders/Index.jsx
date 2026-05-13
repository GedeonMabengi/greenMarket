import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, ordersAsBuyer, ordersAsSeller }) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
        pending: 'En attente',
        confirmed: 'Confirmée',
        shipped: 'Expédiée',
        delivered: 'Livrée',
        cancelled: 'Annulée',
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Mes commandes</h2>}
        >
            <Head title="Mes commandes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Orders as buyer */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Mes achats</h3>
                        </div>
                        {ordersAsBuyer.length === 0 ? (
                            <div className="p-6 text-gray-500 text-center">Aucune commande.</div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {ordersAsBuyer.map(order => (
                                    <div key={order.id} className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <span className="text-sm font-medium text-gray-900">Commande #{order.id}</span>
                                                <span className="ml-3 text-sm text-gray-500">chez {order.seller?.name}</span>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                                                {statusLabels[order.status]}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex justify-between py-1">
                                                    <span>{item.product?.name} x {Number(item.quantity).toLocaleString()}</span>
                                                    <span>{Number(item.total_price).toLocaleString()} FCFA</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-2 text-right font-semibold text-gray-900">
                                            Total : {Number(order.total_amount).toLocaleString()} FCFA
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Orders as seller */}
                    {auth.user.is_seller && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Mes ventes</h3>
                            </div>
                            {ordersAsSeller.length === 0 ? (
                                <div className="p-6 text-gray-500 text-center">Aucune vente.</div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {ordersAsSeller.map(order => (
                                        <div key={order.id} className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-900">Commande #{order.id}</span>
                                                    <span className="ml-3 text-sm text-gray-500">par {order.buyer?.name}</span>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                                                    {statusLabels[order.status]}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex justify-between py-1">
                                                        <span>{item.product?.name} x {Number(item.quantity).toLocaleString()}</span>
                                                        <span>{Number(item.total_price).toLocaleString()} FCFA</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-2 text-right font-semibold text-gray-900">
                                                Total : {Number(order.total_amount).toLocaleString()} FCFA
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
