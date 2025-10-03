let table = "";
function contentLoadedEvent() {
  makeBattleTable();
}
function rowClickEvent(event) {
  const target = event.target;
  if (target && target.classList.contains("details-control")) {
    const tr = target.closest("tr");
    const row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.classList.remove("shown");
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.classList.add("shown");
    }
  }
}
document.addEventListener("DOMContentLoaded", contentLoadedEvent);

// Battle Ranking Table
function makeBattleTable() {
  table = new DataTable("#tableDiff", {
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
      nowLang === "ko" ? KOcolumns : nowLang === "ja" ? JAcolumns : ENcolumns,
  });

  // Add event listener for opening and closing details
  document
    .querySelector("#tableDiff tbody")
    .addEventListener("click", rowClickEvent);
}

// Table Data
const tableData = {
  tablePlayer: function (data) {
    return (
      "<a class='details-control' href='javascript:void(0)'>" + data + "</a>"
    );
  },
};

function format(d) {
  // `d` is the original data object for the row
  let lr2PlayerURL =
    "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=mypage&playerid=";
  lr2PlayerURL += d.lr2id;
  return `
        <table class="table table-striped table-hover text-gray-900 text-start">
            <tr>
              <td>Nickname : ${d.player} (${d.lr2id})</td>
            </tr>
            <tr>
              <td>LR2IR my page : <a href='${lr2PlayerURL}' target='_blank'>Click<i class='fas fa-mouse-pointer ms-2'></i></a></td>
            </tr>
            <tr>
              <td>Total point (All Difficulties) : ${d.totalpoint}</td>
            </tr>
        </table>`;
}

// for Battle Ranking Table Multi-Language Support
// Table Language Change
function tableLanguageChange(lang) {
  document.querySelector("#tableDiff tbody").removeEventListener("click", rowClickEvent);
  table.destroy();
  nowLang = lang;
  makeBattleTable();
  changeLanguage(lang);
}
