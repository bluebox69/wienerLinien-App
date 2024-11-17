import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent, useIonRouter, IonText,
} from "@ionic/react";
import React from "react";

const Home: React.FC = () => {
    const navigation = useIonRouter()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>Hellor</h1>
                <IonText>Hello World</IonText>
            </IonContent>
        </IonPage>
    )
}

export default Home