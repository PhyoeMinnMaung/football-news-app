import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState(['chelsea']);

  const teams = ['chelsea', 'barcelona', 'arsenal', 'manchester', 'bayern', 'psg'];

  useEffect(() => {
    if (selectedTeams.length === 0) return;

    axios.get('http://localhost:8080/api/news', {
      params: { teams: selectedTeams },
      paramsSerializer: params => {
        return params.teams.map(team => `teams=${encodeURIComponent(team)}`).join('&');
      }
    })
    .then(response => {
      console.log("Fetched news:", response.data);
      setNews(response.data);
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
  }, [selectedTeams]);

  const toggleTeam = (team) => {
    setSelectedTeams(prev =>
      prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
  };

  return (
    <div className="App">
      <h1>Football News</h1>
      <h2>Live Football News</h2>

      <div className="button-group">
        {teams.map(team => (
          <button
            key={team}
            onClick={() => toggleTeam(team)}
            className={selectedTeams.includes(team) ? 'selected' : ''}
          >
            {team}
          </button>
        ))}
      </div>

      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <ul className="news-list">
          {news.map((item, index) => (
            <li key={index} className="news-card">
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="news-image"
                />
              )}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <h4>{item.title}</h4>
              </a>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
