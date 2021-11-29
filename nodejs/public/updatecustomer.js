function updateCustomer(id){
    $.ajax({
        url: '/customers_manage/' + id,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
