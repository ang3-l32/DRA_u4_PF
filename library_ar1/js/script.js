const books = [
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    publisher: "Editorial Sudamericana",
    description: "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, un relato emblemático del realismo mágico latinoamericano.",
    category: "Realismo mágico, Novela",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_31.zip&file=0008317261-L.jpg"
  },
  {
    title: "El amor en los tiempos del cólera",
    author: "Gabriel García Márquez",
    publisher: "Editorial Oveja Negra",
    description: "La historia de amor que desafía el tiempo y las adversidades entre Fermina Daza y Florentino Ariza, un relato apasionado y conmovedor.",
    category: "Novela Romántica",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_32.zip&file=0008317262-L.jpg"
  },
  {
    title: "Crónica de una muerte anunciada",
    author: "Gabriel García Márquez",
    publisher: "Editorial La Oveja Negra",
    description: "La reconstrucción de un asesinato inevitable en un pequeño pueblo caribeño, narrada con un estilo único y envolvente.",
    category: "Novela",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_33.zip&file=0008317263-L.jpg"
  },
  {
    title: "El otoño del patriarca",
    author: "Gabriel García Márquez",
    publisher: "Editorial Sudamericana",
    description: "La vida de un dictador eterno y su decadencia en un país caribeño, explorada con profundidad y simbolismo.",
    category: "Ficción Política",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_34.zip&file=0008317264-L.jpg"
  },
  {
    title: "El general en su laberinto",
    author: "Gabriel García Márquez",
    publisher: "Editorial Diana",
    description: "Los últimos días de Simón Bolívar, retratados con una mezcla de historia y ficción, llenos de melancolía y reflexión.",
    category: "Ficción Histórica",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_35.zip&file=0008317265-L.jpg"
  },
  {
    title: "Del amor y otros demonios",
    author: "Gabriel García Márquez",
    publisher: "Editorial Norma",
    description: "Una historia de amor trágica en la época colonial, inspirada en una leyenda que mezcla pasión y misterio.",
    category: "Realismo mágico",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_36.zip&file=0008317266-L.jpg"
  },
  {
    title: "Relato de un náufrago",
    author: "Gabriel García Márquez",
    publisher: "Tusquets Editores",
    description: "La historia real de un marinero que sobrevivió diez días en el mar, narrada con un estilo periodístico y humano.",
    category: "No Ficción",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_37.zip&file=0008317267-L.jpg"
  },
  {
    title: "La hojarasca",
    author: "Gabriel García Márquez",
    publisher: "Editorial Sudamericana",
    description: "La primera novela de García Márquez, ambientada en Macondo, con un estilo que marca el inicio de su legado literario.",
    category: "Realismo mágico",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_38.zip&file=0008317268-L.jpg"
  },
  {
    title: "Memoria de mis putas tristes",
    author: "Gabriel García Márquez",
    publisher: "Random House Mondadori",
    description: "Un anciano reflexiona sobre el amor y la vida al enamorarse de una joven, en un relato íntimo y poético.",
    category: "Novela",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_39.zip&file=0008317269-L.jpg"
  },
  {
    title: "Los funerales de la Mamá Grande",
    author: "Gabriel García Márquez",
    publisher: "Editorial Sudamericana",
    description: "Cuentos que exploran la vida y la muerte en un contexto mágico y realista, con un toque único del autor.",
    category: "Cuentos",
    cover: "https://ia902309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_40.zip&file=0008317270-L.jpg"
  }
];

let currentDate = new Date("2025-05-27T22:54:00-06:00"); // Updated to 10:54 PM CST, May 27, 2025

document.addEventListener("DOMContentLoaded", () => {
  const coverElement = document.querySelector("#book-cover");
  const textCanvas = document.getElementById("textCanvas");
  const ctx = textCanvas.getContext("2d");

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
    return currentY + lineHeight;
  }

  function updateBookInfo() {
    const formattedDate = currentDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).replace("GMT", "CST");

    // Select book based on the initial date (modulo 10)
    const bookIndex = 0; // Fixed to the first book since no navigation
    const book = books[bookIndex];

    // Update book cover
    coverElement.setAttribute("src", book.cover);

    // Clear the canvas
    ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);

    // Draw the text on the canvas
    let yPos = 40;

    // Title
    ctx.font = "bold 32px Roboto";
    ctx.fillStyle = "#e9f505";
    ctx.textAlign = "center";
    ctx.fillText(book.title.toUpperCase(), textCanvas.width / 2, yPos);
    yPos += 60;

    // Author
    ctx.font = "20px Roboto";
    ctx.fillStyle = "#e9f505";
    ctx.textAlign = "left";
    ctx.fillText(`Autor: ${book.author}`, 20, yPos);
    yPos += 40;

    // Category
    ctx.fillText(`Categoría: ${book.category}`, 20, yPos);
    yPos += 40;

    // Publisher
    ctx.fillText(`Editorial: ${book.publisher}`, 20, yPos);
    yPos += 40;

    // Description
    ctx.font = "18px Roboto";
    ctx.fillStyle = "#e9f505";
    yPos = wrapText(ctx, book.description, 20, yPos, textCanvas.width - 40, 28);

    // Date
    yPos += 20; // Add extra space before the date
    ctx.fillText(`Fecha: ${formattedDate}`, 20, yPos);
  }

  // Initialize with the current date
  updateBookInfo();
});