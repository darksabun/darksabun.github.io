// Difficulty Table List
$(function () {
  DataTable.enum(["SP", "DP", "PMS", "EVENT", "etc"]);
  DataTable.enum([
    "General",
    "Personal",
    "Self-made Chart Only",
    "BMS Event",
    "Chart Event",
    "Uploader",
  ]);
  makeTablelist();
});

const urlbtn = document.getElementById("urlbtn");
const clipboard = new ClipboardJS(urlbtn);

clipboard.on("success", function () {
  urlbtn.textContent = "Success!";
  setTimeout(function () {
    urlbtn.textContent = "Copy URL";
  }, 3000);
});

clipboard.on("error", function () {
  alert("URL Copy Error!");
});

function makeTablelist() {
  let table = new DataTable("#table_int", {
    autoWidth: false,
    paging: true,
    order: [
      [2, "asc"],
      [3, "asc"],
      [1, "asc"],
    ],
    info: true,
    lengthChange: false,
    pageLength: 50,
    ajax: {
      url: "https://script.google.com/macros/s/AKfycbzaQbcI9UZDcDlSHHl2NHilhmePrNrwxRdOFkmIXsfnbfksKKmAB3V65WZ8jPWU-7E/exec?table=tablelist",
      dataSrc: "",
    },
    columns: [
      {
        title: "Symbol",
        width: "1%",
        data: "symbol",
        orderable: false,
      },
      {
        title: "Name",
        width: "5%",
        data: "name",
        render: function (data, type, row) {
          return `<a href="${row.url}">${data}</a>`;
        },
      },
      {
        title: "Type",
        width: "1%",
        data: "tag1",
      },
      {
        title: "Tag",
        width: "5%",
        data: "tag2",
      },
      {
        title: "Comment",
        width: "5%",
        data: "comment",
      },
    ],
    createdRow: function (row, data) {
      const rowColor = {
        1: "bg-primary-subtle",
        2: "bg-warning-subtle",
        3: "bg-success-subtle",
        4: "bg-secondary-subtle",
        5: "bg-info-subtle",
      };
      if (data.state) row.classList.add(rowColor[data.state]);
    },
    initComplete: function () {
      makeLastUpdate(table);
      makeFilter(table);
    },
  });
}

function makeLastUpdate(table) {
  const data = table.ajax.json();
  const lastUpdateTableDate = data
    .filter(function (diffTable) {
      return !!diffTable.date;
    })
    .sort(function (a, b) {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
    })
    .slice(0, 1)
    .map(function (diffTable) {
      const date_ = new Date(diffTable.date);
      const dateStr =
        date_.getFullYear() +
        "." +
        String(date_.getMonth() + 1).padStart(2, "0") +
        "." +
        String(date_.getDate()).padStart(2, "0");
      return dateStr;
    });
  document.getElementById("update").textContent =
    "Last Update : " + lastUpdateTableDate;
}

function makeFilter(table) {
  const smallTableTitle = document.getElementById("smallTableTitle");
  smallTableTitle.innerHTML = "";
  [3, 2].forEach(function (index) {
    const column = table.column(index);
    const filterText =
      index === 3
        ? `<i class="fas fa-table me-2"></i>Filter by Tag: `
        : `<i class="fas fa-table me-2"></i>Filter by Type: `;
    const selectContainer = document.createElement("div");
    index === 3
      ? selectContainer.classList.add("mt-2", "float-start")
      : selectContainer.classList.add("float-none");

    const select = document.createElement("select");
    select.add(new Option("All", ""));

    select.addEventListener("change", function () {
      const val = DataTable.util.escapeRegex(this.value);
      column.search(val ? "^" + val + "$" : "", true, false).draw();
    });

    selectContainer.innerHTML = filterText;
    selectContainer.appendChild(select);

    smallTableTitle.prepend(selectContainer);

    column
      .data()
      .unique()
      .sort(function (a, b) {
        return parseInt(a) - parseInt(b);
      })
      .each(function (d, j) {
        const option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        select.appendChild(option);
      });
  });
}
