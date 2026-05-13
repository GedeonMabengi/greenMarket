import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Indiquez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                        isFocused={true}
                        placeholder="votre@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                        Retour à la connexion
                    </Link>

                    <PrimaryButton disabled={processing}>
                        Envoyer le lien
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
