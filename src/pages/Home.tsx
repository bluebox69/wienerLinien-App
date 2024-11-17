import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonModal,
    IonInput,
    IonToast,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import { fetchStations, getStations, addStation } from '../components/DataHandler';
import { Station } from '../components/types';

const Home: React.FC = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newStationName, setNewStationName] = useState('');
    const [newLatitude, setNewLatitude] = useState('');
    const [newLongitude, setNewLongitude] = useState('');
    const [sortCriteria, setSortCriteria] = useState<'name' | 'position'>('name');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Daten beim Start laden
    useEffect(() => {
        const loadStations = async () => {
            let storedStations = await getStations();
            if (!storedStations || storedStations.length === 0) {
                storedStations = await fetchStations();
            }
            setStations(storedStations);
        };
        loadStations();
    }, []);

    // Neue Station hinzufügen
    const handleAddStation = async () => {
        if (!newStationName || !newLatitude || !newLongitude) {
            setToastMessage('Please fill in all fields.');
            return;
        }

        const newStation: Station = {
            station_id: `${stations.length + 1}`,
            station_name: newStationName,
            latitude: newLatitude,
            longitude: newLongitude,
        };
        await addStation(newStation);
        setStations((prev) => [...prev, newStation]);
        setModalOpen(false);
        setToastMessage('Station added successfully.');
        setNewStationName('');
        setNewLatitude('');
        setNewLongitude('');
    };

    // Sortieren
    const sortedStations = stations
        .filter((station) => station.station_name) // Nur Einträge mit station_name behalten
        .sort((a, b) => {
            if (sortCriteria === 'name') {
                return a.station_name.localeCompare(b.station_name);
            }
            return parseFloat(a.latitude) - parseFloat(b.latitude);
        });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Stations</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={() => setModalOpen(true)}>
                    Add Station
                </IonButton>

                <IonSelect
                    value={sortCriteria}
                    placeholder="Sort by"
                    onIonChange={(e) => setSortCriteria(e.detail.value)}
                >
                    <IonSelectOption value="name">Name</IonSelectOption>
                    <IonSelectOption value="position">Position</IonSelectOption>
                </IonSelect>

                <IonList>
                    {sortedStations.map((station) => (
                        <IonItem key={station.station_id}>
                            <IonLabel>
                                <h2>{station.station_name}</h2>
                                <p>
                                    Lat: {station.latitude}, Lon: {station.longitude}
                                </p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
                    <IonContent className="ion-padding">
                        <h2>Add New Station</h2>
                        <IonInput
                            placeholder="Station Name"
                            value={newStationName}
                            onIonChange={(e) => setNewStationName(e.detail.value!)}
                        />
                        <IonInput
                            placeholder="Latitude"
                            value={newLatitude}
                            onIonChange={(e) => setNewLatitude(e.detail.value!)}
                        />
                        <IonInput
                            placeholder="Longitude"
                            value={newLongitude}
                            onIonChange={(e) => setNewLongitude(e.detail.value!)}
                        />
                        <IonButton expand="block" onClick={handleAddStation}>
                            Add
                        </IonButton>
                        <IonButton expand="block" color="danger" onClick={() => setModalOpen(false)}>
                            Cancel
                        </IonButton>
                    </IonContent>
                </IonModal>

                <IonToast
                    isOpen={!!toastMessage}
                    message={toastMessage}
                    duration={2000}
                    onDidDismiss={() => setToastMessage(null)}
                />
            </IonContent>
        </IonPage>
    );
};

export default Home;
