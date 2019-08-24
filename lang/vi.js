export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com nha!",
    gender_incorrect: "Giới tính kìa",
    password_incorrect: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác!"
}
export const transErrors = {
    account_in_use: "Email này đã được sử dụng",
    account_removed: "Tài khoản đã bị gỡ khỏi hệ thống, nếu tin rằng điều này là hiểu nhầm, vui lòng liên lạc với Khoa Le!",
    account_not_active: "Email này đã được đăng kí nhưng chưa được actived, vui lòng kiểm tra email hoặc liên lạc với Khoa Le!",
    token_undefined: "Token không tồn tại!",
    login_failed: "Sai tài khoản hoặc mật khẩu!",
    server_error:"Có lỗi ở phía máy chủ, vui lòng liên hệ với Khoa Le"
}
export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra lại email để actived tài khoản trước khi đăng nhập`
    },
    account_actived:"Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập vào ứng dụng!",
    loginSuccess: ( username)=>{
        return `Xin chào ${username}.`;
    }
}
export const transMail = {
    subject: "Coffee Chat: Xác nhận kính hoạt tài khoản",
    template: (linkVerify) => {
        return `
        <h2>Bạn nhận được email này vì đã đăng kí tài khoản trên ứng dụng Coffee Chat</h2>
        <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
        <h3><a href ="${linkVerify}" target = "blank">${linkVerify}</a></h3>
        <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng!</h4>
        `
    },
    send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ với Khoa Le"
};