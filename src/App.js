import pokedex from "../src/img/pokedex.png"
import pokemones from "../src/img/pokemones.jpeg"
import Pokedex from "./component/Pokedex";
import "./css/style.css"

function App() {
  return (
    <div>

      <nav style={{  backgroundImage: `url(${pokemones})`, backgroundRepeat: "no-repeat", objectFit:"cover", display: "grid", justifyContent:"flex-end", boxShadow:"0px 0px 5px 3px black"}}>
        <img style={{
          width: "120vh",
          background:"linear-gradient(0.25turn, transparent, red)" 
        }}
          alt="Pokedex"
          src={pokedex} />
      </nav>

        <Pokedex />

    </div>
  );
}

export default App;
