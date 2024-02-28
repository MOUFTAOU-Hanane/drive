import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth'
import{auth} from '../config/firebase.js'

const Connexion = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home")
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };
   
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
  
    // const onSubmit = () => {
    //   alert(`Submitted ${name} ${email}`);
    // };
  
    return (
      <div className='container'>
         <div className='container'>
            <div className='container shadow-lg mt-5'  style={{  width: '750px' }}>
                    <div className='row p-5'>
                        <div className='col-lg-6 text-start'>
                            <h4 className=''> Gestion de fichier</h4> 
                            <p className=''> Connectez-vous maintenant pour une expérience fluide et efficace</p>  
                        </div> 
                        <div className='col-lg-6 text-start'>
                                <form>
                                      
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" 
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
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                            label="Mots de passe"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}  
                                            required                                    
                                           
                                            />
                                        </div>
                                        <button type="submit " 
                                        className="btn btn-primary bg-danger"
                                        onClick={onSubmit}>Submit</button>
                                        <p><a href="#" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"><Link to="/inscription">Vous navez pas un compte</Link></a></p>

                                </form>
                        </div> 

                    </div>
            </div>
                
        </div>

    </div>

       
      
    );
  };

  export default Connexion
