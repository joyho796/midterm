window.onload = function() {

    for (i = 0; i < donate_items.length; i++)
        document.getElementsByName("quantity")[i].onchange=function(){updateAllTotals()};

    function updateAllTotals()
    {
        orderSummary = "";
        orderSummary = updateSummary(orderSummary);
        $("#summary").html(orderSummary)
        var subtotal, totalAT, totalBT, tax;
        subtotal = totalAT = totalBT = tax = 0;

        for (i = 0; i < donate_items.length; i++)
        {
            costBT = donate_items[i].cost;
            quant = parseInt(document.getElementsByName("quantity")[i].value)
            subtotal = costBT * quant;
            totalBT += subtotal;
        }
        tax = totalBT * 0.0625;
        totalAT = totalBT + tax;

        // Update totals for entire order
        $("#subtotal").html("Sub-total: $" + totalBT.toFixed(2))
        $("#tax").html("Tax(6.25%): $" + tax.toFixed(2))
        $("#total").html("Total: $" + totalAT.toFixed(2))
    }

    function updateSummary(summary)
    {
        summary = "<p>Order Summary:</p>";
        for (i = 0; i < donate_items.length; i++)
        {
            quant = parseInt(document.getElementsByName("quantity")[i].value);
            if(quant != 0){
                number = donate_items[i].cost * quant;
                temp = "<p>"+ quant + " " +donate_items[i].name+" = $"+number+"</p>"
                summary += temp;
            }
        }
        return summary;
    }

    $("#button").click(function(){

        var div = $("#button");
        div.animate({height: '300px', opacity: '0.4'}, "slow");
        div.animate({width: '300px', opacity: '0.8'}, "slow");
        div.animate({height: '50px', opacity: '0.4'}, "slow");
        div.animate({width: '180px', opacity: '0.8'}, "slow");

        var submitAccept = true;
        var errString ="Please correct the following errors:\n"
        var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var ph_regex = /^\d{10}$/;
        var count = 0;
        for (i = 0; i < donate_items.length; i++)
        {
            if(parseInt(document.getElementsByName("quantity")[i].value)==0)
                count++;
        }
        if(count == donate_items.length){
            submitAccept = false;
            errString += "- Please enter a non-zero quantity for atleast one item.\n";
        }

        if(document.getElementById("name").value==""){
            submitAccept = false;
            errString += "- Please enter your name.\n";
        }

        if(document.getElementById("email").value==""){
            submitAccept = false;
            errString += "- Please enter your email ID.\n";
        }
        else if (!(document.getElementById("email").value.match(email_regex))){
            submitAccept = false;
            errString += "- Please enter a valid email ID.\n";
        }

        if(!(document.getElementById("phone").value=="")){
            if(!(document.getElementById("phone").value.match(ph_regex))){
                submitAccept = false;
                errString += "- Please enter a valid phone numnber.\n";
            }
        }

        if(submitAccept == false){
            alert(errString)
        }else{
            order_total = 0;
            orderSummary = "Order Summary:\n";
            for (i = 0; i < donate_items.length; i++)
            {
                quant = parseInt(document.getElementsByName("quantity")[i].value);
                if(quant != 0){
                    number = donate_items[i].cost * quant;
                    order_total += number
                    temp = quant + " " +donate_items[i].name+" = $"+number+"\n"
                    orderSummary += temp;
                }
            }
            order_total = 1.0625 * order_total;
            alert("\nThanks for your donation.\n\n" +
                orderSummary + "\n" +
                "Total Amount: $" + order_total + "\n\n" +
                "We really appreciate your contribution!"
                )
        }
    });
};