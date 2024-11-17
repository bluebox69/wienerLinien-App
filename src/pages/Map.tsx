import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { Icon } from "leaflet";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import { getStations } from "../components/DataHandler";

import "./MapStyles.css"
import "leaflet/dist/leaflet.css";


const Map: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [stations, setStations] = useState<any[]>([]);

    // State für den Marker
    const [markers, setMarkers] = useState([
        {
            geocode: [48.25, 16.33], // Wien-Position
            popUp: "Wiener Linien Station",
        },
    ]);

    // Hole die aktuelle Position des Geräts
    useEffect(() => {
        Geolocation.getCurrentPosition()
            .then((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                // Sobald der Standort verfügbar ist, setze ihn als Marker-Position
                setMarkers((prevMarkers) => [
                    {
                        geocode: [position.coords.latitude, position.coords.longitude],
                        popUp: "Hier bin ich!",
                    },
                ]);
            })
            .catch((err) => {
                console.error("Fehler beim Abrufen der Geolokalisierung", err);
            });
        // Lade die Stationen aus dem Speicher
        const loadStations = async () => {
            const storedStations = await getStations();
            setStations(storedStations);
        };
        loadStations();

    }, []);

    // Ich Icon
    const customIcon = new Icon({
        iconUrl:"src/assets/img.png",
        iconSize: [64, 64]
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <MapContainer
                    center={latitude && longitude ? [latitude, longitude] : [48.21, 16.36]} zoom={12}
                >
                    <TileLayer
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {/* Wiener Linien Stationen */}
                    {stations
                        .filter(
                            (station) =>
                                station.latitude !== undefined &&
                                station.longitude !== undefined &&
                                !isNaN(station.latitude) &&
                                !isNaN(station.longitude)
                        )
                        .map((station, index) => (
                        <Marker key={index} position={[station.latitude, station.longitude]}>
                            <Popup>{station.station_name}</Popup>
                        </Marker>
                    ))}
                    {/* Marker für die aktuelle Position */}
                    {latitude && longitude && (
                        <Marker position={[latitude, longitude]} icon={customIcon}>
                            <Popup>Hier bin ich</Popup>
                        </Marker>
                    )}


                </MapContainer>
            </IonContent>
        </IonPage>
    );
};

export default Map;