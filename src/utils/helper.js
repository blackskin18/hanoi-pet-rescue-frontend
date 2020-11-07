import PostImg from "../assets/images/post-1.png";

const format_date = (string_raw) => {
    if (navigator.userAgent.match(/iPhone|iPod|iPad/) != null) {
        var d = new Date(string_raw),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    } else {
        if (string_raw !== undefined) {
            var dateParts = string_raw.substring(0,10).split('-');
            return dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];
        }
    }
    return string_raw;

}
const format_blog_link = (blog) => {
    return "/blog/" + blog.id + "-" + blog.slug + ".html"
}

const format_product_link = (product) => {
    return "/product/" + product.id + "-" + product.slug + ".html"
}


const check_thumbnail_post = (thumbnail) => {
    if (thumbnail === "") {
        return PostImg
    }
    return thumbnail
}

const format_phone_number = (phone_number) => {
    if (phone_number) {
        if (phone_number.length === 10) {
            return phone_number.substring(0,4) + " " + phone_number.substring(4,7) + " " + phone_number.substring(7,10)
        } else if (phone_number.length === 11) {
            return phone_number.substring(0,4) + " " + phone_number.substring(4,7) + " " + phone_number.substring(7,11)
        }
    }
    return phone_number
}


export {format_date, format_blog_link, check_thumbnail_post, format_product_link, format_phone_number}