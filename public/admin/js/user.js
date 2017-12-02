$(function(){

    var currentPage = 1;
    var pageSize = 5;
    // 分页渲染数据
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
              console.log(data);
              //4. 模板与数据进行绑定
              //第一个参数：模版id
              //第二个参数：对象,模版与对象绑定之后，模版可以直接使用对象中的属性。
              $("tbody").html(template("sql",data));
              
              //渲染分页
              $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3 ,
                currentPage:currentPage,
                totalPages:Math.ceil(data.total / pageSize),
                numberOfpages:5,
                onPageClicked:function(a,b,c,page){
                  //修改当前yema
                  currentPage=page;
                  render();
                }
              })
            }
        })
    }
    render();
    

    $("tbody").on("click",".btn",function(){
      $("#userModal").modal("show");

      var id = $(this).parent().data("id");
      // console.log(id);
      var idDelete = $(this).hasClass("btn-danger")? 0 :1 ;
      console.log(idDelete);
      $(".btn_confirm").off().on("click",function(){
        
        // 发送ajax 禁用用户
        $.ajax({
          type:"post",
          url:"/user/updateUser",
          data:{
            id:id,
            isDelete:idDelete
          },
          success:function(data){
            if(data.success){
              $("#userModal").modal("hide");
              render();
            }
            console.log(data);
          }
        })

      })
    })

})