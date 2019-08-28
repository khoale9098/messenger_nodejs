function callFindUsers(e) {
    if (e.which === 13 || e.type === "click") {
        let keyword = $("#input-find-users-contact").val();
        let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
        if (!keyword.length) {
            alertify.notify("Chưa nhập nội dung tìm kiếm!", "error", 7);
            return false
        }
        if (!regexKeyword.test(keyword)) {
            alertify.notify("Lỗi từ khoá tìm kiếm, chỉ cho phép ký tự chữ cái, số và khoảng trống!", "error", 7);
            return false
        }
        $.get(`/contact/find-users/${keyword}`, function (data) {
            //Tìm thẻ ul trong id: find-user
            $("#find-user ul").html(data);
            addcontact(); //js/addContact.js
            removeRequestContact();
        })
    }
}
$(document).ready(function () {
    $("#input-find-users-contact").bind("keypress", callFindUsers)
    $("#btn-find-users-contact").bind("click", callFindUsers)
})