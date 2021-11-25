function updateStore(id){
    $.ajax({
        url: '/stores_manage/' + id,
        type: 'PUT',
        data: $('#update-store').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
