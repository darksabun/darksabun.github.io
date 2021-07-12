$(document).ready(function() {
    $.getJSON($("meta[name=bmstable]").attr("content"), function(header) {
        $("title").text(header.name + " - DARKSABUN");
        $("#big-c-title").text(header.name);
        $("#big-c-title").attr("href", header.original_url);
        $("#small-c-title").html("<i class='fas fa-table me-1'></i> " + header.name);
    });
});

var tableColumns = [
    {
        "title": "Level",
        "width": "1%",
        "data": "level",
        "type": "natural-nohtml",
        "render": tableData.tableLevel
    },
    {
        "title": "Score",
        "width": "1%",
        "data": "md5",
        "orderable": false,
        "searchable": false,
        "render": tableData.tableScore
    },
    {
        "title": "Title<br>(IR)",
        "width": "30%",
        "data": "title",
        "render": tableData.tableTitle
    },
    {
        "title": "Artist<br>(Song DL)",
        "width": "30%",
        "data": "artist",
        "render": tableData.tableArtist
    },
    {
        "title": "DL",
        "width": "1%",
        "data": "name_diff",
        "orderable": false,
        "searchable": false,
        "render": tableData.tableChart
    },
    {
        "title": "Comment",
        "width": "30%",
        "render": tableData.tableComment
    },
];