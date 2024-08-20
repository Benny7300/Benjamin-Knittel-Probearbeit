'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState<string>('Lädt...');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch('/api/quote');
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht in Ordnung');
      }
      const data = await response.json();
      setQuote(data.value);
    } catch (error) {
      setQuote('Fehler beim Laden des Zitats');
    }
  };

  const fetchVisitorCount = async () => {
    try {
      const response = await fetch('/api/visitor');
      const data = await response.json();
      setVisitorCount(data.count);
    } catch (error) {
      setVisitorCount(null);
    }
  };

  const incrementVisitorCount = async () => {
    try {
      await fetch('/api/visitor', { method: 'PUT' });
      fetchVisitorCount();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Besucheranzahl', error);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchVisitorCount();
    incrementVisitorCount();  
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <a
          href="https://www.wus.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <img
            src="https://www.wus.de/_assets/93cc33772021915c246c29966f71886a/Icons/layout-logo-w-s-weis.svg"
            alt="Logo"
            className="w-32 h-auto ml-4 mt-2"
          />
        </a>
        <h1 className="text-xl font-bold mx-auto">Benjamin Knittel Probearbeit</h1>
      </header>

      <main className="flex flex-1">
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src="https://images01.military.com/sites/default/files/styles/full/public/2021-04/chucknorris.jpeg.jpg"
            alt="Chuck Norris"
            className="w-full h-auto max-w-full max-h-screen rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Zufälliges Chuck Norris Zitat</h1>
          <p className="text-xl mb-4 text-center">{quote}</p>
          <button
            onClick={fetchQuote}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Neues Zitat
          </button>
        </div>
      </main>

      <footer className="bg-black text-white p-4 text-center">
        {visitorCount !== null ? `Besucheranzahl: ${visitorCount}` : 'Lade Besucheranzahl...'}
      </footer>
    </div>
  );
}







