$(function () {
  $.getJSON($("meta[name=bmstable]").attr("content"), function (header) {
    $("title").text(header.name + " - DARKSABUN");
    $("#big-c-title").text(header.name).attr("href", header.original_url);
    $("#small-c-title").html(
      "<i class='fas fa-table me-1'></i> " + header.name
    );
  });
});

const tableColumns = [
  {
    title: "Level",
    width: "1%",
    data: "level",
    type: "natural",
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
