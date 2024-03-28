import React from "react";

function NewCard({ data }) {
  // Verificar si data está definido
  if (!data) {
    console.error("Error: data no está definido.");
    return null;
  }

  // Desestructura data
  const { title, description, imageUrl } = data;

  // Ahora puedes usar estas variables directamente en tu componente
  console.log("Título:", title);
  console.log("Descripción:", description);
  console.log("URL de la imagen:", imageUrl);

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
}

export default NewCard;
