	// Initialize Firebase
    var config = {
        apiKey: "AIzaSyDLBCdVHHJIIYJtXwauCYsTR69Fo5Axpuw",
        authDomain: "exclusive-ytdownloader.firebaseapp.com",
        projectId: "exclusive-ytdownloader",
        storageBucket: "exclusive-ytdownloader.appspot.com",
        messagingSenderId: "951901185903",
        appId: "1:951901185903:web:7c401758511b841044aa9a",
        measurementId: "G-4BHPJMDYY1",
    };
    //@ts-ignore
    firebase.initializeApp(config);

    //const auth=firebase.auth();
     //@ts-ignore
   export const db = firebase.firestore();

export   async function get(collection:any, db:any) {
        let docs:any[] = [];

        const querySnapshot = await db.collection(collection).get();

        querySnapshot.forEach(function (doc:any) {
            docs.push({
                data: doc.data(),
            });
        });
        return docs;
    }

 export  const getData = async (app:any,collection:string) => {
        let appConfig = await get(collection, app).then((doc) => {
            console.log(doc);
        });
        
    };

  