function animate(div) {
    div.animate({height: '100px'}, 1000);
    setTimeout(function() {
        div.val("gathering your mystery boxes...");
    },10);
    div.animate({width: '80%'}, 3000);
    div.animate({height: '50px'}, "slow");
    div.animate({width: '200px'}, "slow");
    setTimeout(function() {
        div.val("Order Complete");
    },5100);
    setTimeout(function() {
        div.val("Confirm Order");
    },6000);

}

function DonateItem(name, cost)
        {
            this.name = name;
            this.cost = cost;
        }

        donate_items = new Array(
            new DonateItem("Meal Box", 7),
            new DonateItem("Toy", 5),
            new DonateItem("Care Coupon", 11),
            new DonateItem("Merch Item", 15),
        );

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
                temp = "<p>"+ quant + " " +donate_items[i].name;
                if(quant>1){
                    temp +="s";
                }
                temp +=" = $"+number+"</p>"
                summary += temp;
            }
        }
        return summary;
    }

    $("#button").click(function()
    {
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
            errString += "    - You must order at least one item\n";
        }

        if(document.getElementById("name").value==""){
            submitAccept = false;
            errString += "    - Name cannot be blank\n";
        }

        if(document.getElementById("email").value==""){
            submitAccept = false;
            errString += "    - Email cannot be blank\n";
        }
        if(document.getElementById("recip").value==""){
            submitAccept = false;
            errString += "    - Please indicate who or what kind of pet the recipient is\n";
        }
        else if (!(document.getElementById("email").value.match(email_regex))){
            submitAccept = false;
            errString += "    - Email must be valid\n";
        }

        if(!(document.getElementById("phone").value=="")){
            if(!(document.getElementById("phone").value.match(ph_regex))){
                submitAccept = false;
                errString += "    - Phone number must be valid\n";
            }
        }

        if(submitAccept == false){
            alert(errString)
        } else{
            animate($("#button"));
            order_total = 0;
            orderSummary = "Order Summary:\n";
            for (i = 0; i < donate_items.length; i++)
            {
                quant = parseInt(document.getElementsByName("quantity")[i].value);
                if(quant != 0){
                    number = donate_items[i].cost * quant;
                    order_total += number
                    temp = quant + " " +donate_items[i].name
                    if(quant>1){
                        temp += "s";
                    }
                    temp += " = $"+number+"\n"
                    orderSummary += temp;
                }
            }
            order_total = 1.0625 * order_total;
            setTimeout(function() {
                alert("\nThanks you for your order.\n\n" +
                orderSummary + "\n" +
                "Total Amount: $" + order_total.toFixed(2) + "\n\n" +
                "We will email you with more information about payment details. We, and our animals, appreciate your support!"
                );
            },5500);

        }

    });
};