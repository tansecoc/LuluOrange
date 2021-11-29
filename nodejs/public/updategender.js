function updateGender(id){
    $.ajax({
        url: '/genders_manage/' + id,
        type: 'PUT',
        data: $('#update-gender').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
