// Difficulty Table List
$(function () {
  $.fn.dataTable.enum(["SP", "DP", "PMS", "EVENT", "etc"]);
  $.fn.dataTable.enum([
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
  let table = $("#table_int").DataTable({
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
          return "<a href='" + row.url + "'>" + data + "</a>";
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
      if (data.state == 1) $(row).addClass("table-primary");
      if (data.state == 2) $(row).addClass("table-warning");
      if (data.state == 3) $(row).addClass("table-success");
      if (data.state == 4) $(row).addClass("table-secondary");
      if (data.state == 5) $(row).addClass("table-info");
    },

    initComplete: function () {
      makeLastUpdate(table);
      let filterStr =
        "<div class='mt-2 float-start'>" +
        "<i class='fas fa-table me-1'></i> Filter by Tag: " +
        "<select>" +
        "<option value=''>All</option>" +
        "</select>" +
        "</div>";
      let whereAppend = $(".card-header");
      makeFilter(table, 3, filterStr, whereAppend);
      filterStr =
        "<div class='float-none'>" +
        "<i class='fas fa-table me-1'></i> Filter by Type: " +
        "<select>" +
        "<option value=''>All</option>" +
        "</select>" +
        "</div>";
      makeFilter(table, 2, filterStr, whereAppend);
    },
  });
}

function makeLastUpdate(table) {
  // Add Last Update
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
        ("0" + (date_.getMonth() + 1)).slice(-2) +
        "." +
        ("0" + date_.getDate()).slice(-2);
      return dateStr;
    });
  $("#update").text("Last Update : " + lastUpdateTableDate);
}

function makeFilter(table, x, filterStr, whereAppend) {
  table.columns(x).every(function () {
    const column = this;
    let select = $(filterStr)
      .prependTo(whereAppend)
      .on("change", function () {
        const val = $.fn.dataTable.util.escapeRegex(
          $(this).find("select").val()
        );
        column.search(val ? "^" + val + "$" : "", true, false).draw();
      });

    column
      .data()
      .unique()
      .sort(function (a, b) {
        return parseInt(a) - parseInt(b);
      })
      .each(function (d, j) {
        select
          .find("select")
          .append("<option value='" + d + "'>" + d + "</option>");
      });
  });
}