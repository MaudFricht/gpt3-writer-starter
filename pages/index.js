import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };


  return (
    <div className="root">
      <Head>
        <title>Comme la Fontaine - Création de fables originales</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ma fable comme La Fontaine</h1>
          </div>
          <div className="header-subtitle">
            <h2>Choisi <strong>deux ou trois animaux</strong> et obtient ta fable personnalisée.</h2>
          </div>
        </div>

        <div className="prompt-container">
          <textarea
          className="prompt-box"
          placeholder="Entre tes personnages ici. Tu peux leur donner un nom. Ex: Jean-Marc le loup et Corine la souris"
          value={userInput}
          onChange={onUserChangedText}/>
        </div>

        <div className="prompt-buttons">
          <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Créer ma fable</p>}
            </div>
          </a>
        </div>

        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Votre fable</h3>
              </div>
            </div>
            <div className="output-content">
              {isGenerating ? <span className="loader"></span> : <p>{apiOutput}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
