import Papa from 'papaparse'
import { Storage } from '@ionic/storage';
import { Station } from './types';

// URL der CSV-Datei
const CSV_URL = 'https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv';

// Lokaler Speicher
const storage = new Storage({
    name: "station_data",
});

async function initializeStorage() {
    await storage.create();
}
initializeStorage();

/**
 * Fetch und Parse der Station-Daten.
 * @returns Liste von Stationen
 */
export const fetchStations = async (): Promise<Station[]> => {
    try {
        const response = await fetch(CSV_URL);
        const csvString = await response.text();

        // CSV parsen
        const results = Papa.parse(csvString, {
            header: true,
            delimiter: ';',
        });

        // Daten mappen
        const stations: Station[] = results.data.map((row: any) => ({
            station_id: row['HALTESTELLEN_ID'],
            station_name: row['NAME'],
            latitude: row['WGS84_LAT'],
            longitude: row['WGS84_LON'],
        }));

        // Speicher aktualisieren
        await storage.set('stations', stations);
        return stations;
    } catch (error) {
        console.error('Error fetching stations:', error);
        return [];
    }
};

/**
 * Stationen aus dem Speicher abrufen.
 * @returns Liste von Stationen
 */
export const getStations = async (): Promise<Station[]> => {
    const stations = await storage.get('stations');
    return stations || [];
};

/**
 * Eigene Stationen hinzufügen.
 * @param newStation Neue Station
 */
export const addStation = async (newStation: Station): Promise<void> => {
    const stations = await getStations();
    stations.push(newStation);
    await storage.set('stations', stations);
};
