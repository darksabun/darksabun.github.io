// Difficulty Table
$(document).ready(function() {
    $.getJSON($("meta[name=bmstable]").attr("content"), function(header) {
        mark = header.symbol;
        if (header.last_update != null) $("#update").text("Last Update : " + header.last_update);
        if (header.enum_level_order != null) $.fn.dataTable.enum(header.enum_level_order);
        if (header.changelog_url != null) makeChangelog(header.changelog_url);
        makeBMSTable(header);
    });
});

// Changelog
function makeChangelog(url) {
    $("#changelog").load(url);
    $("#show_log").click(function() {
        if ($("#changelog").css("display") == "none" && $(this).html() == "View Changelog") {
            $("#changelog").show();
            $(this).html("Hide Changelog");
        } else {
            $("#changelog").hide();
            $(this).html("View Changelog");
        }
    });
}

// BMS Table
function makeBMSTable(header) {
    table = $("#table_int").DataTable({
        paging: false,
        info: false,
        lengthChange: false,

        ajax: {
            "url": typeof data_link != "undefined"
                   ? data_link
                   : header.data_url,
            "dataSrc": ""
        },

        columns: typeof tableColumns != "undefined"
                 ? tableColumns
                 : defaultColumns,

        createdRow: function(row, data) {
            if (data.state == 1) {
                $(row).addClass("table-primary");
            }
            if (data.state == 2) {
                $(row).addClass("table-warning");
            }
            if (data.state == 3) {
                $(row).addClass("table-success");
            }
            if (data.state == 4) {
                $(row).addClass("table-secondary");
            }
            if (data.state == 5) {
                $(row).addClass("table-info");
            }
        },

        // Filter by Level
        initComplete: function() {
            this.api().columns(0).every(function() {
                var column = this;
                var select = $("<div class='dataTables_length' style='float:left'>Filter by Level: <select><option value=''>All</option></select></div>")
                    .prependTo($("#table_int_wrapper"))
                    .on("change", function() {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).find("select").val()
                        );

                        column
                            .sort(function(a, b) {
                                return a - b;
                            })
                            .search(val ? "^" + val + "$" : "", true, false)
                            .draw();
                    });

                column.data().unique().each(function(d, j) {
                    select.find("select").append("<option value='" + mark + d + "'>" + d + "</option>")
                });
            });
        }
    });
}

var tableData = {

    tableLevel: function(data, type, row) {
        return mark + data;
    },

    tableTitle: function(data, type, row) {
        return "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" + row.md5 + "' target='_blank'>" + data + "</a>";
    },

    tableScore: function(data, type, row) {
        return "<a href='http://www.ribbit.xyz/bms/score/view?md5=" + data + "' target='_blank'><i class='fas fa-lg fa-music'></i></a>";
    },
    
    tableMovie: function(data, type, row) {
        if (data != "" && data != null) {
            return "<a href='" + data + "' target='_blank'><i class='fas fa-lg fa-play'></i></a>";
        } else {
            return "";
        }
    },

    tableArtist: function(data, type, row) {
        var astr = "";
        if (row.url != "" && row.url != null) {
            if (data != "" && data != null) {
                astr = "<a href='" + row.url + "' target='_blank'>" + data + "</a>";
            } else {
                astr = "<a href='" + row.url + "' target='_blank'>" + row.url + "</a>";
            }
        } else {
            if (data != "" && data != null) {
                astr = data;
            }
        }
        if (row.url_pack != "" && row.url_pack != null) {
            if (row.name_pack != "" && row.name_pack != null) {
                astr += "<br>(<a href='" + row.url_pack + "' target='_blank'>" + row.name_pack + "</a>)";
            } else {
                astr += "<br>(<a href='" + row.url_pack + "' target='_blank'>" + row.url_pack + "</a>)";
            }
        } else {
            if (row.name_pack != "" && row.name_pack != null) {
                astr += "<br>(" + row.name_pack + ")";
            }
        }
        return astr;
    },

    tablePattern: function(data, type, row) {
        if (row.url_diff != "" && row.url_diff != null) {
            if (data != "" && data != null) {
                return "<a href='" + row.url_diff + "' target='_blank'>" + data + "</a>";
            } else {
                return "<a href='" + row.url_diff + "'><i class='fas fa-lg fa-arrow-down'></i></a>";
            }
        } else {
            if (data != "" && data != null) {
                return data;
            } else {
                return "同梱";
            }
        }
    },
    
    tableDate: function(data, type, row) {
        if (data != "" && data != null) {
            var addDate = new Date(data);
            var year = addDate.getFullYear();
            var month = addDate.getMonth() + 1;
            var day = addDate.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            return year + "." + month + "." + day;
        } else {
            return "";
        }
    },
};

var defaultColumns = [
    {
        "title": "Level",
        "width": "1%",
        "data": "level",
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
        "render": tableData.tablePattern
    },
    {
        "title": "Comment",
        "width": "30%",
        "data": "comment"
    },
];