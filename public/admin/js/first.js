$(function(){
    
    var currentPage = 1 ;
    var pageSize = 5 ;

    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                $("tbody").html(template("sql",data))

                //分页渲染
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / data.size),
                    onPageClicked: function (a, b, c, p) {
                      currentPage = p;
                      render();
                    }
                  });
            }
        })
    }
    render();

    $(".lt_content button").on("click",function(){
        $("#first-modal").modal("show");
    })
      //表单校验

      var $form = $("form");
      $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验规则
        fields: {
          categoryName: {
    
            validators: {
              notEmpty: {
                message: "一级分类的名称不能为空"
              }
            }
    
          }
        }
      });
    //注册校验成功事件，阻止默认行为，使用ajax提交
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    // con
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          //关闭模态框
          $("#first-modal").modal("hide");
          page=1;
          render();

          //清空表单中值和样式
          $form.data("bootstrapValidator").resetForm();
          // 重置表单中的value
          $form[0].reset();

        }
      }
    });
  });

})