import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import HtmlViewer from './Applications/HtmlViewer';
import TextToSpeech from './Applications/TextToSpeech';



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/html-viewer" element={<HtmlViewer />} />
        <Route path="/text-to-speech" element={<TextToSpeech />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;