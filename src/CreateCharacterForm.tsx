// CreateCharacterForm.tsx

import React, { useState } from 'react';
import { Character } from './rickAndMortyData';

interface CreateCharacterFormProps {
    onAddCharacter: (newCharacter: Character) => void;
}

const CreateCharacterForm: React.FC<CreateCharacterFormProps> = ({ onAddCharacter }) => {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [species, setSpecies] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCharacter: Character = {
            id: Date.now(), // temporäre ID
            name,
            status,
            species,
            gender,
            image,
            origin: { name: 'Unknown', url: '' }, // temporäre Werte
            location: { name: 'Unknown', url: '' }, // temporäre Werte
            episode: [],
            url: '',
            created: new Date().toISOString()
        };
        onAddCharacter(newCharacter);
        setName('');
        setStatus('');
        setSpecies('');
        setGender('');
        setImage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Status:</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
            </div>
            <div>
                <label>Species:</label>
                <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} required />
            </div>
            <div>
                <label>Gender:</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            </div>
            <button type="submit">Add Character</button>
        </form>
    );
};

export default CreateCharacterForm;
