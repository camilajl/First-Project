const API_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key73a4f20c-3e8f-4af3-9d77-2f9cbff4d3e3';
const API_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=3&api_key73a4f20c-3e8f-4af3-9d77-2f9cbff4d3e3';
const API_DELETE = (id) =>`https://api.thedogapi.com/v1/favourites/${id}&api_key73a4f20c-3e8f-4af3-9d77-2f9cbff4d3e3`;

const spanError = document.getElementById('error')

async function loadRandomDogs (){

    const res = await fetch(API_RANDOM);
    const data = await res.json();

    console.log('Random')
    console.log(data)

    if (res.status !== 200 ){
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
     const perrito1 = document.getElementById('perrito1');
     const perrito2 = document.getElementById('perrito2');
     const btn1 = document.getElementById('btn1');
     const btn2 = document.getElementById('btn2');

     perrito1.src = data[0].url;
     perrito2.src = data[1].url;

     btn1.onclick = () => saveFavoriteDogs(data[0].id);
     btn2.onclick = () => saveFavoriteDogs(data[1].id);


     }
   
}

async function favoritesDogs (){

    const res = await fetch(API_FAVORITES,{
        method: 'GET',
       headers:{
           
            'x-api-key': '73a4f20c-3e8f-4af3-9d77-2f9cbff4d3e3',
         },
        
 
 });
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)

   if (res.status !==200 ){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }  else {

         

          data.forEach(doggy => {
          const section = document.getElementById('favoriteDoggies');
          section.innerHTML = "";

          const h2 = document.createElement('h2');
          const h2Text = document.createTextNode('Doggies Favoritos');
          h2.appendChild(h2Text);
          section.appendChild(h2);
         
         
         
          const article = document.createElement('article');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          const btnText = document.createTextNode('Quitar de favoritos');
         
          img.src = doggy.image.url;
          img.width = 150;

          btn.onclick = () => deleteFavoritedoggies(doggy.id);
          btn.appendChild(btnText);
          article.appendChild(img);
          article.appendChild(btn);
          section.appendChild(article);


           
      });
    }

}

async function saveFavoriteDogs (id){
    
  
    const res = await fetch(API_FAVORITES,{
        method: 'POST',
       headers:{
           'Content-Type' : 'application/json',
            'x-api-key': '73a4f20c-3e8f-4af3-9d77-2f9cbff4d3e3',
         },
        body: JSON.stringify({
            "image_id": id ,
           
           
         }),
 
         
 
 })
     const data = await res.json();
 
         console.log('Save')
         console.log(res)
 
     if (res.status !== 200) {
     spanError.innerHTML = "Hubo un error: " + res.status + data.message;
 } else {
    console.log('Doggie Guardado en Favoritos')
    favoritesDogs();
 }
 
 }

 
 
async function deleteFavoritedoggies(id){

    const res = await fetch(API_DELETE(id), {
        method: 'DELETE',
        headers:{
            
             'x-api-key': '73a4f20c-3e8f-4af3-9d77-2f9cbff4d3e3',
          },

    });

    const data = await res.json();

    if (res.status !==200 ){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }  else {
        console.log('Doggie Eliminado de Favoritos')
        favoritesDogs();
    }

}

loadRandomDogs();
favoritesDogs();





// HTTP STATUS CODE
// LOS DEL 200 DICE QUE BACK Y FRONT ESTAN BIEN 
// 300 EL BACKEND ESTA ENVIANDO LA SOLICITUD A UNA DIRECCION ERRONEA
//400 SOLICIUTD INCORRECTA DESDE EL FRONTEND 
//500 ERROR ENE L BACKEND 

//AUTENTICACIÓN -> QUIEN HACE LA SOLICITUD?
//AUTORIZACIÓN -> QUE PERMISOS QUIEN HACE LA SOLICITUD 

//API KEY 
//QUERY PARAMETER
//HEADERS

//METODOS HTTP
//GET -OBETENR INFO
//POST - CREAR INFO
//PUT & PATCH - EDITAR INFO CREADA
//DELETE

//MANIPULACIÓN DEL DOM 