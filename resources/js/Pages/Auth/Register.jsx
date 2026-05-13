import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer',
        phone: '',
        address: '',
        bio: '',
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setData({
                        ...data,
                        latitude: pos.coords.latitude.toString(),
                        longitude: pos.coords.longitude.toString(),
                    });
                },
                () => {}
            );
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Rejoignez GreenMarket pour acheter ou vendre des produits frais.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nom complet *" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email *" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="role" value="Je suis *" />
                    <select
                        id="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                    >
                        <option value="buyer">Acheteur</option>
                        <option value="seller">Vendeur (fermier)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Un vendeur peut aussi acheter des produits.</p>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Téléphone" />
                    <TextInput
                        id="phone"
                        value={data.phone}
                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Adresse" />
                    <textarea
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows={2}
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>

                {data.role === 'seller' && (
                    <div>
                        <InputLabel htmlFor="bio" value="Présentation de la ferme" />
                        <textarea
                            id="bio"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            rows={3}
                            placeholder="Décrivez votre ferme, vos produits..."
                        />
                        <InputError message={errors.bio} className="mt-2" />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="latitude" value="Latitude" />
                        <TextInput
                            id="latitude"
                            type="number"
                            step="any"
                            value={data.latitude}
                            onChange={(e) => setData('latitude', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
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
                            onChange={(e) => setData('longitude', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                        <InputError message={errors.longitude} className="mt-2" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 -mt-2">Remplies automatiquement si vous acceptez la géolocalisation.</p>

                <PasswordInput
                    id="password"
                    label="Mot de passe *"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    autoComplete="new-password"
                />

                <PasswordInput
                    id="password_confirmation"
                    label="Confirmer le mot de passe *"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                />

                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                        Déjà inscrit ?
                    </Link>

                    <PrimaryButton disabled={processing}>
                        S'inscrire
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
