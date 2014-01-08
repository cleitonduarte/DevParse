var parseID="L5dhI4lAjmm4Uaxuc5At8g4WdMAfr7Jt4bLKpNwx";
var parseKey="Z3llTHOmjYoIwKP1TmQ0OljrAZzxkU2RrDR3yL8B";

$(document).ready(function(){
        getMessages();
        $("#send").click(function(){
                var username = $("input[name=username]").val();
                var message = $("input[name=message]").val();
                console.log(message);
                console.log("!");
                $.ajax({
                        url: "https://api.parse.com/1/classes/MessageBoard",
                        headers: {
                                "X-Parse-Application-Id": parseID,
                                "X-Parse-REST-API-Key": parseKey
                        },
                        contentType: "application/json",
                        dataType: "json",
                        processData: false,
                        data: JSON.stringify({
                                "username": username,
                                "message": message
                        }),
                        type: 'POST',
                        success: function() {
                                console.log("sent");
                                getMessages();
                        },
                        error: function() {
                                console.log("error");
                        }
                });

        });
})
function getMessages() {
        $.ajax({
                url: "https://api.parse.com/1/classes/MessageBoard",
                headers: {
                        "X-Parse-Application-Id": parseID,
                        "X-Parse-REST-API-Key": parseKey
                },
                contentType: "application/json",
                dataType: "json",
                type: 'GET',
                success: function(data) {
                        console.log("get");
                        updateView(data);
                },
                error: function() {
                        console.log("error");
                }
        });
}
function updateView(messages){
	var table=$(".table tbody");
	table.html('');	
	$.each(messages.results, function (index, value) {
		var trEl=$('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>'); 

		table.append(trEl);			
	});
	console.log(messages);
}