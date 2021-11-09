const urlPrincipal = "https://jsonplaceholder.typicode.com"
//const urlComentario = "https://jsonplaceholder.typicode.com/comments?postId=1";

const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
};

const getPost = async () =>{
    const url = `${urlPrincipal}/posts`;
    return request(url);
};

const getUser = async (id) =>{
    const url = `${urlPrincipal}/user/${id}`;
    return request(url);
};

//comments?postId=1
const getComentario = async (id) =>{
    const url = `${urlPrincipal}/comments?postId=${id}`;
    return request(url);
};

getPost().then((posts) => {
    console.log(posts);
    const postId = posts.map((p) => p.id) //el id es el que queremos
    console.log(postId);
    Promise.all(postId.map(function(id){
        getComentario(id).then(function(comentario){
            posts.forEach(element => {
                if (element.id === id){
                    const resultadoFinal = {posts: element, comentario: comentario}
                    console.log(resultadoFinal);
                }
            });
        }) 
    }))
});