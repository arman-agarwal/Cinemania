export async function getMovies() {
    const response = await fetch(`http://localhost:3000/getAllMovies`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
}
  
export async function writeMovies(newData) {
    const response = await fetch(`http://localhost:3000/writeMovie?movie=${JSON.stringify(newData)}`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
}

export async function deleteMovie(cardID){
    const response = await fetch(`http://localhost:3000/deleteMovie?cardID=${cardID}`, {
        method: 'DELETE',
      }); 
    const data = await response.json();
    return data;
}


export async function updateMovie(newData){
  const response = await fetch(`http://localhost:3000/updateMovie?movie=${JSON.stringify(newData)}`, {
      method: 'PUT',
    }); 
  const data = await response.json();
  return data;
}

export async function uploadImage(formData){
  const response = await fetch(`http://localhost:3001/upload`, {
      method: 'POST',
      body: formData
    }); 
  const data = await response.json();
  console.log(data);
  return data;
}

// export async function uploadPoster(formData){
//     const response = await fetch(`http://localhost:3000/uploadPoster?formData=${formData}`, {
//         method: 'POST',
//       }); 
//     const data = await response.json();
//     return data;
// }