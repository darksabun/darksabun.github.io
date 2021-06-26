function makeEventTableList() {
    $("#table_int").DataTable({
        searching: false,
        autoWidth: false,
        paging: true,
        order: [
            [0, "desc"]
        ],
        info: false,
        lengthChange: false,
        pageLength: 5,
        ajax: {
            "url": "https://script.google.com/macros/s/AKfycbzaQbcI9UZDcDlSHHl2NHilhmePrNrwxRdOFkmIXsfnbfksKKmAB3V65WZ8jPWU-7E/exec?table=eventlist",
            "dataSrc": ""
        },
        columns: [{
            "title": "No.",
            "width": "1%",
            "data": "no",
            "type": "natural"
        }, {
            "title": "Name",
            "data": "name",
            "render": function(data, type, row) {
                return "<a href='" + row.link + "'>" + data + "</a>"
            },
        }, {
            "title": "Start",
            "data": "start_date",
            "render": function(data, type, row) {
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
        }, {
            "title": "End",
            "data": "end_date",
            "render": function(data, type, row) {
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
        }],
        createdRow: function(row, data) {
            if (data.state == 1) {
                $(row).addClass("table-primary")
            }
            if (data.state == 2) {
                $(row).addClass("table-warning")
            }
            if (data.state == 3) {
                $(row).addClass("table-success")
            }
            if (data.state == 4) {
                $(row).addClass("table-secondary")
            }
            if (data.state == 5) {
                $(row).addClass("table-info")
            }
        },
    })
};

makeEventTableList();