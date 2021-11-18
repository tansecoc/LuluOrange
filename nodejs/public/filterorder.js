function filterOrderByCustomer() {
    //get the id of the selected customer from the filter dropdown
    var customer_id = document.getElementById('customer_filter').value
    //construct the URL and redirect to it
    window.location = '/orders_manage/filter/' + parseInt(customer_id)
}
