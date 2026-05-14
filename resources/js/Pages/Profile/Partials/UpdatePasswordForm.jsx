import InputError from '@/Components/InputError';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Modifier le mot de passe
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Utilisez un mot de passe long et aléatoire pour sécuriser votre compte.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <PasswordInput
                    id="current_password"
                    ref={currentPasswordInput}
                    label="Mot de passe actuel"
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    error={errors.current_password}
                    autoComplete="current-password"
                />

                <PasswordInput
                    id="password"
                    ref={passwordInput}
                    label="Nouveau mot de passe"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    autoComplete="new-password"
                />

                <PasswordInput
                    id="password_confirmation"
                    label="Confirmer le mot de passe"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                />

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="bg-green-600 hover:bg-green-700">
                        Enregistrer
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Enregistré.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
