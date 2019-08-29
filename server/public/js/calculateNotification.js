function increaseNumberNotification(className) {
    let curentValue = +$(`.${className}`).text();
    curentValue += 1;
    if (curentValue === 0) {
        $(`.${className}`).css("display", "none").html("")
    } else {
        $(`.${className}`).css("display", "block").html(curentValue)
    }
}
function decreaseNumberNotification(className) {
    let curentValue = +$(`.${className}`).text();
    curentValue -= 1;
    if (curentValue === 0) {
        $(`.${className}`).css("display", "none").html("")
    } else {
        $(`.${className}`).css("display", "block").html(curentValue)
    }
  }