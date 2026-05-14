import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PasswordInput from '@/Components/PasswordInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Supprimer le compte
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Une fois votre compte supprimé, toutes vos données seront définitivement effacées.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Supprimer le compte
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Êtes-vous sûr de vouloir supprimer votre compte ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Cette action est irréversible. Veuillez entrer votre mot de passe pour confirmer.
                    </p>

                    <div className="mt-6">
                        <PasswordInput
                            id="password"
                            ref={passwordInput}
                            label="Mot de passe"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            isFocused
                            placeholder="Mot de passe"
                            className="w-3/4"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Annuler
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Supprimer définitivement
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
