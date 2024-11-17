import React, { useEffect, useState } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from "@ionic/react";
import "./Profile.css";

// Typen für Package-Informationen
interface PackageInfo {
    name: string;
    version: string;
}

const Profile: React.FC = () => {
    const [packageInfo, setPackageInfo] = useState<PackageInfo | null>(null);

    // Fixe Koordinaten für die Karte
    const latitude = 48.193167;
    const longitude = 16.344694;

    useEffect(() => {
        // Dynamisches Einlesen der package.json
        fetch("/package.json")
            .then((response) => response.json())
            .then((data) => {
                setPackageInfo({
                    name: data.name,
                    version: data.version,
                });
            });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {/* Profilkarte */}
                <IonCard className="profile-card">
                    <img
                        src="src/assets/ProfilePicture.jpg"
                        alt="Profile"
                        className="profile-image"
                    />
                    <IonCardHeader>
                        <IonCardTitle>Paul Kogler</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Software Developer</p>
                        <p>Stumpergasse, Vienna, Austria</p>
                    </IonCardContent>
                </IonCard>

                {/* App-Information */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>App Information</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            <strong>Name:</strong> {packageInfo?.name || "Loading..."}
                        </p>
                        <p>
                            <strong>Version:</strong> {packageInfo?.version || "Loading..."}
                        </p>
                    </IonCardContent>
                </IonCard>

                {/* Standortkarte */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Developer Location</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <iframe
                            title="map"
                            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                            className="map-frame"
                        />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
