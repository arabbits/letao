//关闭进度环
NProgress.configure({
    showSpinner: false
  });
  
  $(document).ajaxStart(function () {
    //开始进度条
    NProgress.start();
  });
  
  $(document).ajaxStop(function () {
    //结束进度条
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });





  //二级菜单显示与隐藏效果
  $(".child").prev().on("click",function(){
      $(this).next().slideToggle();
  })
  
//侧边栏显示与隐藏效果
$(".icon-none").on("click",function(){
    $(".lt-main").toggleClass("now");
    $(".lt-aside").toggleClass("now");
})


//模态框
$(".icon-out").on("click",function(){
    $(".modal").modal("show");

    $(".fuckoff").off().on("click",function(){
        //发送ajax请求，告诉服务器，需要退出
        console.log("呵呵");
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function (date) {
                if(date.success){
                    //退出成功 返回到登录页面

                    location.href = "login.html";
                }
            }
        })
    })
})