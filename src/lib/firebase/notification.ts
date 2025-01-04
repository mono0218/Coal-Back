import {EnhancedFcmMessage, FCM, FcmOptions} from "fcm-cloudflare-workers";

export async function createNotification(data:{ title:string, body:string, token:string, credential:string }) {
    const { title, body, token, credential } = data;
    const payload:EnhancedFcmMessage = {
        notification: {
            title: title,
            body: body,
        },
    };
    const fcmOptions = new FcmOptions({
        serviceAccount: JSON.parse(credential),
    });

    const fcm = new FCM(fcmOptions);
    await fcm.sendToToken(payload, token);
}

