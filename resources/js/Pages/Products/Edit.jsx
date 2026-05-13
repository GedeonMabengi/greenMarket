import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        category_id: product.category_id,
        image: null,
        is_available: product.is_available,
        latitude: product.latitude || '',
        longitude: product.longitude || '',
        _method: 'patch',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Modifier le produit</h2>}
        >
            <Head title="Modifier le produit" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            <div>
                                <InputLabel htmlFor="name" value="Nom du produit *" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    rows={3}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <InputLabel htmlFor="price" value="Prix (FCFA) *" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="quantity" value="Quantité *" />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.quantity}
                                        onChange={e => setData('quantity', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="unit" value="Unité *" />
                                    <select
                                        id="unit"
                                        value={data.unit}
                                        onChange={e => setData('unit', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        required
                                    >
                                        <option value="kg">kg</option>
                                        <option value="litre">litre</option>
                                        <option value="unité">unité</option>
                                        <option value="botte">botte</option>
                                        <option value="douzaine">douzaine</option>
                                        <option value="sac">sac</option>
                                    </select>
                                    <InputError message={errors.unit} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="category_id" value="Catégorie *" />
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    required
                                >
                                    <option value="">Choisir une catégorie</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Image (laisser vide pour conserver l'actuelle)" />
                                {product.image && (
                                    <div className="mb-2">
                                        <img src={`/storage/${product.image}`} alt="" className="h-24 rounded" />
                                    </div>
                                )}
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="is_available"
                                    type="checkbox"
                                    checked={data.is_available}
                                    onChange={e => setData('is_available', e.target.checked)}
                                    className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                />
                                <InputLabel htmlFor="is_available" value="Disponible à la vente" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="latitude" value="Latitude" />
                                    <TextInput
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        value={data.latitude}
                                        onChange={e => setData('latitude', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.latitude} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="longitude" value="Longitude" />
                                    <TextInput
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        value={data.longitude}
                                        onChange={e => setData('longitude', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.longitude} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing} className="bg-green-600 hover:bg-green-700">
                                    Mettre à jour
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
