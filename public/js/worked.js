$.ajax({
        method: "GET",
        url: "/workedFor",
    })
    .done(function(workedFor) {
        var htmlString = "";

        for(var i = 0; i < workedFor.length; i++){
            htmlString += '<input type="checkbox" name="selectedOptions" value="' +
                workedFor[i].schoolId +'">' +
                '&nbsp;' + workedFor[i].schoolName +
                '<br />';

            //htmlString += '<option value="' +
            //    foundByOptions[i].foundby_id + '">' +
            //    foundByOptions[i].name + '</option>';
        }

        $('#workedFor').html(htmlString);
    });