import * as firebaseAdmin from 'firebase-admin';

export async function createNotification(data: {title: string, body: string, token: string}) {
    firebaseAdmin.initializeApp();
    await firebaseAdmin
        .messaging()
        .subscribeToTopic(data.token, data.title);
}
