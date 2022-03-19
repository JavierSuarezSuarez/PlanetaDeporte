
//NOTA: EN ALGUNAS PAGINAS A VECES ES NECESARIO HACER UN REFRESH PARA VER LAS ACTUALIZACIONES DE LOS DATOS

/*Wait for the document to be ready*/
$(document).ready(function(){
        var path = window.location.pathname;
        var page = path.split("/").pop();
        var data;

        //Clean and Get the current user
        localStorage.clear();
        // Get the current user type to filter between admin and writer
        $.getJSON("https://planetadeporte.herokuapp.com/sendToken",function(json) {
            if(json != undefined) {
                localStorage.setItem("Token", json["tipo"]);
                localStorage.setItem("Idsent", json["id"]);
                localStorage.setItem("Usuario", JSON.stringify(json));

                //Set the photo and name of logged user
                var usuario = JSON.parse(localStorage.getItem("Usuario"));
                localStorage.removeItem("Usuario");
                var nombre = usuario.nombre;
                var apellidos = usuario.apellidos;
                $(".header_profile_text").text(nombre + " " + apellidos);
                $(".header_profile_text").css("margin-left", "7%");
                $(".header_profile_img, .header_profile_img_V2").attr("src", usuario.foto);
            }
            /*Flow control depending of the html document loaded*/
            switch(page) {

                case "writer_comments_panel.html":
                case "admin_comments_panel.html":
                    $.getJSON("https://planetadeporte.herokuapp.com/comments",function(json) {
                        localStorage.setItem("Comentarios", JSON.stringify(json));
                        data = JSON.parse(localStorage.getItem("Comentarios"));
                        localStorage.removeItem("Comentarios");

                        $.getJSON("https://planetadeporte.herokuapp.com/articles",function(json) {
                            localStorage.setItem("Articulos", JSON.stringify(json));
                            var dataNews = JSON.parse(localStorage.getItem("Articulos"));
                            localStorage.removeItem("Articulos");


                            $.getJSON("https://planetadeporte.herokuapp.com/users",function(json) {
                                localStorage.setItem("Usuarios", JSON.stringify(json));
                                var dataUsers = JSON.parse(localStorage.getItem("Usuarios"));
                                localStorage.removeItem("Usuarios");


                                $('.comments_table').empty();

                                var th = '<tr>\
                                <th class="author_th">Autor</th>\
                                <th class="comment_th">Comentario</th>\
                                <th class="news_th">Noticia</th>\
                                <th class="actions_th">Acciones</th>\
                            </tr>';

                                $('.comments_table').append(th);

                                $.each(data, function (i) {
                                    var name;
                                    var photo;
                                    var news;
                                    var idautor = this['user_id'];
                                    var idnoticia = this['article_id'];

                                    /*JOIN de Comentarios y Usuarios*/
                                    $.each(dataUsers, function (i) {
                                        if (idautor == dataUsers[i].id) {
                                            name = dataUsers[i].nombre;
                                            photo = dataUsers[i].foto;
                                        }

                                    });

                                    /*JOIN de Comentarios y Noticias*/
                                    $.each(dataNews, function (j) {
                                        if (idnoticia == dataNews[j].id) {
                                            news = dataNews[j];
                                        }
                                    });

                                    if (page == "admin_comments_panel.html") {

                                        var info = '<tr>\
                                            <td><img class="comments_table_profile_img" title="User Img" alt="User Img" src="' + photo + '"> <p class="author_name">' + name + '</p></td>\
                                            <td class="comment_txt">' + this['texto'] + '</td>\
                                            <td class="comment_new_txt">' + news.titulo + '</td>\
                                            <td class="actions_td"> \
                                                <a class="edit_table_links" href="https://planetadeporte.herokuapp.com/articles/'+ news.id + '/comments/'+ this['id']+ '/edit\"> Editar comentario</a>\
                                                <a class="remove_table_links" href="" onclick="deleteComment('+this['id'] + ',' + news.id +')"> Eliminar comentario</a>\
                                                <a class="answer_table_links" href="new_registered.html?new=' + i + '"> Responder</a> <br>\
                                            </td>';
                                    } else {
                                        var info = '<tr>\
                                            <td><img class="comments_table_profile_img" title="User Img" alt="User Img" src="' + photo + '"> <p class="author_name">' + name + '</p></td>\
                                            <td class="comment_txt">' + this['texto'] + '</td>\
                                            <td class="comment_new_txt">' + news.titulo + '</td>\
                                            <td class="actions_td_writer"> \
                                                <a class="remove_table_links" href="" onclick="deleteComment('+this['id'] + ',' + news.id +')"> Eliminar comentario</a>\
                                                <a class="answer_table_links" href="new_registered.html?new=' + i + '"> Responder</a> <br>\
                                            </td>';
                                    }

                                    $('.comments_table').append(info);
                                });
                            });
                        });
                    });
                break;

                case "writer_content_panel.html":
                case "admin_content_panel.html":
                    $.getJSON("https://planetadeporte.herokuapp.com/articles",function(json) {
                        data = json;

                        $('.content_section').empty();
                        var editLocation;

                        $.each(data, function(i) {
                            editLocation = "window.location.href='https://planetadeporte.herokuapp.com/articles/"+ data[i].id + "/edit'";

                            var info=   '<div class="div_content_panel_new">\
                                    <div onclick= "window.location.href=\'new_registered.html?new='+ i +'\'">\
                                    <img class="img_content_panel_new" title="New" alt="New" src="'+ this['foto']+ '">\
                                    <p class="text_content_panel_new">'+ this['titulo'] + '</p>\
                                    </div>\
                                    <div class="edit_remove_btns">\
                                        <button onclick="'+ editLocation +'" class="button_edit">\
                                            <img  class="edit_delete" title="Edit" alt="Edit" src="img/edit.png">\
                                        </button>\
                                        <button class="button_delete" onclick="deleteArticle('+this['id']+')" type="button">\
                                            <img class="edit_delete" title="Delete" alt="Delete" src="img/delete.png">\
                                        </button>\
                                    </div>\
                                </div';
                            $('.content_section').append(info);
                        });
                    });

                    break;


                case "admin_users_panel.html":

                    $.getJSON("https://planetadeporte.herokuapp.com/users",function(json) {
                        data = json;

                        $('.users_table').empty();
                        var th = '<tr>\
                                    <th>Foto</th>\
                                    <th>Nombre</th>\
                                    <th>Apellido</th>\
                                    <th>Email</th>\
                                    <th>Clave (Hash)</th>\
                                    <th>Acciones</th>\
                                </tr>';

                        $('.users_table').append(th);

                        $.each(data, function () {
                            var info = '<tr>\
                                        <td><img class="users_table_profile_img" title="User Img" alt="User Img" src="' + this['foto'] + '"></td>\
                                        <td>' + this['nombre'] + '</td>\
                                        <td>' + this['apellidos'] + '</td>\
                                        <td>' + this['email'] + '</td>\
                                        <td class="hash_td">' + this['clave_digest'] + '</td>\
                                        <td>\
                                            <div class="edit_remove_btns_V2">\
                                                <button class="button_edit_V2" onclick="window.location.href= \'https://planetadeporte.herokuapp.com/users/'+ this['id']+ '/edit\'">\
                                                    <img  class="edit_delete_V2" title="Edit" alt="Edit" src="img/edit.png">\
                                                </button>\
                                                <button  class="button_delete_V2" onclick="deleteUser('+this['id']+')" type="button">\
                                                    <img class="edit_delete_V2" title="Delete" alt="Delete" src="img/delete.png">\
                                                </button>\
                                            </div>\
                                        </td>\
                                    </tr>';
                            $('.users_table').append(info);
                        });
                    });
                    break;

                case "home_registered.html":
                case "home.html":

                    $.getJSON("https://planetadeporte.herokuapp.com/articles",function(json) {
                       data = json;
                       var array= [];
                       var aux = [];
                       var count = 0;
                       $.each(data, function() {
                         if(count < 6) {
                             var random = Math.floor(Math.random() * data.length);
                             if(aux.includes(random) == false) {
                                 aux[count] = random;
                                 array[count] = data[random];
                                 count++;
                             }
                         }
                       });
                       console.log(array);
                       var mainNew = array[0];
                       var secNew1 = array[1];
                       var secNew2 = array[2];
                       var asideNew1 = array[3];
                       var asideNew2 = array[4];
                       var asideNew3 = array[5];
                       var mobile3 = asideNew1;
                       var mobile4 = asideNew2;


                        if(page == "home.html") {
                            //Main New
                            $('#main_new_img').attr("src", mainNew.foto);
                            $('#main_new_link').attr("href","new.html?new="+ data.indexOf(mainNew));
                            $('#main_new_title').text(mainNew.titulo);


                            //Secondary New 1
                            $('#sec_new1_img').attr("src", secNew1.foto);
                            $('#sec_new1_link').attr("href","new.html?new="+ data.indexOf(secNew1));
                            $('#sec_new1_txt').text(secNew1.seccion);
                            $('#sec_new1_title').text(secNew1.titulo);


                            //Secondary New 2
                            $('#sec_new2_img').attr("src", secNew2.foto);
                            $('#sec_new2_link').attr("href","new.html?new="+ data.indexOf(secNew2));
                            $('#sec_new2_txt').text(secNew2.seccion);
                            $('#sec_new2_title').text(secNew2.titulo);


                            //Aside New 1
                            $('#aside_new1_img').attr("src", asideNew1.foto);
                            $('#aside_new1_link').attr("href","new.html?new="+ data.indexOf(asideNew1));
                            $('#aside_new1_title').text(asideNew1.titulo);


                            //Aside New 2
                            $('#aside_new2_img').attr("src", asideNew2.foto);
                            $('#aside_new2_link').attr("href","new.html?new="+ data.indexOf(asideNew2));
                            $('#aside_new2_title').text(asideNew2.titulo);


                            //Aside New 3
                            $('#aside_new3_img').attr("src", asideNew3.foto);
                            $('#aside_new3_link').attr("href","new.html?new="+ data.indexOf(asideNew3));
                            $('#aside_new3_title').text(asideNew3.titulo);

                            //Mobile New 3
                            $('#mobile_new3_img').attr("src", mobile3.foto);
                            $('#mobile_new3_link').attr("href","new.html?new="+ data.indexOf(mobile3));
                            $('#mobile_new3_txt').text(mobile3.seccion);
                            $('#mobile_new3_title').text(mobile3.titulo);

                            //Mobile New 4
                            $('#mobile_new4_img').attr("src", mobile4.foto);
                            $('#mobile_new4_link').attr("href","new.html?new="+ data.indexOf(mobile4));
                            $('#mobile_new4_txt').text(mobile4.seccion);
                            $('#mobile_new4_title').text(mobile4.titulo);

                        } else {
                            //Main New
                            $('#main_new_img').attr("src", mainNew.foto);
                            $('#main_new_link').attr("href","new_registered.html?new="+ data.indexOf(mainNew));
                            $('#main_new_title').text(mainNew.titulo);


                            //Secondary New 1
                            $('#sec_new1_img').attr("src", secNew1.foto);
                            $('#sec_new1_link').attr("href","new_registered.html?new="+ data.indexOf(secNew1));
                            $('#sec_new1_txt').text(secNew1.seccion);
                            $('#sec_new1_title').text(secNew1.titulo);


                            //Secondary New 2
                            $('#sec_new2_img').attr("src", secNew2.foto);
                            $('#sec_new2_link').attr("href","new_registered.html?new="+ data.indexOf(secNew2));
                            $('#sec_new2_txt').text(secNew2.seccion);
                            $('#sec_new2_title').text(secNew2.titulo);


                            //Aside New 1
                            $('#aside_new1_img').attr("src", asideNew1.foto);
                            $('#aside_new1_link').attr("href","new_registered.html?new="+ data.indexOf(asideNew1));
                            $('#aside_new1_title').text(asideNew1.titulo);


                            //Aside New 2
                            $('#aside_new2_img').attr("src", asideNew2.foto);
                            $('#aside_new2_link').attr("href","new_registered.html?new="+ data.indexOf(asideNew2));
                            $('#aside_new2_title').text(asideNew2.titulo);


                            //Aside New 3
                            $('#aside_new3_img').attr("src", asideNew3.foto);
                            $('#aside_new3_link').attr("href","new_registered.html?new="+ data.indexOf(asideNew3));
                            $('#aside_new3_title').text(asideNew3.titulo);

                            //Mobile New 3
                            $('#mobile_new3_img').attr("src", mobile3.foto);
                            $('#mobile_new3_link').attr("href","new_registered.html?new="+ data.indexOf(mobile3));
                            $('#mobile_new3_txt').text(mobile3.seccion);
                            $('#mobile_new3_title').text(mobile3.titulo);

                            //Mobile New 4
                            $('#mobile_new4_img').attr("src", mobile4.foto);
                            $('#mobile_new4_link').attr("href","new_registered.html?new="+ data.indexOf(mobile4));
                            $('#mobile_new4_txt').text(mobile4.seccion);
                            $('#mobile_new4_title').text(mobile4.titulo);
                        }
                    });

                break;

                case "sport_section_registered.html":
                case "sport_section.html":
                    $.getJSON("https://planetadeporte.herokuapp.com/articles",function(json) {
                        data = json;//News
                        /*for(var i= 0; i < data.length; i++) {
                            data[i].id = i;
                        }*/
                        console.log(data);
                        var flag = window.location.href.split("=").pop();//This indicates what section is the user in
                        $('#btn_login_out').attr("href", "https://planetadeporte.herokuapp.com/login"); // Login out button
                        var pivot = false;
                        $('.main_new').empty();
                        $('.aside_news').empty();
                        var brdc;
                        if (page == "sport_section.html") {
                            brdc = 'sport_section.html?section=';

                        } else {
                            brdc = 'sport_section_registered.html?section=';
                        }

                        /*Switch to initialize the html depending on the section*/
                        switch (flag) {
                            case "futbol":
                                $('#brdc_section').text('Futbol');
                                $('#brdc_section_mobile').text('Futbol');
                                $('#brdc_section').attr('href', brdc + 'futbol');

                                pivot = false;
                                var token = true;
                                var url;
                                //Loop to load all JSON news into the webpage
                                for (var i = 0; i < data.length; i++) {

                                    if (data[i].seccion == "Futbol") {

                                        //Main New
                                        if (token == true) {
                                            token = false;
                                            var mainNew = '<div class="main">\
                                                    <img id="futbol' + i + '" class="main_image" title="futbol' + i + '" alt="futbol' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="news_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            mainNew += url;
                                            mainNew += '<h3 id="futbol' + i + '_text" class="news_text">' + data[i].titulo + '</h3>\
                                                    </a>\
                                                  </div>';

                                            var prevSec_Div = '<div class="secondary_news"> </div>';
                                            $('.main_new').append(mainNew);
                                            $('.main_new').append(prevSec_Div);

                                        } else if (window.innerWidth > 767) {

                                            //PC & Tablet
                                            //Secondary News
                                            if (pivot == false) {
                                                var secondNew = ' <div class="secondary_new_container">\
                                                            <img id="futbol' + i + '" class="secondary_images" title="futbol' + i + '" alt="futbol' + i + '" src="' + data[i].foto + '">';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                secondNew += url;
                                                secondNew += '<h5 id="futbol' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                    </a>\
                                                    </div>';
                                                $('.secondary_news').append(secondNew);
                                                pivot = true;

                                                //Aside News
                                            } else if (pivot == true) {

                                                var asideNew = '<div class="aside_new">\
                                                            <img id="futbol' + i + '" class="aside_images" title="futbol' + i + '" alt="futbol' + i + '" src="' + data[i].foto + '"/>';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="news_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                asideNew += url;
                                                asideNew += '<h6 id="futbol' + i + '_text" class="news_text">' + data[i].titulo + '</h6>\
                                                    </a>\
                                                    </div>';
                                                $('.aside_news').append(asideNew);
                                                pivot = false;
                                            }
                                        } else {
                                            //Mobile (All Secondary News)
                                            var secondNewMobile = ' <div class="secondary_new_container secondary_new_mobile">\
                                                            <img id="futbol' + i + '" class="secondary_images" title="futbol' + i + '" alt="futbol' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="secondary_links" href="new.html?new=' + i+ '">';
                                            } else {
                                                url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                            }

                                            secondNewMobile += url;
                                            secondNewMobile += '<h5 id="futbol' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                    </a>\
                                                    </div>';
                                            $('.secondary_news').append(secondNewMobile);
                                        }
                                    }
                                }
                                break;

                            case "baloncesto":
                                $('#brdc_section').text('Baloncesto');
                                $('#brdc_section_mobile').text('Baloncesto');
                                $('#brdc_section').attr('href', brdc + 'baloncesto');
                                pivot = false;
                                var token = true;
                                //Loop to load all JSON news into the webpage
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].seccion == "Baloncesto") {

                                        //Main New
                                        if (token == true) {
                                            token = false;
                                            var mainNew = '<div class="main">\
                                                    <img id="baloncesto' + i + '" class="main_image" title="baloncesto' + i + '" alt="baloncesto' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="news_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            console.log(i);
                                            mainNew += url;
                                            mainNew += '<h3 id="baloncesto' + i + '_text" class="news_text">' + data[i].titulo + '</h3>\
                                                </a>\
                                                </div>';

                                            var prevSec_Div = '<div class="secondary_news"> </div>';
                                            $('.main_new').append(mainNew);
                                            $('.main_new').append(prevSec_Div);
                                        } else if (window.innerWidth > 767) {
                                            //PC & Tablet
                                            //Secondary News
                                            if (pivot == false) {
                                                var secondNew = ' <div class="secondary_new_container">\
                                                            <img id="baloncesto' + i + '" class="secondary_images" title="baloncesto' + i + '" alt="baloncesto' + i + '" src="' + data[i].foto + '">';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="secondary_links" href="new.html?new=' + i+ '">';
                                                } else {
                                                    url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                secondNew += url;
                                                secondNew += '<h5 id="baloncesto' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                    </a>\
                                                    </div>';

                                                $('.secondary_news').append(secondNew);
                                                pivot = true;

                                                //Aside News
                                            } else if (pivot == true) {

                                                var asideNew = '<div class="aside_new">\
                                                            <img id="baloncesto' + i + '" class="aside_images" title="baloncesto' + i + '" alt="baloncesto' + i + '" src="' + data[i].foto + '"/>';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="news_links" href="new.html?new=' + i+ '">';
                                                } else {
                                                    url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                asideNew += url;
                                                asideNew += '<h6 id="baloncesto' + i + '_text" class="news_text">' + data[i].titulo + '</h6>\
                                                    </a>\
                                                    </div>';

                                                $('.aside_news').append(asideNew);
                                                pivot = false;
                                            }
                                        } else {
                                            //Mobile
                                            var secondNewMobile = ' <div class="secondary_new_container secondary_new_mobile">\
                                                            <img id="baloncesto' + i + '" class="secondary_images" title="baloncesto' + i + '" alt="baloncesto' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            secondNewMobile += url;
                                            secondNewMobile += '<h5 id="baloncesto' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                      </a>\
                                                      </div>';

                                            $('.secondary_news').append(secondNewMobile);
                                        }
                                    }
                                }

                                break;

                            case "tenis":
                                $('#brdc_section').text('Tenis');
                                $('#brdc_section_mobile').text('Tenis');
                                $('#brdc_section').attr('href', brdc + 'tenis');
                                pivot = false;
                                var token = true;
                                //Loop to load all JSON news into the webpage
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].seccion == "Tenis") {

                                        //Main New
                                        if (token == true) {
                                            token = false;
                                            var mainNew = '<div class="main">\
                                                    <img id="tenis' + i + '" class="main_image" title="tenis' + i + '" alt="tenis' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="news_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            mainNew += url;
                                            mainNew += '<h3 id="tenis' + i + '_text" class="news_text">' + data[i].titulo + '</h3>\
                                               </a>\
                                               </div>';

                                            var prevSec_Div = '<div class="secondary_news"> </div>';
                                            $('.main_new').append(mainNew);
                                            $('.main_new').append(prevSec_Div);
                                        } else if (window.innerWidth > 767) {
                                            //PC & Tablet
                                            //Secondary News
                                            if (pivot == false) {
                                                var secondNew = ' <div class="secondary_new_container">\
                                                            <img id="tenis' + i + '" class="secondary_images" title="tenis' + i + '" alt="tenis' + i + '" src="' + data[i].foto + '">';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                secondNew += url;
                                                secondNew += '<h5 id="tenis' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                     </a>\
                                                     </div>';

                                                $('.secondary_news').append(secondNew);
                                                pivot = true;
                                                //Aside News
                                            } else if (pivot == true) {

                                                var asideNew = '<div class="aside_new">\
                                                            <img id="tenis' + i + '" class="aside_images" title="tenis' + i + '" alt="tenis' + i + '" src="' + data[i].foto + '"/>';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="news_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                asideNew += url;
                                                asideNew += '<h6 id="tenis' + i + '_text" class="news_text">' + data[i].titulo + '</h6>\
                                                    </a>\
                                                    </div>';

                                                $('.aside_news').append(asideNew);
                                                pivot = false;
                                            }
                                        } else {
                                            //Mobile
                                            var secondNewMobile = ' <div class="secondary_new_container secondary_new_mobile">\
                                                            <img id="tenis' + i + '" class="secondary_images" title="tenis' + i + '" alt="tenis' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            secondNewMobile += url;
                                            secondNewMobile += '<h5 id="tenis' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                      </a>\
                                                      </div>';

                                            $('.secondary_news').append(secondNewMobile);
                                        }
                                    }
                                }

                                break;

                            case "ciclismo":
                                $('#brdc_section').text('Ciclismo');
                                $('#brdc_section_mobile').text('Ciclismo');
                                $('#brdc_section').attr('href', brdc + 'ciclismo');
                                pivot = false;
                                var token = true;
                                //Loop to load all JSON news into the webpage
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].seccion == "Ciclismo") {

                                        //Main New
                                        if (token == true) {
                                            token = false;
                                            var mainNew = '<div class="main">\
                                                    <img id="ciclismo' + i + '" class="main_image" title="ciclismo' + i + '" alt="ciclismo' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="news_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            mainNew += url;
                                            mainNew += '<h3 id="ciclismo' + i + '_text" class="news_text">' + data[i].titulo + '</h3>\
                                               </a>\
                                               </div>';

                                            var prevSec_Div = '<div class="secondary_news"> </div>';
                                            $('.main_new').append(mainNew);
                                            $('.main_new').append(prevSec_Div);
                                        } else if (window.innerWidth > 767) {
                                            //PC & Tablet
                                            //Secondary News
                                            if (pivot == false) {
                                                var secondNew = ' <div class="secondary_new_container">\
                                                            <img id="ciclismo' + i + '" class="secondary_images" title="ciclismo' + i + '" alt="ciclismo' + i + '" src="' + data[i].foto + '">';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                secondNew += url;
                                                secondNew += '<h5 id="ciclismo' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                    </a>\
                                                    </div>';

                                                $('.secondary_news').append(secondNew);
                                                pivot = true;

                                                //Aside News
                                            } else if (pivot == true) {

                                                var asideNew = '<div class="aside_new">\
                                                            <img id="ciclismo' + i + '" class="aside_images" title="cicesports' + i + '" alt="ciclismo' + i + '" src="' + data[i].foto + '"/>';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="news_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                asideNew += url;
                                                asideNew += '<h6 id="ciclismo' + i + '_text" class="news_text">' + data[i].titulo + '</h6>\
                                                    </a>\
                                                    </div>';

                                                $('.aside_news').append(asideNew);
                                                pivot = false;
                                            }
                                        } else {
                                            //Mobile
                                            var secondNewMobile = ' <div class="secondary_new_container secondary_new_mobile">\
                                                            <img id="ciclismo' + i + '" class="secondary_images" title="ciclismo' + i + '" alt="ciclismo' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            secondNewMobile += url;
                                            secondNewMobile += '<h5 id="ciclismo' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                      </a>\
                                                      </div>';

                                            $('.secondary_news').append(secondNewMobile);
                                        }
                                    }
                                }
                                break;

                            case "motor":
                                $('#brdc_section').text('Motor');
                                $('#brdc_section_mobile').text('Motor');
                                $('#brdc_section').attr('href', brdc + 'motor');
                                pivot = false;
                                var token = true;
                                //Loop to load all JSON news into the webpage
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].seccion == "Motor") {

                                        //Main New
                                        if (token == true) {
                                            token = false;
                                            var mainNew = '<div class="main">\
                                                    <img id="motor' + i + '" class="main_image" title="motor' + i + '" alt="motor' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="news_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            mainNew += url;
                                            mainNew += '<h3 id="motor' + i + '_text" class="news_text">' + data[i].titulo + '</h3>\
                                               </a>\
                                               </div>';

                                            var prevSec_Div = '<div class="secondary_news"> </div>';
                                            $('.main_new').append(mainNew);
                                            $('.main_new').append(prevSec_Div);
                                        } else if (window.innerWidth > 767) {
                                            //PC & Tablet
                                            //Secondary News
                                            if (pivot == false) {
                                                var secondNew = ' <div class="secondary_new_container">\
                                                            <img id="motor' + i + '" class="secondary_images" title="motor' + i + '" alt="motor' + i + '" src="' + data[i].foto + '">';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                secondNew += url;
                                                secondNew += '<h5 id="motor' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                     </a>\
                                                     </div>';

                                                $('.secondary_news').append(secondNew);
                                                pivot = true;

                                                //Aside News
                                            } else if (pivot == true) {

                                                var asideNew = '<div class="aside_new">\
                                                            <img id="motor' + i + '" class="aside_images" title="motor' + i + '" alt="motor' + i + '" src="' + data[i].foto + '"/>';
                                                if (page == "sport_section.html") {
                                                    url = '<a class="news_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                asideNew += url;
                                                asideNew += '<h6 id="motor' + i + '_text" class="news_text">' + data[i].titulo + '</h6>\
                                                    </a>\
                                                    </div>';

                                                $('.aside_news').append(asideNew);
                                                pivot = false;
                                            }
                                        } else {
                                            //Mobile
                                            var secondNewMobile = ' <div class="secondary_new_container secondary_new_mobile">\
                                                            <img id="motor' + i + '" class="secondary_images" title="motor' + i + '" alt="motor' + i + '" src="' + data[i].foto + '">';
                                            if (page == "sport_section.html") {
                                                url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            secondNewMobile += url;
                                            secondNewMobile += '<h5 id="motor' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                      </a>\
                                                      </div>';

                                            $('.secondary_news').append(secondNewMobile);
                                        }
                                    }
                                }
                                break;

                            case "esports":
                                $('#brdc_section').text('eSports');
                                $('#brdc_section_mobile').text('eSports');
                                $('#brdc_section').attr('href', brdc + 'esports');
                                pivot = false;
                                var token = true;
                                //Loop to load all JSON news into the webpage
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].seccion == "eSports") {

                                        //Main New
                                        if (token == true) {
                                            token = false;
                                            var mainNew = '<div class="main">\
                                                    <img id="esports' + i + '" class="main_image" title="esports' + i + '" alt="esports' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="news_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            mainNew += url;
                                            mainNew += '<h3 id="esports' + i + '_text" class="news_text">' + data[i].titulo + '</h3>\
                                               </a>\
                                               </div>';

                                            var prevSec_Div = '<div class="secondary_news"> </div>';
                                            $('.main_new').append(mainNew);
                                            $('.main_new').append(prevSec_Div);
                                        } else if (window.innerWidth > 767) {
                                            //PC & Tablet
                                            //Secondary News
                                            if (pivot == false) {
                                                var secondNew = ' <div class="secondary_new_container">\
                                                            <img id="esports' + i + '" class="secondary_images" title="esports' + i + '" alt="esports' + i + '" src="' + data[i].foto + '">';

                                                if (page == "sport_section.html") {
                                                    url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                secondNew += url;
                                                secondNew += '<h5 id="esports' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                     </a>\
                                                     </div>';

                                                $('.secondary_news').append(secondNew);
                                                pivot = true;

                                                //Aside News
                                            } else if (pivot == true) {

                                                var asideNew = '<div class="aside_new">\
                                                            <img id="esports' + i + '" class="aside_images" title="esports' + i + '" alt="esports' + i + '" src="' + data[i].foto + '"/>';
                                                if (page == "sport_section.html") {
                                                    url = '<a class="news_links" href="new.html?new=' + i + '">';
                                                } else {
                                                    url = '<a class="news_links" href="new_registered.html?new=' + i + '">';
                                                }
                                                asideNew += url;
                                                asideNew += '<h6 id="esports' + i + '_text" class="news_text">' + data[i].titulo + '</h6>\
                                                    </a>\
                                                    </div>';

                                                $('.aside_news').append(asideNew);
                                                pivot = false;
                                            }
                                        } else {
                                            //Mobile
                                            var secondNewMobile = ' <div class="secondary_new_container secondary_new_mobile">\
                                                            <img id="esports' + i + '" class="secondary_images" title="esports' + i + '" alt="esports' + i + '" src="' + data[i].foto + '">';

                                            if (page == "sport_section.html") {
                                                url = '<a class="secondary_links" href="new.html?new=' + i + '">';
                                            } else {
                                                url = '<a class="secondary_links" href="new_registered.html?new=' + i + '">';
                                            }
                                            secondNewMobile += url;
                                            secondNewMobile += '<h5 id="esports' + i + '_text" class="news_text sport_sec_text vertical">' + data[i].titulo + '</h5>\
                                                      </a>\
                                                      </div>';

                                            $('.secondary_news').append(secondNewMobile);
                                        }
                                    }
                                }
                                break;
                        };
                    });
                    break;


                case "new_registered.html":
                case "new.html":
                    var flag = window.location.href.split("=").pop();
                    $.getJSON("https://planetadeporte.herokuapp.com/articles",function(json) {
                        localStorage.setItem("Articulos", JSON.stringify(json));
                        data = JSON.parse(localStorage.getItem("Articulos"));//News
                        localStorage.removeItem("Articulos");


                        $.getJSON("https://planetadeporte.herokuapp.com/comments",function(json) {
                            localStorage.setItem("Comentarios", JSON.stringify(json));
                            var dataComments = JSON.parse(localStorage.getItem("Comentarios"));
                            localStorage.removeItem("Comentarios");



                            $.getJSON("https://planetadeporte.herokuapp.com/users",function(json) {
                                localStorage.setItem("Usuarios", JSON.stringify(json));
                                var dataUsers = JSON.parse(localStorage.getItem("Usuarios"));
                                localStorage.removeItem("Usuarios");


                                console.log(data);
                                console.log(dataComments);
                                console.log(dataUsers);

                                var flag = window.location.href.split("=").pop();//This indicates what new has been selected
                                $('#btn_login_out').attr("href","https://planetadeporte.herokuapp.com/login"); // Login out button

                                //Modifying breadcrumbs attributes and values
                                $('#brdc_new_section').text(data[flag].seccion);
                                if(page == "new.html") $('#brdc_new_section').attr("href", "sport_section.html?seccion="+ data[flag].seccion.toLowerCase());
                                else $('#brdc_new_section').attr("href", "sport_section_registered.html?seccion="+ data[flag].seccion.toLowerCase());
                                $('#brdc_new input').val(data[flag].titulo);
                                $('#brdc_new_tablet input').val(data[flag].titulo);
                                $('#brdc_new_mobile').val(data[flag].titulo);

                                $('.main_new_section').empty();
                                $('.author_biography').empty();
                                $('.recommendations').empty();
                                $('.comments').empty();

                                //Get the author
                                var autor;
                                $.each(dataUsers, function(i) {
                                    if(dataUsers[i].id == data[flag].user_id) {
                                        autor = dataUsers[i];
                                    }
                                });

                                //Date format
                                var unix = data[flag].fecha;
                                var date = new Date(unix * 1000);


                                //Main New
                                var mainNew='<header>\
                                <h1>'+ data[flag].titulo + '</h1>\
                                <h4 class="new_subtitle">'+ data[flag].subtitulo + '</h4>\
                            </header>\
                            <img class="new_image" title="photo_new" alt="photo_new" src="'+ data[flag].foto + '">\
                            <pre class="new_date">'+ autor.nombre + ' ' + autor.apellidos +  '     Publicado <time>'+ date.toLocaleString('en-GB')+ '</time></pre>\
                            <p>'+ data[flag].cuerpo + '</p>';

                                $('.main_new_section').append(mainNew);



                                //Author section
                                var author='<div class="author_photo_section">\
                                <img class="author_image" title="Author photo" alt="Author photo" src="'+ autor.foto + '">\
                            </div>\
                            <div class="author_text_section">\
                                <header>\
                                    <h3>'+ autor.nombre + ' ' + autor.apellidos +  '</h3>\
                                </header>\
                                <p class="biography_text">Nací hará hoy treinta años, en un caluroso 3 de octubre de 1988, en la Maternidad de un hospital situado en la ciudad de Murcia.\
                                Si bien el tercero y más joven de de mis hermanos, mi nacimiento fue también altamente deseado por mis padres. Los dos primeros \
                                años de mi vida fueron muy felices, rodeado de mi familia y empezando a descubrir el mundo que me rodeaba. Sin embargo durante el\
                                segundo de ellos mis padres recibieron una oferta de trabajo en Madrid, mudándonos todos a un piso cercano a la Puerta del Sol.</p>\
                            </div>';

                                $('.author_biography').append(author);



                                //Recommendations section
                                //Get the related news
                                var count=0;
                                var arr=[];
                                var relatedNews='<header>\
                                        <h3 class="section_header">Te recomendamos</h3>\
                                    </header>';


                                $.each(data, function(i) {
                                    if(data[i].seccion == data[flag].seccion) {
                                        if(data[i].id != data[flag].id && count < 3) {
                                            arr[count] = data[i];
                                            count++;
                                        }
                                    }
                                });
                                for(var j = 0; j < arr.length; j++) {
                                    var k = j+1;
                                    var noticia = arr[j];
                                    var url;
                                    if(page == "new.html") {
                                        url='<a class="news_links" href="new.html?new='+ data.indexOf(noticia) +'">';
                                    } else {
                                        url='<a class="news_links" href="new_registered.html?new='+ data.indexOf(noticia) +'">';
                                    }
                                    relatedNews += '<div class="recommendation_new_section_' + k + '">\
                                                        <img class="recommendation_images" title="new' + k + '" alt="new'+ k + '" src="'+ noticia.foto + '">\
                                                        <header>'
                                                + url +'\
                                                            <h6 class="recommendation_text">'+ noticia.titulo + '</h6>\
                                                        </a>\
                                                        </header>\
                                                    </div>';
                                }
                                $('.recommendations').append(relatedNews);


                                //Comments Section
                                var commentsHeader='<header>\
                                        <h3 class="section_header">Comentarios</h3>\
                                    </header>';

                                $('.comments').append(commentsHeader);

                                var array='';

                                /* Get the related Comments: JOIN Comments, News & Users*/
                                $.each(dataComments, function(j){
                                    if(dataComments[j].article_id == data[flag].id) {
                                        var comment = dataComments[j];
                                        $.each(dataUsers, function(l){
                                            if(comment.user_id == dataUsers[l].id) {
                                                var user = dataUsers[l];
                                                var relatedComments = '<div class="comment_section">\
                                                                    <div class="commentator_photo_section">\
                                                                        <img class="commentator_photo" title="Comentator photo" alt="Comentator photo 1" src="'+ user.foto + '">\
                                                                    </div>\
                                                                    <div class="commentator_text_section">\
                                                                        <header>\
                                                                            <h3 class="section_header">'+ user.nombre + ' ' + user.apellidos +  '</h3>\
                                                                        </header>\
                                                                        <p class="commentator_text">' + comment.texto +'</p>\
                                                                    </div>\
                                                                </div>';
                                                array += relatedComments;
                                            }
                                        });
                                    }
                                });

                                $('.comments').append(array);
                            });
                        });
                    });
                break;

                case "profile.html":

                    var token = localStorage.getItem("Token");
                    var idsent = localStorage.getItem("Idsent");

                    if(token == 1) {
                        $('#mobile_panel_link').attr("href","admin_content_panel.html");
                        $('#pc_tablet_panel_link').attr("href","admin_content_panel.html");

                    } else if ( token == 2) {
                        $('#mobile_panel_link').attr("href","writer_content_panel.html");
                        $('#pc_tablet_panel_link').attr("href","writer_content_panel.html");
                    } else if (token == 3) {
                        $('#mobile_panel_link').css("display","none");
                        $('#pc_tablet_panel_link').css("display","none");
                        $('#mobile_panel_img').css("display","none");
                        $('#pc_tablet_panel_img').css("display","none");
                    }

                    //Fill user fields with their data
                    $.getJSON("https://planetadeporte.herokuapp.com/users",function(json) {
                        data = json;

                        var user;

                        $.each(data, function(i) {
                            if(data[i].id == idsent) {
                                user = data[i];
                            }
                        });
                        $('.profile_img').attr("src",user.foto);
                        $('#name_profile').val(user.nombre);
                        $('#last_name_profile').val(user.apellidos);
                        $('#email_profile').val(user.email);
                        var editLocation = "window.location.href='https://planetadeporte.herokuapp.com/users/"+ user.id + "/edit'";
                        $(".button_edit, .btn_change_img").attr("onclick", "" + editLocation);
                    });
                    break;
            }
        });
});