
const handlePost =() => {
   fetch("https://openapi.programming-hero.com/api/levels/all")
   .then(Response => Response.json())
   .then(data => {
    displayPost(datas)
   })
}

const displayPost =(datas) => {
  for (const data of datas )
    console.log(data)
}