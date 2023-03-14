let table = "";
$(function () {
  makeBattleTable();
});

// Battle Ranking Table
function makeBattleTable() {
  table = new DataTable("#table_int", {
    scrollX: true,
    scrollY: "70vh",
    paging: false,
    info: false,
    lengthChange: false,
    order: tableOrder,
    ajax: {
      url: "parseData.json",
      dataSrc: "",
    },
    columns:
      getLanguage.slice(0, 2) === "ko"
        ? KOcolumns
        : getLanguage.slice(0, 2) === "ja"
        ? JAcolumns
        : ENcolumns,
  });

  // Add event listener for opening and closing details
  $("#table_int tbody").on("click", "td.details-control", function () {
    const tr = $(this).closest("tr");
    const row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass("shown");
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass("shown");
    }
  });
}

// Table Data
const tableData = {
  tablePlayer: function (data) {
    return "<a href='javascript:void(0)'>" + data + "</a>";
  },
};

function format(d) {
  // `d` is the original data object for the row
  let lr2PlayerURL =
    "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=mypage&playerid=";
  lr2PlayerURL += d.lr2id;
  return (
    "<table" +
    " class=" +
    "'table" +
    " table-striped" +
    " table-hover" +
    " text-gray-900" +
    " text-start'>" +
    "<tr>" +
    "<td>Nickname : " +
    d.player +
    " (" +
    d.lr2id +
    ")" +
    "</td>" +
    "</tr>" +
    "<tr>" +
    "<td>LR2IR my page :" +
    " <a href='" +
    lr2PlayerURL +
    "' target='_blank'>" +
    "Click <i class='fas fa-mouse-pointer'></i>" +
    "</a>" +
    "</td>" +
    "</tr>" +
    "<tr>" +
    "<td>Total point (All Difficulties) : " +
    d.totalpoint +
    "</td>" +
    "</tr>" +
    "</table>"
  );
}

// for Battle Ranking Table Multi-Language Support
// Table Language Change

function tableLangKO() {
  table.destroy();
  getLanguage = "ko";
  makeBattleTable();
  changeLangKO();
}

function tableLangEN() {
  table.destroy();
  getLanguage = "en";
  makeBattleTable();
  changeLangEN();
}

function tableLangJA() {
  table.destroy();
  getLanguage = "ja";
  makeBattleTable();
  changeLangJA();
}
