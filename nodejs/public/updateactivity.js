function updateActivity(id){
    $.ajax({
        url: '/activities_manage/' + id,
        type: 'PUT',
        data: $('#update-activity').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
