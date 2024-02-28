// firestoreUtils.js

import { collection, query, where, getDocs,  getFirestore } from 'firebase/firestore';

 const fetchFilesByEmail = async (email) => {
    const db = getFirestore();
    const filesRef = collection(db, 'shared_files');
    const q = query(filesRef, where('email', '==', email));

    try {
        const querySnapshot = await getDocs(q);
        const files = [];
        querySnapshot.forEach((doc) => {
            files.push(doc.data());
        });
        return files;
    } catch (error) {
        console.error('Error fetching files by email:', error);
        return [];
    }
};
export {fetchFilesByEmail}