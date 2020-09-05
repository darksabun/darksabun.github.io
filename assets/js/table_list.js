$(document).ready(function() {
    $.getJSON($("meta[name=customtable]").attr("content"), function(header) {
        $("#update").text("Last Update : " + header.last_update);
        $.fn.dataTable.enum(header.enum_tag1_order);
        $.fn.dataTable.enum(header.enum_tag2_order);
        makeTablelist(header);
    })
    new ClipboardJS('#urlbtn')
});

function makeTablelist(header) {
    table = $("#table_int").DataTable({
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
                return "<a href='" + row.url + "'>" + data + "</a>"
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
        
        initComplete: function() {
            this.api().columns(3).every(function() {
                var column = this;
                var select = $("<div class='dataTables_length'>Filter by Tag: <select class='filter-level'><option value=''>All</option></select></div>").prependTo($("#table_int_wrapper")).on("change", function() {
                    var val = $.fn.dataTable.util.escapeRegex($(this).find("select").val());
                    column.sort(function(a, b) {
                        return a - b
                    }).search(val ? "^" + val + "$" : "", true, false).draw()
                });
                column.data().unique().each(function(d, j) {
                    select.find("select").append("<option value='" + d + "'>" + d + "</option>")
                })
            })
        }
    })
}