function updateOrderProduct(order_id, product_id){
    $.ajax({
        url: '/orders_products_manage/' + order_id + '_' + product_id,
        type: 'PUT',
        data: $('#update-order-product').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
