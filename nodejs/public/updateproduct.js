function updateProduct(id){
    $.ajax({
        url: '/products_manage/' + id,
        type: 'PUT',
        data: $('#update-product').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
