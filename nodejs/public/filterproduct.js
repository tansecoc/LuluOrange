function filterProductByActivity() {
    //get the id of the selected activity from the filter dropdown
    var activity_id = document.getElementById('activity_filter').value
    //construct the URL and redirect to it
    window.location = '/products_manage/filter/' + parseInt(activity_id)
}
