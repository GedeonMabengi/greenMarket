import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        latitude: user.latitude || '',
        longitude: user.longitude || '',
        avatar: null,
        _method: 'patch',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informations du profil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Mettez à jour les informations de votre compte.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="name" value="Nom" />
                    <TextInput id="name" className="mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required isFocused autoComplete="name" />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} required autoComplete="username" />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Téléphone" />
                    <TextInput id="phone" className="mt-1 block w-full" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Adresse" />
                    <textarea id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows={2} />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                {user.is_seller && (
                    <div>
                        <InputLabel htmlFor="bio" value="Présentation" />
                        <textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows={3} />
                        <InputError className="mt-2" message={errors.bio} />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="latitude" value="Latitude" />
                        <TextInput id="latitude" type="number" step="any" className="mt-1 block w-full" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} />
                        <InputError className="mt-2" message={errors.latitude} />
                    </div>
                    <div>
                        <InputLabel htmlFor="longitude" value="Longitude" />
                        <TextInput id="longitude" type="number" step="any" className="mt-1 block w-full" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} />
                        <InputError className="mt-2" message={errors.longitude} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="avatar" value="Photo de profil" />
                    {user.avatar && (
                        <div className="mb-2">
                            <img src={`/storage/${user.avatar}`} alt="" className="h-20 rounded" />
                        </div>
                    )}
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('avatar', e.target.files[0])}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Votre email n'est pas vérifié.
                            <Link href={route('verification.send')} method="post" as="button" className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                Renvoyer le lien.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Un nouveau lien a été envoyé.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="bg-green-600 hover:bg-green-700">Enregistrer</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-gray-600">Enregistré.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
