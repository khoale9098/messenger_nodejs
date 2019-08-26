let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
function updateUserInfo() {
    $("#input-change-avatar").bind("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576;
        // if ($.inArray(fileData.type, math) === -1) {
        //     alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg & png", "error", 7)
        //     $(this).val(null);
        //     return false;
        // }
        // if (fileData.size > limit) {
        //     alertify.notify("Ảnh upload tối đa cho phép là một 1mb", "error", 7)
        //     $(this).val(null);
        //     return false;
        // }
        console.log(fileData)
        if (typeof (FileReader) != "undefined") {
            let imagereview = $("#image-edit-profile");
            imagereview.empty();
            let fileReader = new FileReader();
            fileReader.onload = function (e) {
                $("<img>", {
                    "src": e.target.result,
                    "class": "avatar img-circle",
                    "id": "user-modal-avatar",
                    "alt": " avatar"
                }).appendTo(imagereview);

            }
            imagereview.show();
            fileReader.readAsDataURL(fileData);
            let formData = new FormData();
            formData.append("avatar", fileData);
            userAvatar = formData;
        }
        else {
            alertify.notify("Trình duyệt của bạn không hỗ trợ file Reader")
        }

    });
}
$(document).ready(function () {
    updateUserInfo();
    originAvatarSrc = $("#user-modal-avatar").attr("src");

    $("#input-btn-update-user").bind("click", function () {
        if ($.isEmptyObject(userInfo) && !userAvatar) {
            alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu", "error", 7)
            return false;
        }
        $.ajax({
            url: "/user/update-avatar",
            type: "put",
            cache: false,
            contentType: false,
            processData: false,
            data: userAvatar,
            success: function (result) {
                console.log(result)
                //Display success
                $(".user-modal-alert-success").find("span").text(result.message);
                $(".user-modal-alert-success").css("display", "block");
                //Cập nhật avartar navbar
                $("#navbar-avatar").attr("src",result.imageSrc);
            
                originAvatarSrc = result.imageSrc;
                $("#input-btn-cancel-update-user").click();


            },
            error: function (error) {
                console.log(error);
                $(".user-modal-alert-error").find("span").text(error.responseText);
                $(".user-modal-alert-error").css("display", "block")
                //reset all
                $("#input-btn-cancel-update-user").click();
            }
        })

    })
    $("#input-btn-cancel-update-user").bind("click", function () {
        userAvatar = null;
        userInfo = {};
        $("#input-change-avatar").val(null);
        $("#user-modal-avatar").attr("src", originAvatarSrc);
    })
    //
    $("#input-change-username").bind("change", function () {
        userInfo.username = $(this).val();
    })
    $("#input-change-gender-male").bind("click", function () {
        userInfo.gender = $(this).val();
    })
    $("#input-change-gender-female").bind("click", function () {
        userInfo.gender = $(this).val();
    })
    $("#input-change-address").bind("change", function () {
        userInfo.address = $(this).val();
    })
    $("#input-change-phone").bind("change", function () {
        userInfo.phone = $(this).val();
    })
})