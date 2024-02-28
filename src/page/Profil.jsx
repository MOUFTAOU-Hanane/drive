import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import Navbar from '../page/Navbar';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                // Votre code pour récupérer le nom de l'utilisateur
            } catch (error) {
                console.error('Erreur lors de la récupération du nom de l\'utilisateur:', error);
            }
        };

        if (user) {
            fetchUserName();
        }
    }, [user]);

    const logout = () => {
        // Votre fonction de déconnexion
    };

    const handlePasswordChange = async () => {
        try {
            const user = auth.currentUser;

            if (!user) {
                setError("Utilisateur non trouvé");
                return;
            }

            // Vérifier que les deux mots de passe sont identiques
            if (newPassword !== confirmNewPassword) {
                setError("Les nouveaux mots de passe ne correspondent pas.");
                return;
            }

            // Mettre à jour le mot de passe
            await auth.updatePassword(user, newPassword);
            setSuccessMessage('Mot de passe mis à jour avec succès !');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='row mt-4'>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" value={user?.email || ''} readOnly />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputText3" className="col-sm-2 col-form-label">Nom</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={userName} readOnly />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputNewPassword" className="col-sm-2 col-form-label">Nouveau mot de passe</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputNewPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputConfirmNewPassword" className="col-sm-2 col-form-label">Confirmer le nouveau mot de passe</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputConfirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>Changer le mot de passe</button>
                    <button type="button" className="btn btn-danger" onClick={logout}>Déconnexion</button>
                </form>
            </div>
        </div>
    );
};

export default Profil;
