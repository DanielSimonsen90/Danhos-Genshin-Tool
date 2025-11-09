import React, { useState } from 'react';
import { useCharacterData } from '@/stores/DataStore/DataStoreHooks';
import { Character } from '@/common/models';
import CharacterImage from '@/components/common/media/Images/CharacterImage';

interface Team {
  name: string;
  characters: Character[];
}

export default function Development() {
  const { Characters } = useCharacterData();
  
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Team 1', characters: [] },
    { name: 'Team 2', characters: [] }
  ]);
  
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [randomizedTeamSize, setRandomizedTeamSize] = useState<number | null>(null);
  const [removedCharacters, setRemovedCharacters] = useState<Character[]>([]);

  // Get all characters that are already selected in any team
  const selectedCharacters = teams.flatMap(team => team.characters);
  
  // Get available characters (not already selected and not removed from pool)
  const availableCharacters = Characters.filter(character => 
    !selectedCharacters.some(selected => selected.name === character.name) &&
    !removedCharacters.some(removed => removed.name === character.name)
  );

  const randomizeTeamSize = () => {
    // Generate random number between 1-4
    const randomSize = Math.floor(Math.random() * 4) + 1;
    setRandomizedTeamSize(randomSize);
  };

  const randomizeTeam = () => {
    if (!randomizedTeamSize) {
      alert('Please randomize team size first!');
      return;
    }

    if (availableCharacters.length < randomizedTeamSize) {
      alert(`Not enough characters available! Need ${randomizedTeamSize} but only ${availableCharacters.length} available.`);
      return;
    }

    // Get random characters for the team
    const shuffledCharacters = [...availableCharacters].sort(() => Math.random() - 0.5);
    const randomTeamCharacters = shuffledCharacters.slice(0, randomizedTeamSize);

    // Set the team with the random characters
    setTeams(prevTeams => 
      prevTeams.map((team, index) => 
        index === currentTeamIndex
          ? { ...team, characters: randomTeamCharacters }
          : team
      )
    );

    // Clear the randomized team size after use
    setRandomizedTeamSize(null);
  };

  const resetTeams = () => {
    setTeams([
      { name: 'Team 1', characters: [] },
      { name: 'Team 2', characters: [] }
    ]);
    setRandomizedTeamSize(null);
    setRemovedCharacters([]);
  };

  const removeCharacterFromTeam = (teamIndex: number, characterIndex: number) => {
    const characterToRemove = teams[teamIndex].characters[characterIndex];
    
    // Add character to removed pool
    setRemovedCharacters(prev => [...prev, characterToRemove]);
    
    // Remove character from team
    setTeams(prevTeams =>
      prevTeams.map((team, tIndex) =>
        tIndex === teamIndex
          ? { ...team, characters: team.characters.filter((_, cIndex) => cIndex !== characterIndex) }
          : team
      )
    );
  };

  const rerollCharacterInTeam = (teamIndex: number, characterIndex: number) => {
    if (availableCharacters.length === 0) {
      alert('No characters available to reroll with!');
      return;
    }

    // Get a random character from available characters
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    const randomCharacter = availableCharacters[randomIndex];

    // Replace the character at the specified position
    setTeams(prevTeams =>
      prevTeams.map((team, tIndex) =>
        tIndex === teamIndex
          ? {
              ...team,
              characters: team.characters.map((char, cIndex) =>
                cIndex === characterIndex ? randomCharacter : char
              )
            }
          : team
      )
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <style>
        {`
          .character-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--background-quaternary);
          }
        `}
      </style>
      <h1 style={{ color: 'var(--text-primary)' }}>Character Team Randomizer</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={randomizeTeamSize}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: 'var(--brand)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Randomize Team Size
          </button>
          
          {randomizedTeamSize && (
            <span style={{ 
              color: 'var(--text-primary)', 
              fontSize: '16px',
              padding: '10px 15px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: '4px',
              border: `2px solid var(--brand)`
            }}>
              Team Size: {randomizedTeamSize}
            </span>
          )}
        </div>
        
        <div>
          <button
            onClick={randomizeTeam}
            disabled={!randomizedTeamSize || availableCharacters.length === 0}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: 'var(--text-success)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              opacity: (!randomizedTeamSize || availableCharacters.length === 0) ? 0.6 : 1
            }}
          >
            Randomize Team
          </button>
          
          <button
            onClick={resetTeams}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--text-danger)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reset Teams
          </button>
        </div>
      </div>

      {/* Team Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--text-primary)' }}>Current Team: {teams[currentTeamIndex].name}</h3>
        <div style={{ marginBottom: '10px' }}>
          {teams.map((team, index) => (
            <button
              key={team.name}
              onClick={() => setCurrentTeamIndex(index)}
              style={{
                marginRight: '10px',
                padding: '8px 16px',
                backgroundColor: index === currentTeamIndex ? 'var(--brand)' : 'var(--background-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--background-tertiary)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {team.name} ({team.characters.length}/4)
            </button>
          ))}
        </div>
      </div>

      {/* Teams Display */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {teams.map((team, teamIndex) => (
          <div
            key={team.name}
            style={{
              border: `2px solid var(--background-tertiary)`,
              borderRadius: '8px',
              padding: '15px',
              minWidth: '300px',
              backgroundColor: teamIndex === currentTeamIndex ? 'var(--background-secondary)' : 'var(--background-primary)'
            }}
          >
            <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>{team.name}</h3>
            <div style={{ minHeight: '200px' }}>
              {team.characters.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No characters selected</p>
              ) : (
                team.characters.map((character, characterIndex) => (
                  <div
                    key={`${character.name}-${characterIndex}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px',
                      margin: '5px 0',
                      backgroundColor: 'var(--background-tertiary)',
                      borderRadius: '4px',
                      gap: '10px'
                    }}
                  >
                    <CharacterImage 
                      character={character.name}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{character.name}</strong>
                      <br />
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {character.element} • {character.weapon} • {character.region}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        onClick={() => rerollCharacterInTeam(teamIndex, characterIndex)}
                        disabled={availableCharacters.length === 0}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--brand)',
                          color: 'var(--text-primary)',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          opacity: availableCharacters.length === 0 ? 0.6 : 1
                        }}
                      >
                        Reroll
                      </button>
                      
                      <button
                        onClick={() => removeCharacterFromTeam(teamIndex, characterIndex)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--text-danger)',
                          color: 'var(--text-primary)',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--background-secondary)', borderRadius: '8px' }}>
        <h4 style={{ color: 'var(--text-primary)' }}>Stats:</h4>
        <p style={{ color: 'var(--text-secondary)' }}>Available Characters: {availableCharacters.length}</p>
        <p style={{ color: 'var(--text-secondary)' }}>Total Characters: {Characters.length}</p>
        <p style={{ color: 'var(--text-secondary)' }}>Characters Selected: {selectedCharacters.length}</p>
        <p style={{ color: 'var(--text-secondary)' }}>Characters Removed from Pool: {removedCharacters.length}</p>
      </div>
    </div>
  );
}