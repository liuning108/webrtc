import './App.css';
import TakeSnap from "./component/TakeSnap";
import ScreenSharing from "./component/ScreenSharing";
import PeerConnection from "./component/PeerConnection";
import Microphone from "./component/Microphone";
import WebSocketDemo from './component/WebSocketDemo'
function App() {
  return (
    <div className="App">
        <PeerConnection/>
        <WebSocketDemo/>
    </div>
  );
}

export default App;
