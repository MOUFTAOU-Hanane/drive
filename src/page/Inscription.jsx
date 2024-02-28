import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc , getFirestore} from 'firebase/firestore';
import { auth } from '../config/firebase.js'

    const Inscription = () => {
        const navigate = useNavigate();

        const [email, setEmail] = useState('');
        const [pwd, setPassword] = useState('');
        const [name, setName] = useState('');

        const onSubmit = async (e) => {
            e.preventDefault();

            try {
                const res = await createUserWithEmailAndPassword(auth, email, pwd);
                const user = res.user;
                const db = getFirestore();
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: name,
                    email: email,
                });
                navigate("/connexion");
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        };

    return (
        <>
            <div className='container'>
                <div className='container'>
                    <div className='container shadow-lg mt-5' style={{ width: '750px' }}>
                        <div className='row p-5'>
                            <div className='col-lg-6 text-start'>
                                <h4 className=''> Gestion de fichier</h4>
                                <p className=''> Inscrivez-vous maintenant pour une expérience fluide et efficace</p>
                            </div>
                            <div className='col-lg-6 text-start'>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            label="Nom"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mots de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            label="Mots de passe"
                                            value={pwd}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary bg-danger"
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </button>
                                    <p>
                                        <Link to="/connexion">Vous avez un compte</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inscription;
