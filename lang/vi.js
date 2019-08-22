export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com nha!",
    gender_incorrect: "Giới tính kìa",
    password_incorrect: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác!"
}
export const transErrors ={
    account_in_use: "Email này đã được sử dụng",
    account_removed: "Tài khoản đã bị gỡ khỏi hệ thống, nếu tin rằng điều này là hiểu nhầm, vui lòng liên lạc với Khoa Le!",
    account_not_active:"Email này đã được đăng kí nhưng chưa được actived, vui lòng kiểm tra email hoặc liên lạc với Khoa Le!"
}
export const transSuccess = {
    userCreated : (userEmail)=>{
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra lại email để actived tài khoản trước khi đăng nhập`
    }
}