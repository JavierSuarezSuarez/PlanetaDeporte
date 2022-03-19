window.addEventListener("load",call_method);
var width_old =0;
var height_old =0;
function call_method(){
    change_sidebar();
    link();
    deleteClassRow();
}
window.addEventListener("resize", function(){
    change_attr();
    deleteClassRow();
});

/*----Botón hamburguesa- Mobile ---*/
function link(){
    /* buscador-input*/
    var input = document.createElement("input");
    input.className="input_search";
    input.type="text";
    document.getElementsByClassName("search")[0].append(input);
    /* buscador-botón*/
    var btn=document.createElement("button");
    btn.className="button_search";
    btn.type="button";
    document.getElementsByClassName("search")[0].append(btn);
    /* buscador-imagen btn*/
    var img= document.createElement("img");
    img.className="img_search";
    img.src="img/search_mobile.png";
    document.getElementsByClassName("button_search")[0].append(img);
    /* links*/
    var name=["Futbol", "Baloncesto", "Tenis", "Ciclismo", "Motor", "eSports"];
    for(let i=0; i<name.length; i++){
        var node = document.createElement("a");
        node.href= change_user() + name[i].toLowerCase();
        node.className="nav-link nav-item header_links";
        node.text=name[i];
        document.getElementsByClassName("link_mobile")[0].append(node);
    }
    var a = document.createElement("a");
    var texta = document.createTextNode("Contacto");
    a.href=change_Contact();
    a.className="nav-link nav-item header_links";
    a.appendChild(texta);
    document.getElementsByClassName("link_mobile")[0].append(a);

}

function change_user(){
    var rol="sport_section_registered.html";
    var page=window.location.href;
    var ruta=page.split("/");
    var url=ruta[ruta.length-1];
    var file= url.split("?");
    file=file[0];
    if(file === "contact.html"||file === "signup.html"||file === "home.html"||file === "sport_section.html"||
       file === "login.html"||file === "new.html"||file === "filtered_news.html"){
        rol="sport_section.html";
    }
    rol+="?section=";
    return rol;
}


/*Método: Cambiar de dirección URL de contacto dependiendo donde se encuentra*/
function change_Contact(){
    var clase="contact_registered.html";
    var page=window.location.href;
    var ruta=page.split("/");
    var file=ruta[ruta.length-1];
    if(file === "contact.html"||file === "signup.html"||file === "home.html"||
       file === "login.html"||file === "new.html"){
        return "contact.html";
    } else if(file.split("?")[0] === "sport_section.html" || file.split("?")[0] === "filtered_news.html"){
        return"contact.html";
    }

    return clase;
}
/*Método: Cambiar el nombre de la clase dependiendo donde se encuentra*/
function change_sidebar(){
    var page=window.location.href;
    var ruta=page.split("/");
    var file=ruta[ruta.length-1];
    var clase=document.getElementById("side");
    if(file === "admin_users_panel.html"||file === "admin_comments_panel.html"||file === "admin_content_panel.html"||
    file === "new_registered.html"|| file === "writer_comments_panel.html"||file === "writer_content_panel.html"||
    file === "writer_create_news.html" || file ==="create_news.html" || file==="create_user.html"){
        clase.className="sidebar_admin col-sm-2";
    }
}
/*Método que cambiar el footer */
function change_attr(){
    var attri=document.getElementsByClassName("contain_row");
    var cuerpo=document.getElementsByClassName("cuerpo");
    var footer=document.getElementsByTagName("footer");
    reset(attri, cuerpo, footer);

    var height=window.innerHeight;
    var height_header= document.getElementsByClassName("headers")[0].offsetHeight;
    var height_section= document.getElementsByTagName("section")[0].offsetHeight;
    var height_footer= document.getElementsByTagName("footer")[0].offsetHeight;

    var height_bread=0;
    var page=window.location.href;
    var ruta=page.split("/");
    var file=ruta[ruta.length-1];
    if(file !=="home.html" && file !=="home_registered.html" && file!=="admin_users_panel.html"
    && file!=="admin_comments_panel.html" && file!=="admin_content_panel.html" && file!=="create_new.html" 
    && file!=="create_user.html" && file!=="writer_comments_panel.html" && file !=="writer_content_panel.html" 
    && file!=="writer_news_panel.html"){
        height_bread= document.getElementsByClassName("breadcrumbs_nav")[0].offsetHeight;
    }

    var height_body=height_bread+height_header+height_section+height_footer;

    var width_new=window.innerWidth;
    var width_body= document.getElementsByClassName("headers")[0].offsetWidth;

    
    /*Si de altura de pantalla es mas grande que lo que ocupa el body entero(header, breadcrumbs, section y footer)
    * OR
    * Si la anchura nueva es menor que la anterior sin importar la altura de la pantalla y del body entero
    */
    if(window.height_old!== 0 && window.width_old === width_new){
        height_body=window.height_old;
    }
    if(window.width_old!==0 && window.height_old=== height){
        width_body=window.width_old;
    }
    if((height>height_body && width_new>width_body)|| (height>= height_body && width_new>=width_body)){ 
        attri[0].style.height="80vh";
        cuerpo[0].style.paddingBottom="0%";
        footer[0].style.position="absolute";
        window.width_old=width_new;
        window.height_old=height_body;
    } else{
        attri[0].style.height="auto";
        cuerpo[0].style.paddingBottom="5%";
        footer[0].style.position="relative";
    }
}
/*Método auxiliar que resetea los estilos para el footer */
function reset(attri, cuerpo, footer){
    attri[0].style.height="auto";
    cuerpo[0].style.paddingBottom="0%";
    footer[0].style.position="relative";
}
/*Método que adapta las páginas de crear usuario, de registrarse y de perfil versión pc a tabler e móvil*/
function deleteClassRow(){
    var clase=document.getElementsByClassName("contain_row");
    var page=window.location.href;
    var ruta=page.split("/");
    var file=ruta[ruta.length-1].toLowerCase();
    var width=window.innerWidth;
    if((file==="create_user.html"||file==="signup.html" || file==="profile.html") && (width <=767 && width >=576)){
        clase[0].className="contain_row";
    }else{
        clase[0].className="contain_row row";
    }
}


