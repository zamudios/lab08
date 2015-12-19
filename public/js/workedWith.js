$.ajax({
        method: "GET",
        url: "/workedWith",
    })
    .done(function(workedWith) {
        var htmlString = "";

        for(var i = 0; i < workedWith.length; i++){
            htmlString += '<input type="checkbox" name="selectedOptions" value="' +
                workedWith[i].companyId +'">' +
                '&nbsp;' + workedWith[i].companyName +
                '<br />';

            //htmlString += '<option value="' +
            //    foundByOptions[i].foundby_id + '">' +
            //    foundByOptions[i].name + '</option>';
        }

        $('#workedWith').html(htmlString);
    });