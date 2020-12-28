$(document).ready(function() {
    $.getJSON($("meta[name=customtable]").attr("content"), function(header) {
        $("#update").text("Last Update : " + header.last_update);
        $.fn.dataTable.enum(header.enum_tag1_order);
        $.fn.dataTable.enum(header.enum_tag2_order);
        makeTablelist(header);
    });
    new ClipboardJS("#urlbtn");
});

function makeTablelist(header) {
    $("#table_int").DataTable({
        autoWidth: false,
        paging: true,
        order: [
            [2, "asc"],
            [3, "asc"],
            [1, "asc"]
        ],
        info: false,
        lengthChange: false,
        pageLength: 50,
        ajax: {
            "url": header.data_url,
            "dataSrc": ""
        },
        columns: [{
            "title": "Symbol",
            "width": "1%",
            "data": "symbol",
            "orderable": false
        }, {
            "title": "Name",
            "width": "5%",
            "data": "name",
            "render": function(data, type, row) {
                return "<a href='" + row.url + "'>" + data + "</a>";
            },
        }, {
            "title": "Type",
            "width": "1%",
            "data": "tag1"
        }, {
            "title": "Tag",
            "width": "5%",
            "data": "tag2"
        }, {
            "title": "Comment",
            "width": "5%",
            "data": "comment"
        }, ],
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
        initComplete: function() {
            this.api().columns(3).every(function() {
                var column = this;
                var select = $("<div class='dataTables_length' style='float:left'><i class='fas fa-table mr-1'></i> Filter by Tag: <select><option value=''>All</option></select></div>").prependTo($(".card-header")).on("change", function() {
                    var val = $.fn.dataTable.util.escapeRegex($(this).find("select").val());
                    column.search(val ? "^" + val + "$" : "", !0, false).draw();
                });
                column.data().unique().sort(function(a, b) {
                    return parseInt(a) - parseInt(b);
                }).each(function(d, j) {
                    select.find("select").append("<option value='" + d + "'>" + d + "</option>");
                })
            })
        }
    })
}