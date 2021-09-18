
let seleccionado=document.getElementById("combo");
let seleccionar=seleccionado.value;
console.log(seleccionar);

const main = document.querySelector("#main2");
const FiltroGenero = document.querySelector("#FiltroGenero");
let contenedorgeneros=document.querySelector("#checkgenero");

function Obtener()
{
  let crearListaGeneros="";
  let SeleccionGenero=document.getElementById("combo").value;
 

  console.log(SeleccionGenero);
//Mostrar Todo
  if(SeleccionGenero==="Todo"){
    contenedorgeneros.innerHTML="";
    //obtiene la referencia al contenedor main


/* consigue el listado de generos */
fetch(
  genres_list_http +
    new URLSearchParams({
      api_key: api_key,
      language:"es-MX"
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((item) => {
      fetchListaPeliculasPorGenero(item.id, item.name);
    });
  });

const fetchListaPeliculasPorGenero = (id, genres) => {
  fetch(
    movie_genres_http +
      new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        language:"es-MX",
        page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      construirElementoCategoria(`Peliculas_de_${genres}`, data.results);
    })
    .catch((err) => console.log(err));
};

/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};

 
  //Filtrar Por Genero
}else if(SeleccionGenero==="Genero"){
  main.innerHTML="";
  fetch(
    genres_list_http +
      new URLSearchParams({
        api_key: api_key,
        language:"es-MX"
      })
  )
    .then((res) => res.json())
    .then((data) => {
      data.genres.forEach((item) => {
        checkgener(item.name,item.id);
        IdGeneros.push(item.id);
        console.log(item.name);
      });
    });

    const checkgener=(genero,id)=>{

crearListaGeneros+=`<br><input type="checkbox" id=${id} value=${genero}>${genero}</label>`;

contenedorgeneros.innerHTML=crearListaGeneros;
    }
}
//Arreglo con IDs


console.log(IdGeneros);


}
let IdGeneros=[];
let IdGenerosClasificados=[];
//Obtener los IDS de los checkbox
function check(){
  FiltroGenero.innerHTML="";
  IdGenerosClasificados=[];
  for(i=0;i<IdGeneros.length;i++){
  var gener=document.getElementById(IdGeneros[i]);
  if (gener.checked){
    IdGenerosClasificados.push(IdGeneros[i]);
    
  }
  }
  console.log(IdGenerosClasificados);
  fetch(
    genres_list_http +
      new URLSearchParams({
        api_key: api_key,
        language:"es-MX"
      })
  )
    .then((res) => res.json())
    .then((data) => {
      data.genres.forEach((item) => {
        for(i=0;i<IdGenerosClasificados.length;i++){
          if(item.id==IdGenerosClasificados[i]){
            fetchListaPeliculasPorGeneroClasificado(item.id, item.name);
          }
        }
        
      });
    });
  
  const fetchListaPeliculasPorGeneroClasificado = (id, genres) => {
    fetch(
      movie_genres_http +
        new URLSearchParams({
          api_key: api_key,
          with_genres: id,
          language:"es-MX",
          page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        construirElementoCategoria(`Peliculas_de_${genres}`, data.results);
      })
      .catch((err) => console.log(err));
  };
  /* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  FiltroGenero.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};
  }
  
