// import * as dotenv from 'dotenv';
// import { IDatabaseConfig } from './dbConfig.interface';

// dotenv.config();

// export const databaseConfig: IDatabaseConfig ={

// }

import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';

const serviceAccount = require('../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

});

@Injectable()
export class FirebaseService{
    private db: FirebaseFirestore.Firestore;

    constructor(){
        this.db = admin.firestore();
    }

    // async saveData(id: number, name: string, email: string, role: string):Promise<any>{
    //     const collectionRef = this.db.collection(id);
    //     const docRef = await collectionRef.add(name);
    //     const savedData = await docRef.get();
    //     return savedData.data();
    // }
}