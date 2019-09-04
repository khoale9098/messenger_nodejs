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
                decreaseNumberNotiContact("count-request-contact-sent");
                 //Xử lí Realtime
                 socket.emit("remove-request-contact", { contactId: targetId })
             }
          }
      })
    })
}
socket.on("response-remove-request-contact", function (user) {
  $(".noti_content").find(`span[data-uid =${user.id}]`).remove();
  //Xoá ở modal contact 
  decreaseNumberNotiContact('count-request-contact-received');
  decreaseNumberNotification('noti_contact_counter');
  decreaseNumberNotification('noti_counter');
})