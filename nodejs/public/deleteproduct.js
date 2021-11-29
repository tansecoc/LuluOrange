function deleteProduct(id){
    $.ajax({
        url: '/products_manage/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};