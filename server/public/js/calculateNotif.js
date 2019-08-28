function increaseNumberNotiContact(className) {
    let curentValue = +$(`.${className}`).find("em").text();
    curentValue += 1;
    if (curentValue === 0) {
        $(`.${className}`).html("")
    } else {
        $(`.${className}`).html(`<em>${curentValue}</em>`)
    }
}
function decreaseNumberNotiContact(className) {
    let curentValue = +$(`.${className}`).find("em").text();
    curentValue -= 1;
    if (curentValue === 0) {
        $(`.${className}`).html("")
    } else {
        $(`.${className}`).html(`<em>${curentValue}</em>`)
    }
  }