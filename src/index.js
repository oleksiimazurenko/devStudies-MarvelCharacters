// import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

// import MarvelService from './services/MarvelService';
// const marvelService = new MarvelService;
// marvelService.getAllCharacters().then(res => console.log(res));
// marvelService.getAllCharacters().then(res => console.log(res.data.results));
// marvelService.getCharacter(1011052).then(res => console.log(res));

// ReactDOM.createRoot(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root'));
root.render(<App />);