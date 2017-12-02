$(function(){

    var page = 1;
    var pageSize = 4;
    var render = function(){
      $.ajax({
          type:"get",
          url:"/category/querySecondCategoryPaging",
          data:{
              page:page,
              pageSize:pageSize
          },
          success:function(data){
            // console.log(data);
            $("tbody").html( template("sql",data) );
            //分页
            $("#paginator").bootstrapPaginator({
              bootstrapMajorVersion: 3,
              currentPage:page,
              totalPages:Math.ceil(data.total/data.size),
              onPageClicked: function (a, b, c, p) {
                page = p;
                render();
              }
            });
          }
      });
    }
    render();
    //先下拉菜单
    $(".btn_add").on("click",function(){
      $("#secend-modal").modal("show");

      // 将数据渲染到表单
      $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
          page:1,
          pageSize:1000
        },
        success:function(data){
          $(".dropdown-menu").html(template("sql2",data));
        }
      })

    });

     //5. 给dropdown-menu下a注册委托事件
     $(".dropdown-menu").on("click","a",function(){
      //5.1 获取当前a的内容，设置给dropdown-text
      $(".dropdown-text").text($(this).text());
      //5.2 获取到当前a的id，设置给 categoryId
      
      $("[name=categoryId]").val($(this).data("id"));
      //5.3 手动让categoryId校验成功
      $form.data("bootstrapValidator").updateStatus("categoryId","VALID");

     })

  //6. 文件上传功能
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      //结果就是data.result
      //console.log(data.result);
      //6.1 修改img_box下的img的src属性
      $(".img_box img").attr("src", data.result.picAddr);

      //6.2 把图片的地址赋值给brandLogo
      $("[name='brandLogo']").val(data.result.picAddr);

      //6.3 手动让brandLogo校验成功
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })
   //7. 添加表单校验
   var $form = $("form");
   $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入品牌的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传一张品牌的图片"
          }
        }
      }
    }
   })
   //注册表单校验成功事件 阻止表单提交 传送ajax添加数据
   $form.on("success.form.bv",function(e){
    // 阻止表单提交
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          $("#secend-modal").modal("hide");
          page = 1;
          render();

          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
          $("[type='hidden']").val("");

          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");

        }
      }


    })

   })


});