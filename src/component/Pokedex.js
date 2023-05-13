import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, CloseButton, ButtonGroup } from "react-bootstrap"
import axios from 'axios';
import pokedexAparato from "../img/pokedexAparato.jpg"
import fondopoke from "../img/fondo-poke.jpg"
import pokemones from "../img/pokemones.jpeg"
import audio from "../audio/pokemon-intro.mp3"


const Pokedex = () => {

  const [poke, setPoke] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
      .then(response => response.data.results)
      .then(data => data.map(r => {
        axios.get(r.url)
          .then(response => setPoke((data) => [...data, response.data]))
      }))
  }, [])

  console.log(poke)

  const [show, setShow] = useState(false);

  const [pUnico, setPUnico] = useState([])


  const [id, setId] = useState([])

  const Mostrar = (id) => {

    setId(id)

    setPUnico(poke.find(Element => Element.id === id))

  }

  //Manejo de las imagenes de los pokemones
  const [imagenPke, setImagenPke] = useState();

  const [shiny, setShiny] = useState(0)

  const frontPoke = pUnico?.sprites?.front_default
  const backPoke = pUnico?.sprites?.back_default
  const FrontPokeShiny = pUnico?.sprites?.front_shiny
  const backPokeShiny = pUnico?.sprites?.back_shiny

  const Back = () => {
    if (shiny === 1) {
      setImagenPke(backPokeShiny)
    } else {
      setImagenPke(backPoke)
    }
  }
  const Front = () => {
    if (shiny === 1) {
      setImagenPke(FrontPokeShiny)
    } else {
      setImagenPke(frontPoke)
    }
  }

  const Shiny = () => {
    setShiny(1)
    setImagenPke(FrontPokeShiny)
  }
  const Normal = () => {
    setShiny(0)
    setImagenPke(frontPoke)
  }

  //Poder colocar la musica 
  const cargarSonido = (fuente) => {
    const sonido = document.createElement("audio");
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
  };

  const sonido = cargarSonido(audio)

  const Sonar = () => {
    sonido.play()
    console.log("prendido")
  }

  //habilidadesde los pokemones
  let ability = []

  pUnico.abilities?.map((p, i) => (
    ability.push(p.ability)
  ))

  //shiny principal

  const [fotoPrincipal, setFotoPrincipal] = useState(0)

  useEffect(() =>{
    if (fotoPrincipal === 2) {
      setFotoPrincipal(0)
    }
  },[fotoPrincipal])

  return (
    <div style={{ background: "linear-gradient( transparent -50% , #ABEBC6)" }}>

      <div onClick={() => Sonar()} className='musica'>
        <h1 style={{ cursor: "pointer" }}>🔊</h1>
      </div>

      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <h1 onClick={() => setFotoPrincipal(fotoPrincipal + 1)} style={{ cursor: "pointer", background:"white", padding:"5px", boxShadow:"0px 0px 5px 2px black", borderRadius:"20px" }} align='center'>Shiny/Normal</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly", padding: "50px", flexWrap: "wrap" }}>
        {
          !poke
            ?
            <h1>cargando</h1>
            :
            poke.map((p, i) => (

              <Card key={i} style={{ width: '18rem', margin: "10px", background: "lightBlue" }}>

                <Card.Img variant="top" src={
                  (fotoPrincipal === 0)
                  ? 
                  p.sprites.other.home.front_default
                  :
                  p.sprites.other.home.front_shiny
                } />

                <Card.Body style={{ margin: "auto" }} >
                  <h4 align="center">{p.name}</h4>
                  <Card.Text>
                    {p.url}
                  </Card.Text>
                  <Button variant="primary" onClick={() => {
                    Mostrar(p.id);
                    setShow(true)
                  }}>
                    Informacion del {p.name}
                  </Button>
                </Card.Body>
              </Card>
            ))
        }

      </div>

      <Modal
        size="lg"
        centered
        style={{ borderRadius: "20px" }}
        show={show}>
        <Modal.Header >
          <CloseButton
            onClick={() => {
              setShow(false);
              setImagenPke()
              setShiny(0)
            }}
          />
        </Modal.Header>
        <img alt='pokedex' src={pokedexAparato} />

        <div
          style={{
            backgroundImage: `url(${fondopoke})`,
            backgroundSize: "cover",
            position: "absolute",
            top: "31%",
            left: "8.4%",
            width: "27vh",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <img style={{ width: "19vh" }} alt='pokemon' src={(!imagenPke ? pUnico.sprites?.front_default : imagenPke)} />
        </div>

        <div style={{ position: "absolute", top: "35%", left: "62%", width: "29vh", borderRadius: "20px", color: "white" }}>
          <h1>{pUnico.name}</h1>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly", position: "absolute", top: "69%", left: "55%", width: "35vh", borderRadius: "20px", color: "white" }}>
          <h6 >{ability[0]?.name}</h6>
          <h6 >{ability[1]?.name}</h6>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "66.4%", left: "28.5%", width: "10vh", borderRadius: "20px", color: "white" }}>
          <h3 style={{ margin: "10px", cursor: "pointer" }} onClick={() => Front()} variant="outline-dark">🢀</h3>
          <h3 style={{ margin: "10px", cursor: "pointer" }} onClick={() => Back()} variant="outline-dark">🢂</h3>
        </div>

        <ButtonGroup style={{ position: "absolute", top: "62.8%", left: "7%", width: "16vh", borderRadius: "10px", background: "white" }} aria-label="Basic example">
          <Button variant="outline-dark" onClick={() => Shiny()} >Shiny</Button>
          <Button variant="outline-success" onClick={() => Normal()} >Normal</Button>
        </ButtonGroup>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Pokedex