import Game from "./components/Game/Game";
import "./styles.css";

export default function App() {
  let gridSize = 3 * 3; // denotes a square matrix

  return (
    <div className="App">
      <h1>Let's play a game</h1>
      <img
        alt=""
        src="https://uc196617c3b15709771d8aa3c004.previews.dropboxusercontent.com/p/thumb/ABkJu97aY5py_ofzVzW7KS80b2LEwtgMFpocszexaI90A7mlm5CE4CtKBSBcATKw64nFfRD-4S9X1nN-uldvG3f7s6l9AH3AhZkc9pe-6Gqp0BOMUNXYKHMTCGMzy__rBmIRXSy8Dm8WalIeiH0_Z78IW1SP8HjUoRgGq_xB6vxzqFytWSzfwl83wGLp4j_xs6yP4ahGCWtbALhIj1eEzhuQ07lMTH_vjoLJx67pK5U_Z2mmtCBtyvNLc8hw0Z0H-CzwbsD0XlEfdbGnGY7fP4DDdEs2D5qEIy0H-YcSJM4F9fRK15drgYSzxKIR2vXiVlE0Fbd9hJcNbMIc75OgIaE9x3qCuWnOlKeOGI6dZVmmTpUPP36BgFCOhlV-BOFik98535QtNAlaATqBpE1w7874T9vhgh9g_7koygM-S_WibA/p.png"
        style={{ width: "200px" }}
      />
      <Game gridSize={gridSize} />
      {/* <ol>
        <li>Create the Grid first</li>
        <li>Filling the circle with alternate player</li>
        <li>Winning logic</li>
        <li>Reset game / Restart game</li>
      </ol> */}
    </div>
  );
}
