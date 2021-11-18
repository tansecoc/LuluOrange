function searchProductByID() {
    //get the Product ID
    var first_name_search_string  = document.getElementById('product_search_string').value
    //construct the URL and redirect to it
    window.location = '/orders_products/search/' + encodeURI(product_search_string)
}
