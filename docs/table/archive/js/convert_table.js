$(function () {
  async function getJSON() {
    const response = await fetch(
      document.querySelector("meta[name=bmstable]").getAttribute("content")
    );
    const header = await response.json();
    document.querySelector("title").textContent = header.name + " - DARKSABUN";
    const bigTableTitle = document.getElementById("bigTableTitle");
    bigTableTitle.textContent = header.name;
    bigTableTitle.href = header.original_url;
    document.getElementById("smallTableTitle").innerHTML =
      "<i class='fas fa-table me-2'></i>" + header.name;
  }
  if (document.querySelector("meta[name=bmstable]")) getJSON();
});

const tableColumns = [
  {
    title: "Level",
    width: "1%",
    data: "level",
    type: "natural",
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
