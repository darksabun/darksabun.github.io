async function fetchJson() {
  const result = await fetch("https://script.google.com/macros/s/AKfycby0BjvUTPhWcovgWvXGghxdJykga-rvu1ceiveIFihAWZct86hEAA0/exec?table=clubds");
  const json = await result.json();
  console.log(json);

  document.querySelector(".ds-count").textContent = json.length;
  const frag = document.createDocumentFragment();
  const tbody = frag.appendChild(document.createElement("tbody"));
  json.forEach((i, index) => {
    const tr = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.classList.add("ds-table-number");
    numberCell.textContent = `${i.number}`;
    tr.appendChild(numberCell);

    const songCell = document.createElement("td");
    songCell.classList.add("ds-table-song");
    const songGenreCell = document.createElement("div");
    songGenreCell.classList.add("ds-table-song-genre");
    songGenreCell.textContent = i.genre;
    const songTitleCell = document.createElement("span");
    songTitleCell.classList.add("ds-table-song-title");
    const songTitleLink = document.createElement("a");
    songTitleLink.href= i.url;
    songTitleLink.textContent = i.title + " ";
    songTitleCell.appendChild(songTitleLink);
    const songByCell = document.createTextNode("by");
    const songArtistCell = document.createElement("span");
    songArtistCell.classList.add("ds-table-song-artist");
    songArtistCell.textContent = " " + i.artist;
    songCell.appendChild(songGenreCell);
    songCell.appendChild(songTitleCell);
    songCell.appendChild(songByCell);
    songCell.appendChild(songArtistCell);
    tr.appendChild(songCell);

    const medalArray = [];
    for (let n = 1; n <= 4; n += 1) {
      const medalCell = document.createElement("td");
      medalArray.push(medalCell);
    }
    Object.keys(i).forEach((j) => {
      if (j.indexOf("medal_") >= 0) {
        const person = j.slice(6);
        const image = document.createElement("img");
        image.classList.add("ds-table-medal-image");
        const medal = i[j];
        if (medal === "gold") {
          image.src = "./images/gold.png";
        } else if (medal === "silver") {
          image.src = "./images/silver.png";
        } else if (medal === "bronze") {
          image.src = "./images/bronze.png";
        } else if (medal === "") {
          image.src = "./images/blank.png";
        }

        if (person === "lt") {
          medalArray[0].appendChild(image);
        } else if (person === "parksu") {
          medalArray[1].appendChild(image);
        } else if (person === "ms") {
          medalArray[2].appendChild(image);
        } else if (person === "luxury") {
          medalArray[3].appendChild(image);
        }
      }
    });
    medalArray.forEach((j, index1) => {
      j.classList.add("ds-table-medal");
      tr.appendChild(j);
    });
    tbody.appendChild(tr);
  });
  document.querySelector(".ds-table").appendChild(tbody);
}

fetchJson();
