import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Vérification de l'email" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Vérifiez votre email</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Merci de votre inscription ! Avant de commencer, veuillez vérifier votre email en cliquant sur le lien que nous vous avons envoyé. Si vous ne l'avez pas reçu, nous pouvons vous en renvoyer un.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                    Un nouveau lien de vérification a été envoyé à votre adresse email.
                </div>
            )}

            <form onSubmit={submit} className="flex items-center justify-between">
                <PrimaryButton disabled={processing}>
                    Renvoyer l'email
                </PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                    Déconnexion
                </Link>
            </form>
        </GuestLayout>
    );
}
