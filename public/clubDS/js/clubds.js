async function fetchJson() {
  try {
    const result = await fetch("data.json");
    if (!result.ok) {
      throw new Error(result.status);
    }
    const json = await result.json();
    console.log(json);
    makeDsTable(json);
  } catch (error) {
    console.error("Can't find data.json.", error);
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbzaQbcI9UZDcDlSHHl2NHilhmePrNrwxRdOFkmIXsfnbfksKKmAB3V65WZ8jPWU-7E/exec?table=clubds"
    );
    const json = await result.json();
    console.log(json);
    makeDsTable(json);
  }

  function makeDsTable(json) {
    document.getElementById("ds-count").textContent = json.length;
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
      songTitleLink.href = i.url;
      songTitleLink.textContent = i.title;
      songTitleCell.appendChild(songTitleLink);
      const songByCell = document.createTextNode(" by ");
      const songArtistCell = document.createElement("span");
      songArtistCell.classList.add("ds-table-song-artist");
      songArtistCell.textContent = i.artist;
      songCell.appendChild(songGenreCell);
      songCell.appendChild(songTitleCell);
      songCell.appendChild(songByCell);
      songCell.appendChild(songArtistCell);
      tr.appendChild(songCell);

      const medals = Object.keys(i.medal).sort();
      medals.forEach((j) => {
        const medalCell = document.createElement("td");
        medalCell.classList.add("ds-table-medal");
        const image = document.createElement("img");
        image.classList.add("ds-table-medal-image");
        const medal = i.medal[j];
        console.log(medals);
        if (medal === "gold") {
          image.src = "/clubDS/images/gold.png";
        } else if (medal === "silver") {
          image.src = "/clubDS/images/silver.png";
        } else if (medal === "bronze") {
          image.src = "/clubDS/images/bronze.png";
        } else if (medal === "warn") {
          image.src = "/clubDS/images/warn.png";
        } else if (medal === "notyet") {
          image.src = "/clubDS/images/notyet.png";
        } else if (medal === "") {
          image.src = "/clubDS/images/blank.png";
        }
        medalCell.appendChild(image);
        tr.appendChild(medalCell);
      });
      tbody.appendChild(tr);
    });
    document.querySelector(".ds-table").appendChild(tbody);
    document.querySelector(".ds-load").remove();
  }
}

fetchJson();
