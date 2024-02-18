import React, { useState } from 'react';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (response.ok) {
        const data = await response.json();
        setDefinitions(data);
        setError('');
      } else {
        setError('No definitions found for the entered word.');
        setDefinitions([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again later.');
      setDefinitions([]);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
        <input type="text" value={word} onChange={handleChange} placeholder="Enter a word" style={{ marginRight: '10px', padding: '5px' }} />
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Search</button>
      </form>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      {definitions.length > 0 && (
        <div>
          {definitions.map((entry, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>{entry.word}</h2>
              <p style={{ marginBottom: '10px' }}>Phonetic: {entry.phonetic}</p>
              {entry.meanings.map((meaning, idx) => (
                <div key={idx}>
                  <h3>{meaning.partOfSpeech}</h3>
                  {meaning.definitions.map((definition, i) => (
                    <div key={i}>
                      <p style={{ marginBottom: '5px' }}>Definition: {definition.definition}</p>
                      {definition.synonyms.length > 0 && (
                        <p style={{ marginBottom: '5px' }}>Synonyms: {definition.synonyms.join(', ')}</p>
                      )}
                      {definition.antonyms.length > 0 && (
                        <p style={{ marginBottom: '5px' }}>Antonyms: {definition.antonyms.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {entry.phonetics.map((phonetic, idx) => (
                <div key={idx} style={{ marginTop: '10px' }}>
                  <p>Audio: <audio controls><source src={phonetic.audio} type="audio/mpeg" /></audio></p>
                  <p>Source URL: <a href={phonetic.sourceUrl} style={{ color: '#007bff', textDecoration: 'none' }}>{phonetic.sourceUrl}</a></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;
