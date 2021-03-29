async function fetchJson() {
  const result = await fetch("https://script.google.com/macros/s/AKfycbwtPeSvNExqbCCNmUZF2qbpFEYWAd22qzJdThEH_R6lNw-XOtNBXQcoUhnyRjVYmEk/exec?table=clubdslist");
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

    const eventNameCell = document.createElement("td");
    eventNameCell.classList.add("ds-table-song");
    const eventDateCell = document.createElement("div");
    eventDateCell.classList.add("ds-table-song-genre");
    eventDateCell.textContent = i.date;
    const eventTitleCell = document.createElement("span");
    eventTitleCell.classList.add("ds-table-song-title");
    const eventTitleLink = document.createElement("a");
    eventTitleLink.href = i.link;
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
    tbody.appendChild(tr);
  });
  document.querySelector(".ds-table").appendChild(tbody);
  document.querySelector(".ds-load").remove();
}

fetchJson();
