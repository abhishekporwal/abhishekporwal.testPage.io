$(function () {
    if ($("#valideLoginText_Button").length > 0) {


        addClickEventOnKeypress($(".LoginCustomer_InputPassword #password"));
        addClickEventOnKeypress($(".LoginCustomer_InputPassword #passwordtmp"));
        addClickEventOnKeypress($(".LoginCustomer_InputLogin #login"));

    }
});

function addClickEventOnKeypress(inputText) {
    inputText.unbind("keypress");
    inputText.keypress(function (e) {
        var keynum;
        if (window.event)
            keynum = e.keyCode;
        else if (e.which)
            keynum = e.which;

        if (keynum == 13)
            $("#valideLoginText_Button").click();
    });
}
