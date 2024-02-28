import { ref, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../config/firebase';


// Fonction pour obtenir l'URL de téléchargement d'un fichier
const getFileDownloadURL = async (fileName) => {
    const userUID = auth.currentUser.uid;
    const fileRef = ref(storage, `/files/${userUID}/${fileName}`);

    try {
        // Obtenir l'URL de téléchargement du fichier
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Error getting download URL:', error);
        return null;
    }
};
export {getFileDownloadURL}