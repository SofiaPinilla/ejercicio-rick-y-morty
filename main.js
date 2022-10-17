const personajesDiv = document.querySelector(".personajesDiv");
const API_URL = "https://api-rick-ymorty-production.up.railway.app/characters";
const paginaAnterior = document.getElementById("paginaAnterior");
const paginaActual = document.getElementById("paginaActual");
const paginaSiguiente = document.getElementById("paginaSiguiente");
const inicioNav = document.getElementById("inicioNav");
const formNav = document.getElementById("formNav");
const form = document.getElementById("form");
const inicioDiv = document.querySelector(".inicioDiv");
const nameInput = document.getElementById("name");
const statusInput = document.getElementById("status");
const imageInput = document.getElementById("image");

let pagina = 1;
const mostrarPersonajes = (personajes) => {
  personajesDiv.innerHTML = "";
  personajes.forEach((personaje) => {
    personajesDiv.innerHTML += `
    <div class="card col-lg-3 col-xs-12 col-md-6 m-1">
        <div class="personaje">
        <div class="card-body">
        <h3 class="card-header">${personaje.name}</h3>
        <h5 class="card-title">${personaje.status}</h5>
        <img style="height: 200px; width: 100%; display: block;" src="${personaje.image}"  alt="Card image">
        <button type="button" class="btn btn-outline-danger mt-1" onclick="eliminarPersonaje('${personaje._id}')">Eliminar</button>
        
        </div>
        </div>
        </div>
         `;
  });
};

const traerPersonajes = async () => {
  try {
    paginaActual.innerHTML = pagina;
    const res = await axios.get(API_URL + "?page=" + pagina);
    mostrarPersonajes(res.data);
  } catch (error) {
    console.error(error);
  }
};
traerPersonajes();

const pasarPagina = () => {
  // pagina = pagina + 1
  ++pagina;
  traerPersonajes();
};
paginaSiguiente.addEventListener("click", pasarPagina);

paginaAnterior.addEventListener("click", () => {
  --pagina;
  traerPersonajes();
});

const mostrarFormulario = () => {
  form.classList.remove("hide");
  inicioDiv.classList.add("hide");
};
const mostrarInicio = () => {
  form.classList.add("hide");
  inicioDiv.classList.remove("hide");
};

const crearPersonaje = async (e) => {
  e.preventDefault();
  const nuevoPersonaje = {
    name: nameInput.value,
    status: statusInput.value,
    image: imageInput.value,
  };

  try {
    await axios.post(API_URL, nuevoPersonaje);
    traerPersonajes()
  } catch (error) {
    console.error(error);
  }
  
};

const eliminarPersonaje = async(_id)=>{
  try {
    await axios.delete(API_URL + "/id/" + _id)
    traerPersonajes()
  } catch (error) {
    console.error(error)
  }
}
formNav.addEventListener("click", mostrarFormulario);
inicioNav.addEventListener("click", mostrarInicio);
form.addEventListener("submit", crearPersonaje);
