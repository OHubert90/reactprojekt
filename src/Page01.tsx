import './Page01.css';
import React, { useEffect, useState } from 'react';
import { fetchRickAndMortyCharacters, Character } from './rickAndMortyData';
import CreateCharacterForm from './CreateCharacterForm';

const Page01: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRickAndMortyCharacters();
                setCharacters(data);
                setFilteredCharacters(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === '') {
            setFilteredCharacters(characters);
            setErrorMessage('');
        } else {
            const results = characters.filter((character) =>
                character.name.toLowerCase().includes(term)
            );

            setFilteredCharacters(results);
            setErrorMessage(results.length === 0 ? 'No characters found' : '');
        }
    };

    const addCharacter = (newCharacter: Character) => {
        setCharacters([...characters, newCharacter]);
        setFilteredCharacters([...characters, newCharacter]);
    };

    return (
        <div className="page-container">
            <h1>Rick and Morty Characters</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search characters"
                className="search-input"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <CreateCharacterForm onAddCharacter={addCharacter} />
            <div className="characters-list">
                {filteredCharacters.map((character) => (
                    <div key={character.id} className="character-container">
                        <h2>{character.name}</h2>
                        <p>Status: {character.status}</p>
                        <p>Species: {character.species}</p>
                        <p>Gender: {character.gender}</p>
                        <img src={character.image} alt={character.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page01;
