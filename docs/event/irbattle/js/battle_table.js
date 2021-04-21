function makeBattleTable() {
    $("#table_int").DataTable({
        paging: false,
        info: false,
        lengthChange: false,
        order: [7, "desc"],
        ajax: {
            "url": "https://parksulab.xyz:6003/parseData.json",
            "dataSrc": ""
        },
        columns: tableColumns,
    });
}
// Table Data
var tableData = {

    // Level (IR)
    tablePoint: function(data, type, row) {
        return data;
    },

    tablePlayer: function(data, type, row) {
        return "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=mypage&playerid=" + row.lr2id + "' target='_blank'>" + data + "</a>";
    },

    tableTotalPoint: function(data, type, row) {
        return parseInt(row.point01) + parseInt(row.point02) + parseInt(row.point03) + parseInt(row.point04) + parseInt(row.point05) + parseInt(row.point06);
    },
};

var tableColumns = [
    {
        "data": "player",
        "render": tableData.tablePlayer
    },
    {
        "data": "point01",
        "type": "natural",
        "className": "table-success",
        "render": tableData.tablePoint
    },
    {
        "data": "point02",
        "type": "natural",
        "className": "table-success",
        "render": tableData.tablePoint
    },
    {
        "data": "point03",
        "type": "natural",
        "className": "table-warning",
        "render": tableData.tablePoint
    },
    {
        "data": "point04",
        "type": "natural",
        "className": "table-warning",
        "render": tableData.tablePoint
    },
    {
        "data": "point05",
        "type": "natural",
        "className": "table-danger",
        "render": tableData.tablePoint
    },
    {
        "data": "point06",
        "type": "natural",
        "className": "table-danger",
        "render": tableData.tablePoint
    },
    {
        "type": "natural",
        "render": tableData.tableTotalPoint
    },
];
    
makeBattleTable();