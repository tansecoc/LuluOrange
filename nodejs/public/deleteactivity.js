function deleteActivity(id){
    $.ajax({
        url: '/activities_manage/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


