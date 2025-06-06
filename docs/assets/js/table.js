// Difficulty Table
let mark = "";
let data_link = "";
let makeBMSLevelFilter = 1;
document.addEventListener("DOMContentLoaded", function () {
  async function getJSON() {
    const response = await fetch(
      document.querySelector("meta[name=bmstable]").getAttribute("content")
    );
    const header = await response.json();
    if (header.symbol) mark = header.symbol;
    if (header.last_update)
      document.getElementById("update").textContent =
        "Last Update : " + header.last_update;
    if (header.enum_level_order) DataTable.enum(header.enum_level_order);
    if (header.data_url) data_link = header.data_url;
    makeBMSTable();
  }
  if (document.querySelector("meta[name=bmstable]")) getJSON();
});

function makeBMSTable() {
  new DataTable("#tableDiff", {
    autoWidth: typeof customAutoWidth === "undefined" ? true : customAutoWidth,
    paging: typeof customPaging === "undefined" ? false : customPaging,
    pageLength:
      typeof customPageLength === "undefined" ? false : customPageLength,
    order: typeof customOrder === "undefined" ? [[0, "asc"]] : customOrder,
    searching: typeof customSearching === "undefined" ? true : customSearching,
    info: typeof customInfo === "undefined" ? false : customInfo,
    lengthChange:
      typeof customLengthChange === "undefined" ? false : customLengthChange,

    ajax: {
      url: data_link,
      dataSrc: "",
    },

    columns:
      typeof tableColumns === "undefined" ? defaultColumns : tableColumns,

    createdRow: function (row, data) {
      const rowColor = {
        1: "bg-primary-subtle",
        2: "bg-warning-subtle",
        3: "bg-success-subtle",
        4: "bg-secondary-subtle",
        5: "bg-info-subtle",
        6: "bg-danger-subtle",
        7: "bg-light-subtle",
        8: "bg-dark-subtle",
      };
      if (data.state) row.classList.add(rowColor[data.state]);
    },

    // Filter by Level
    initComplete: function () {
      // Make Changelog
      if (typeof makeChangelog !== "undefined") makeChangelog();
      if (typeof makeLastUpdate !== "undefined") makeLastUpdate();
      if (makeBMSLevelFilter === 1) {
        // Filter
        const column = this.api().column(0);
        const filterText = "Filter by Level: ";
        const selectContainer = document.createElement("div");
        selectContainer.classList.add("dt-length");

        const select = document.createElement("select");
        select.id = "tableDiffSelect";
        select.classList.add("form-select", "form-select-sm");
        select.add(new Option("All", ""));

        select.addEventListener("change", function () {
          const val = DataTable.util.escapeRegex(this.value);
          column.search(val ? "^" + val + "$" : "", true, false).draw();
        });

        selectContainer.appendChild(document.createTextNode(filterText));
        selectContainer.appendChild(select);

        document
          .querySelector("#tableDiff_wrapper > div:nth-child(1) > .me-auto")
          .prepend(selectContainer);

        column
          .data()
          .unique()
          .sort(function (a, b) {
            return parseInt(a) - parseInt(b);
          })
          .each(function (d, j) {
            const option = document.createElement("option");
            option.value = mark + d;
            option.textContent = d;
            select.appendChild(option);
          });
      } else if (typeof makeCustomFilter != "undefined") {
        makeCustomFilter();
      }
    },
  });
}

// Date Format
function formatDateString(dateStr) {
  const date_ = new Date(dateStr);
  const year = date_.getFullYear();
  const month = String(date_.getMonth() + 1).padStart(2, "0");
  const day = String(date_.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

const tableData = {
  tableLevel: function (data) {
    return `${mark}${data}`;
  },

  tableTitle: function (data, type, row) {
    const lr2irBaseURL = `http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${row.md5}`;
    return `<a href="${lr2irBaseURL}" target="_blank">${data}</a>`;
  },

  tableScore: function (data) {
    const scoreBaseURL = `https://bms-score-viewer.pages.dev/view?md5=${data}`;
    return `<a href="${scoreBaseURL}" target="_blank"><i class="fas fa-lg fa-music"></i></a>`;
  },

  tableMovie: function (data) {
    const movieURL = `https://www.youtube.com/watch?v=${data.slice(-11)}`;
    if (data) {
      return `<a href="${movieURL}" target="_blank"><i class="fas fa-lg fa-play"></i></a>`;
    } else {
      return "";
    }
  },

  tableArtist: function (data, type, row) {
    let artistStr = "";
    if (row.url) {
      if (data) {
        artistStr = `<a href="${row.url}" target="_blank">${data}</a>`;
      } else {
        artistStr = `<a href="${row.url}" target="_blank">${row.url}</a>`;
      }
    } else {
      if (data) {
        artistStr = data;
      }
    }
    if (row.url_pack) {
      if (row.name_pack) {
        artistStr += `<br>(<a href="${row.url_pack}" target="_blank">${row.name_pack}</a>)`;
      } else {
        artistStr += `<br>(<a href="${row.url_pack}" target="_blank">${row.url_pack}</a>)`;
      }
    } else {
      if (row.name_pack) {
        artistStr += `<br>(${row.name_pack})`;
      }
    }
    return artistStr;
  },

  tableChart: function (data, type, row) {
    if (row.maker_site) {
      if (row.url_diff) {
        return `<a href="${row.url_diff}"><i class="fas fa-lg fa-arrow-down"></i></a><br>(<a href="${row.maker_site}">${data}</a>)`;
      } else {
        return `同梱<br>(<a href="${row.maker_site}">${data}</a>)`;
      }
    } else {
      if (row.url_diff) {
        if (data) {
          return `<a href="${row.url_diff}" target="_blank">${data}</a>`;
        } else {
          return `<a href="${row.url_diff}"><i class="fas fa-lg fa-arrow-down"></i></a>`;
        }
      } else {
        if (data) {
          return data;
        } else {
          return "同梱";
        }
      }
    }
  },

  tableDate: function (data) {
    if (data) {
      return formatDateString(data);
    } else {
      return "";
    }
  },

  tableComment: function (data, type, row) {
    return row.comment || "";
  },
};

const defaultColumns = [
  {
    title: "Level",
    width: "5.75%",
    data: "level",
    render: tableData.tableLevel,
  },
  {
    title: "Score",
    width: "1%",
    data: "md5",
    orderable: false,
    searchable: false,
    render: tableData.tableScore,
  },
  {
    title: "Title<br>(LR2IR)",
    width: "30%",
    data: "title",
    render: tableData.tableTitle,
  },
  {
    title: "Artist<br>(BMS DL)",
    width: "30%",
    data: "artist",
    render: tableData.tableArtist,
  },
  {
    title: "DL",
    width: "1%",
    data: "name_diff",
    className: "text-nowrap",
    orderable: false,
    render: tableData.tableChart,
  },
  {
    title: "Comment",
    width: "30%",
    render: tableData.tableComment,
  },
];
