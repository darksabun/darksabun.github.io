// Difficulty Table
let mark = "",
  data_link = "",
  makeBMSLevelFilter = 1;
$(function () {
  $.getJSON($("meta[name=bmstable]").attr("content"), function (header) {
    mark = header.symbol;
    if (header.data_url) data_link = header.data_url;
    if (header.last_update)
      $("#update").text("Last Update : " + header.last_update);
    if (header.enum_level_order) DataTable.enum(header.enum_level_order);
    if (typeof makeChangelog === "undefined")
      if (header.changelog_url) $("#changelog").load(header.changelog_url);
    makeBMSTable();
  });
});

// BMS Table
function makeBMSTable() {
  new DataTable("#table_int", {
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
      if (data.state == 1) $(row).addClass("bg-primary-subtle");
      if (data.state == 2) $(row).addClass("bg-warning-subtle");
      if (data.state == 3) $(row).addClass("bg-success-subtle");
      if (data.state == 4) $(row).addClass("bg-secondary-subtle");
      if (data.state == 5) $(row).addClass("bg-info-subtle");
    },

    // Filter by Level
    initComplete: function () {
      // Make Changelog
      if (typeof makeChangelog !== "undefined") makeChangelog();
      if (typeof makeLastUpdate !== "undefined") makeLastUpdate();
      if (makeBMSLevelFilter === 1) {
        // Filter
        this.api()
          .columns(0)
          .every(function () {
            const column = this;
            let select = $(
              "<div class='dt-length'>" +
                "Filter by Level: " +
                "<select class='form-select form-select-sm'>" +
                "<option value=''>All</option>" +
                "</select>" +
                "</div>"
            )
              .prependTo($("#table_int_wrapper > div:nth-child(1) > .me-auto"))
              .on("change", function () {
                const val = DataTable.util.escapeRegex(
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
                  .append(
                    "<option value='" + mark + d + "'>" + d + "</option>"
                  );
              });
          });
      } else if (typeof makeCustomFilter != "undefined") {
        makeCustomFilter();
      }
    },
  });
}

const tableData = {
  tableLevel: function (data) {
    return mark + data;
  },

  tableTitle: function (data, type, row) {
    let lr2irBaseURL =
      "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=";
    lr2irBaseURL += row.md5;
    return "<a href='" + lr2irBaseURL + "' target='_blank'>" + data + "</a>";
  },

  tableScore: function (data) {
    let scoreBaseURL = "http://www.ribbit.xyz/bms/score/view?md5=";
    scoreBaseURL += data;
    return (
      "<a href='" +
      scoreBaseURL +
      "' target='_blank'><i class='fas fa-lg fa-music'></i></a>"
    );
  },

  tableMovie: function (data) {
    let movieURL = "https://www.youtube.com/watch?v=";
    movieURL += data.slice(-11);
    if (data) {
      return (
        "<a href='" +
        movieURL +
        "' target='_blank'>" +
        "<i class='fas fa-lg fa-play'></i>" +
        "</a>"
      );
    } else {
      return "";
    }
  },

  tableArtist: function (data, type, row) {
    let artistStr = "";
    if (row.url) {
      if (data) {
        artistStr =
          "<a href='" + row.url + "' target='_blank'>" + data + "</a>";
      } else {
        artistStr =
          "<a href='" + row.url + "' target='_blank'>" + row.url + "</a>";
      }
    } else {
      if (data) {
        artistStr = data;
      }
    }
    if (row.url_pack) {
      if (row.name_pack) {
        artistStr +=
          "<br>(<a href='" +
          row.url_pack +
          "' target='_blank'>" +
          row.name_pack +
          "</a>)";
      } else {
        artistStr +=
          "<br>(<a href='" +
          row.url_pack +
          "' target='_blank'>" +
          row.url_pack +
          "</a>)";
      }
    } else {
      if (row.name_pack) {
        artistStr += "<br>(" + row.name_pack + ")";
      }
    }
    return artistStr;
  },

  tableChart: function (data, type, row) {
    if (row.maker_site) {
      if (row.url_diff) {
        return (
          "<a href='" +
          row.url_diff +
          "'>" +
          "<i class='fas fa-lg fa-arrow-down'></i>" +
          "</a><br>(<a href='" +
          row.maker_site +
          "'>" +
          data +
          "</a>)"
        );
      } else {
        return "同梱<br>(<a href='" + row.maker_site + "'>" + data + "</a>)";
      }
    } else {
      if (row.url_diff) {
        if (data) {
          return (
            "<a href='" + row.url_diff + "' target='_blank'>" + data + "</a>"
          );
        } else {
          return (
            "<a href='" +
            row.url_diff +
            "'>" +
            "<i class='fas fa-lg fa-arrow-down'></i>" +
            "</a>"
          );
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
      const date_ = new Date(data);
      const dateString =
        date_.getFullYear() +
        "." +
        ("0" + (date_.getMonth() + 1)).slice(-2) +
        "." +
        ("0" + date_.getDate()).slice(-2);
      return dateString;
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
    width: "5%",
    data: "level",
    render: tableData.tableLevel,
  },
  /*
  {
    title: "Score",
    width: "1%",
    data: "md5",
    orderable: false,
    searchable: false,
    render: tableData.tableScore,
  },
  */
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
