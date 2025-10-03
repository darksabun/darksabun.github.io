async function fetchJson() {
  const result = await fetch(
    "https://script.google.com/macros/s/AKfycbzaQbcI9UZDcDlSHHl2NHilhmePrNrwxRdOFkmIXsfnbfksKKmAB3V65WZ8jPWU-7E/exec?table=clubdslist"
  );
  const json = await result.json();
  json.sort(function (a, b) {
    return b.number - a.number;
  });
  console.log(json);

  document.getElementById("ds-count").textContent = json.length;
  const frag = document.createDocumentFragment();
  const tbody = frag.appendChild(document.createElement("tbody"));
  json.forEach((i, index) => {
    const tr = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.classList.add("ds-table-number");
    numberCell.textContent = `${i.number}`;
    tr.appendChild(numberCell);

    const eventNameCell = document.createElement("td");
    eventNameCell.classList.add("ds-table-song");
    const eventDateCell = document.createElement("div");
    eventDateCell.classList.add("ds-table-song-genre");
    eventDateCell.textContent = i.date;
    const eventTitleCell = document.createElement("span");
    eventTitleCell.classList.add("ds-table-song-title");
    const eventTitleLink = document.createElement("a");
    eventTitleLink.href = i.event_url;
    eventTitleLink.textContent = i.name;
    eventTitleCell.appendChild(eventTitleLink);
    const eventByCell = document.createTextNode(" by ");
    const eventAdminCell = document.createElement("span");
    eventAdminCell.classList.add("ds-table-song-artist");
    eventAdminCell.textContent = i.admin;
    eventNameCell.appendChild(eventDateCell);
    eventNameCell.appendChild(eventTitleCell);
    eventNameCell.appendChild(eventByCell);
    eventNameCell.appendChild(eventAdminCell);
    tr.appendChild(eventNameCell);

    const eventImpreCell = document.createElement("td");
    eventImpreCell.classList.add("ds-table-medal");
    eventImpreCell.classList.add("ds-table-song-imprelist");
    const image = document.createElement("img");
    image.classList.add("ds-table-medal-image");
    image.src = "/clubDS/images/gold.png";
    const image2 = document.createElement("img");
    image2.classList.add("ds-table-medal-image");
    image2.src = "/clubDS/images/silver.png";
    const image3 = document.createElement("img");
    image3.classList.add("ds-table-medal-image");
    image3.src = "/clubDS/images/bronze.png";
    const eventImpreMedal = document.createElement("div");
    const eventImpreCellLink = document.createElement("a");
    eventImpreCellLink.href = i.impre_url;
    eventImpreCellLink.textContent = "View Medal";
    eventImpreMedal.appendChild(image);
    eventImpreMedal.appendChild(image2);
    eventImpreMedal.appendChild(image3);
    eventImpreCell.appendChild(eventImpreMedal);
    eventImpreCell.appendChild(eventImpreCellLink);
    tr.appendChild(eventImpreCell);

    tbody.appendChild(tr);
  });
  document.querySelector(".ds-table").appendChild(tbody);
  document.querySelector(".ds-load").remove();
}

fetchJson();
