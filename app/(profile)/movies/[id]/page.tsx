export default async function MoviePage ({params}: {params: { id : string}}){
  return (
    <div>
      <p>{params.id}</p>
    </div>
  )
}
