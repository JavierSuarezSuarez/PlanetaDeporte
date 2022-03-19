
//NOTA: EN ALGUNAS PAGINAS A VECES ES NECESARIO HACER UN REFRESH PARA VER LAS ACTUALIZACIONES DE LOS DATOS


function deleteArticle(id) {
    $.ajax ({
        url: 'https://planetadeporte.herokuapp.com/articles/' + id,
        type: 'DELETE',
        success: function(result) {
            document.location.reload(true);
        },
        error: function(errors) {
            document.location.reload(true);
        }
    });
}

function deleteUser(id) {
    $.ajax ({
        url: 'https://planetadeporte.herokuapp.com/users/' + id,
        type: 'DELETE',
        success: function(result) {
            document.location.reload(true);
        },
        error: function(errors) {
            document.location.reload(true);
        }
    });
}


function deleteComment(id, idnoticia) {
    $.ajax ({
        url: 'https://planetadeporte.herokuapp.com/articles/' + idnoticia + '/comments/' + id,
        type: 'DELETE',
        success: function(result) {
            document.location.reload(true);
        },
        error: function(errors) {
            document.location.reload(true);
        }
    });
}

