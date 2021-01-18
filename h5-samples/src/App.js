import './App.css';
import TakeSnap from "./component/TakeSnap";
import ScreenSharing from "./component/ScreenSharing";
import PeerConnection from "./component/PeerConnection";
import Microphone from "./component/Microphone";

function App() {
  return (
    <div className="App">
        <PeerConnection/>
    </div>
  );
}

export default App;
