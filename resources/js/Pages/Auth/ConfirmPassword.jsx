import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmation du mot de passe" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Zone sécurisée</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Cette action nécessite de confirmer votre mot de passe avant de continuer.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <PasswordInput
                    id="password"
                    label="Mot de passe"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    isFocused={true}
                />

                <div className="flex items-center justify-end">
                    <PrimaryButton disabled={processing}>
                        Confirmer
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
