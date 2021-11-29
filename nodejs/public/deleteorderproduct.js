function deleteOrderProduct(order_id, product_id){
    $.ajax({
        url: '/orders_products_manage/' + order_id + '_' + product_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};