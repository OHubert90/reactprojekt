// rickAndMortyData.ts

// Definiere die Struktur der Daten, die von der API zurückgegeben werden
export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export const fetchRickAndMortyCharacters = async (): Promise<Character[]> => {
    const response = await fetch('https://rickandmortyapi.com/api/character/');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
};

// Beispielhafter Aufruf der Funktion (diese Zeile sollte in deiner App-Komponente stehen, nicht hier)
// fetchRickAndMortyCharacters().then(characters => console.log(characters)).catch(error => console.error(error));
