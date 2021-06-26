// for Battle Ranking Table Multi-Language Support
if (getLanguage === "ko-KR" || getLanguage === "ko-kr" || getLanguage === "ko") {
    $("#table_int").append("<thead><tr><th rowspan='2'>플레이어</th><th colspan='2' class='table-success'>초급자</th><th colspan='2' class='table-warning'>중급자</th><th colspan='2' class='table-danger'>상급자</th><th rowspan='2'>합계</th></tr><tr><th>연타</th><th>난타</th><th>동시치기</th><th>스크래치</th><th>트릴</th><th>롱놋</th></tr></thead>");
} else if (getLanguage === "ja-JP" || getLanguage === "ja") {
    $("#table_int").append("<thead><tr><th rowspan='2'>プレイヤー</th><th colspan='2' class='table-success'>初級者</th><th colspan='2' class='table-warning'>中級者</th><th colspan='2' class='table-danger'>上級者</th><th rowspan='2'>合計</th></tr><tr><th>連打</th><th>乱打</th><th>同時押し</th><th>皿</th><th>トリル</th><th>LN</th></tr></thead>");
} else {
    $("#table_int").append("<thead><tr><th rowspan='2'>Player</th><th colspan='2' class='table-success'>Beginner</th><th colspan='2' class='table-warning'>Intermediate</th><th colspan='2' class='table-danger'>Expert</th><th rowspan='2'>Total</th></tr><tr><th>Jacks</th><th>Stream</th><th>Chords</th><th>Scratch</th><th>Trill</th><th>LN</th></tr></thead>");
}

// Battle Ranking Table
function makeBattleTable() {
    $("#table_int").DataTable({
        destroy: true,
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

    tablePoint: function(data, type, row) {
        return data;
    },

    tablePlayer: function(data, type, row) {
        return "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=mypage&playerid=" + row.lr2id + "' target='_blank'>" + data + "</a>";
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
        "data": "totalpoint",
        "type": "natural",
        "render": tableData.tablePoint
    },
];
    
makeBattleTable();

// Table Language Change
var $table_responsive = $(".table-responsive");

function tableLangKO() {
    $table_responsive.empty();
    $table_responsive.append("<table id='table_int' class='table table-striped table-bordered table-hover text-gray-900 text-center'><thead><tr><th rowspan='2'>플레이어</th><th colspan='2' class='table-success'>초급자</th><th colspan='2' class='table-warning'>중급자</th><th colspan='2' class='table-danger'>상급자</th><th rowspan='2'>합계</th></tr><tr><th>연타</th><th>난타</th><th>동시치기</th><th>스크래치</th><th>트릴</th><th>롱놋</th></tr></thead></table>");
    makeBattleTable();
    changeLangKO();
}

function tableLangEN() {
    $table_responsive.empty();
    $table_responsive.append("<table id='table_int' class='table table-striped table-bordered table-hover text-gray-900 text-center'><thead><tr><th rowspan='2'>Player</th><th colspan='2' class='table-success'>Beginner</th><th colspan='2' class='table-warning'>Intermediate</th><th colspan='2' class='table-danger'>Expert</th><th rowspan='2'>Total</th></tr><tr><th>Jacks</th><th>Stream</th><th>Chords</th><th>Scratch</th><th>Trill</th><th>LN</th></tr></thead></table>");
    makeBattleTable();
    changeLangEN();
}

function tableLangJP() {
    $table_responsive.empty();
    $table_responsive.append("<table id='table_int' class='table table-striped table-bordered table-hover text-gray-900 text-center'><thead><tr><th rowspan='2'>プレイヤー</th><th colspan='2' class='table-success'>初級者</th><th colspan='2' class='table-warning'>中級者</th><th colspan='2' class='table-danger'>上級者</th><th rowspan='2'>合計</th></tr><tr><th>連打</th><th>乱打</th><th>同時押し</th><th>皿</th><th>トリル</th><th>LN</th></tr></thead></table>");
    makeBattleTable();
    changeLangJP();
}