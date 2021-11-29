function deleteOrder(id){
    $.ajax({
        url: '/orders_manage/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};