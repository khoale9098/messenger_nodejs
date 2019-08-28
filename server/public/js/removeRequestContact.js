function removeRequestContact(){
    $(".user-remove-request-contact").bind("click", function () {
        console.log('Remove')
        let targetId = $(this).data("uid");
      $.ajax({
          url:"/contact/remove-request-contact",
          type: "delete",
          data:{uid: targetId},
          success: function(data){
            if(data.success)
            {
                $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targetId}]`).hide();
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetId}]`).css("display","inline-block");
                //Xử lí Realtime
                decreaseNumberNotiContact("count-request-contact-sent");
             }
          }
      })
    })
}