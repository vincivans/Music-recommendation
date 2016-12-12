
(function ($) {
    $(document).ready(function(){
        
    let loginStatus = $("#loginbtn");
    let menuBar = $('.large.fixed.menu');
    console.log(menuBar);
    let requestConfig = {
        method: "GET",
        url: "/login/isLoggedIn",
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        let username = responseMessage.user.username;
        let loginBtn = '<a class="ui inverted button" id="loginbtn">Log in</a>';
        let alreadyIn = "<span>Welcome, "+ username + "</span></div>";
        let logoutBtn = '<div class="right item"><a href="/signout" class="ui inverted button">Log out</a></div>';
        if(responseMessage.user){
            loginStatus.html(alreadyIn);
            menuBar.append(logoutBtn);
        }else{
            loginStatus.html(loginBtn);
        }
    })
    });
})(jQuery);