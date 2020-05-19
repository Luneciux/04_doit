var screen_main = document.querySelector('#screen_main');

var body = document.querySelector('body');
screen_main.style.display = 'none';
var logo_intro = document.createElement('div');
logo_intro.setAttribute('id', 'logo_intro');
var logo_intro_img = document.createElement('img');
logo_intro_img.setAttribute('src', 'images/logo.png');
logo_intro.appendChild(logo_intro_img);
body.appendChild(logo_intro);


setTimeout(function () {
    logo_intro.style.display = 'none';
    screen_main.style.display = 'block';
}, 1600);

var config = document.querySelector('#config');
var list_element = document.querySelector('#todo_display #todos_container');
var input_element = document.querySelector('#app input');
var btn_element = document.querySelector('#main_button');
var act_button_add = document.querySelector("#add_button");

var user_container_element = document.querySelector('#user_name');
var input_user_element = document.querySelector('#config input');
var btn_user_element = document.querySelector('#config a');
var act_button_add_user = document.querySelector("#config_button");

var act_button_remove_all = document.querySelector("#delete_all");
var app = document.querySelector("#app");
var tooltip = document.querySelector("#clear_all");

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];
var creation = JSON.parse(localStorage.getItem('creation')) || [];
var all_status = JSON.parse(localStorage.getItem('all_status')) || [];
var user = localStorage.getItem('user') || '';
var date = new Date();


if (screen.width >= 1000) {
    function render_todos () {
        list_element.innerHTML = '';
        todos.forEach((todo, pos) => {
            var border_style = document.createElement('div');
            border_style.setAttribute('class', 'border_style');

            var todo_element = document.createElement('li');
            todo_element.setAttribute('class', 'todo');

            var todo_text_span = document.createElement('p');
            todo_text_span.setAttribute('class', 'content');
            var todo_text = document.createTextNode(todo);
            todo_text_span.appendChild(todo_text);

            var creation_element = document.createElement('p');
            creation_element.setAttribute('class', 'creation');
            var creation_text = document.createTextNode('criado em ' + creation[pos]);
            creation_element.appendChild(creation_text);

            var link_element = document.createElement('a');
            link_element.setAttribute('href', 'javascript:void(0);');
            link_element.setAttribute('onclick', 'delete_todos(' + pos + ')');
            link_element.setAttribute('class', 'close');
            var link_content = document.createElement('img');
            link_content.setAttribute('src', 'images/close.svg');
            link_element.appendChild(link_content);

            var status_element = document.createElement('a');
            status_element.setAttribute('href', 'javascript:void(0);');
            status_element.setAttribute('class', 'status');
            status_element.setAttribute('onclick', 'change_menu_display(' + pos + ')');
            if (all_status[pos] == 'todo') {
                status_element.style.backgroundColor = '#FAEB6B';
            } else if (all_status[pos] == 'doing') {
                status_element.style.backgroundColor = '#9B84CD';
            } else if (all_status[pos] == 'doed') {
                status_element.style.backgroundColor = '#9FFF7D';
            }

            var status_element_menu_y = document.createElement('a');
            status_element_menu_y.setAttribute('href', 'javascript:void(0);');
            status_element_menu_y.setAttribute('class', 'status_element');
            status_element_menu_y.setAttribute('onclick', 'change_status(' + pos + ", 'y'" + ')');
            status_element_menu_y.setAttribute('onmouseover', 'show_tooltip_visibility(' + pos + ", 'y'" + ')');
            status_element_menu_y.setAttribute('onmouseout', 'hide_tooltip_visibility(' + pos + ", 'y'" + ')');
            status_element_menu_y.style.backgroundColor = '#FAEB6B';
            var tooltip_status = document.createElement('div');
            tooltip_status.setAttribute('class', 'tooltip_status');
            tooltip_status.setAttribute('id', 'tooltip_status_y_' + pos);
            var status_text = document.createTextNode('A fazer');
            var tooltip_status_text = document.createElement('span');
            tooltip_status_text.setAttribute('class', 'status_text');
            tooltip_status_text.appendChild(status_text);
            tooltip_status.appendChild(tooltip_status_text);
            status_element_menu_y.appendChild(tooltip_status);

            var status_element_menu_p = document.createElement('a');
            status_element_menu_p.setAttribute('href', 'javascript:void(0);');
            status_element_menu_p.setAttribute('class', 'status_element');
            status_element_menu_p.setAttribute('onclick', 'change_status(' + pos + ", 'p'" + ')');
            status_element_menu_p.setAttribute('onmouseover', 'show_tooltip_visibility(' + pos + ", 'p'" + ')');
            status_element_menu_p.setAttribute('onmouseout', 'hide_tooltip_visibility(' + pos + ", 'p'" + ')');
            status_element_menu_p.style.backgroundColor = '#9B84CD';
            var tooltip_status = document.createElement('div');
            tooltip_status.setAttribute('class', 'tooltip_status');
            tooltip_status.setAttribute('id', 'tooltip_status_p_' + pos);
            var status_text = document.createTextNode('Fazendo');
            var tooltip_status_text = document.createElement('span');
            tooltip_status_text.setAttribute('class', 'status_text');
            tooltip_status_text.appendChild(status_text);
            tooltip_status.appendChild(tooltip_status_text);
            status_element_menu_p.appendChild(tooltip_status);

            var status_element_menu_g = document.createElement('a');
            status_element_menu_g.setAttribute('href', 'javascript:void(0);');
            status_element_menu_g.setAttribute('class', 'status_element');
            status_element_menu_g.setAttribute('onclick', 'change_status(' + pos + ", 'g'" + ')');
            status_element_menu_g.setAttribute('onmouseover', 'show_tooltip_visibility(' + pos + ", 'g'" + ')');
            status_element_menu_g.setAttribute('onmouseout', 'hide_tooltip_visibility(' + pos + ", 'g'" + ')');
            status_element_menu_g.style.backgroundColor = '#9FFF7D';
            var tooltip_status = document.createElement('div');
            tooltip_status.setAttribute('class', 'tooltip_status');
            tooltip_status.setAttribute('id', 'tooltip_status_g_' + pos);
            var status_text = document.createTextNode('Feito');
            var tooltip_status_text = document.createElement('span');
            tooltip_status_text.setAttribute('class', 'status_text');
            tooltip_status_text.appendChild(status_text);
            tooltip_status.appendChild(tooltip_status_text);
            status_element_menu_g.appendChild(tooltip_status);

            var status_menu_element = document.createElement('div');
            status_menu_element.setAttribute('id', 'status_menu_' + pos);
            status_menu_element.setAttribute('class', 'status_menu');
            status_menu_element.style.display = 'none';
            status_menu_element.appendChild(status_element_menu_y);
            status_menu_element.appendChild(status_element_menu_p);
            status_menu_element.appendChild(status_element_menu_g);

            todo_element.appendChild(todo_text_span);
            todo_element.appendChild(link_element);
            todo_element.appendChild(creation_element);
            todo_element.appendChild(status_element);
            todo_element.appendChild(border_style);
            todo_element.appendChild(status_menu_element);
            list_element.appendChild(todo_element);    
        }); 
    }

    tooltip.style.display = 'none';

    delete_all.onmouseover = function () {
        tooltip.style.display = 'block';
    }

    delete_all.onmouseout = function () {
            tooltip.style.display = 'none';  
    }

    app.style.display = 'none';

    act_button_add.onclick = function () {
        input_element.value = '';
        if (app.style.display == 'none') {
            app.style.display = 'grid';
        } else if (app.style.display == 'grid') {
            app.style.display = 'none';  
        }
    }

    config.style.display = 'none';

    act_button_add_user.onclick = function () {
        if (config.style.display == 'none') {
            config.style.display = 'grid';
        } else if (config.style.display == 'grid') {
            config.style.display = 'none';  
        }
    }

    function show_tooltip_visibility (pos, status) {
        var tooltip_status = document.querySelector('#tooltip_status_' + status + '_' + pos);
        tooltip_status.style.display = 'grid';
    }

    function hide_tooltip_visibility (pos, status) {
        var tooltip_status = document.querySelector('#tooltip_status_' + status + '_' + pos);
        tooltip_status.style.display = 'none';
    }

    function change_status (pos, status) {
        if (status === 'y') {
            all_status[pos] = 'todo';
        } else if (status === 'p') {
            all_status[pos] = 'doing';
        } else if (status === 'g') {
            all_status[pos] = 'doed';
        }
    
        save_to_storage();
        render_todos();
    }

    function change_menu_display (pos) {
        var menu = document.querySelector('#status_menu_' + pos);
        
        if (menu.style.display == 'none') {
            menu.style.display = 'flex';
        } else if (menu.style.display == 'flex') {
            menu.style.display = 'none';
        }
    }

} else if (screen.width < 1000) {
    var config = document.querySelector('#config');
    var line = document.querySelector('#line_style_func');
    var settings = document.querySelector('.settings');
    var add = document.querySelector('.add');
    var functions = document.querySelector('.functions');
    functions.appendChild(config);
    functions.removeChild(settings);
    functions.removeChild(add);
    functions.removeChild(line);
    var contn = document.querySelector('.container');
    contn.appendChild(app);

    var delete_text = document.createTextNode('Deletar Tudo');
    var delete_text_p = document.createElement('p');
    delete_text_p.appendChild(delete_text);

    var delete_div = document.querySelector('.delete_all');
    delete_div.removeChild(tooltip);
    delete_div.appendChild(delete_text_p);

    var footer = document.querySelector('footer');
    var screen_opacity = document.querySelector('#screen_opacity');
    screen_opacity.removeChild(footer);
    
    var aside = document.querySelector('aside');
    aside.style.display = 'none';

    var config_button = document.createElement('div');
    var config_button_img = document.createElement('img');
    config_button_img.setAttribute('src', 'images/settings.svg');
    config_button.appendChild(config_button_img);
    config_button.setAttribute('id', 'config_show');
    contn.appendChild(config_button);

    config_button.onclick = function () {
        if (aside.style.display == 'none') {
            aside.style.display = 'grid';
        } else if (aside.style.display == 'grid') {
            aside.style.display = 'none';
        }
    }

    var status_menu = document.createElement('div');
    status_menu.setAttribute('id', 'status_menu');
    status_menu.style.display = 'none';

    var status_menu_element_y = document.createElement('a');
    status_menu_element_y.setAttribute('href', 'javascript:void(0);');
    status_menu_element_y.setAttribute('class', 'status_m');
    status_menu_element_y.setAttribute('onclick', "change_status('y')");
    status_menu_element_y.style.backgroundColor = '#FAEB6B';

    var status_menu_element_p = document.createElement('a');
    status_menu_element_p.setAttribute('href', 'javascript:void(0);');
    status_menu_element_p.setAttribute('class', 'status_m');
    status_menu_element_p.setAttribute('onclick', "change_status('p')");
    status_menu_element_p.style.backgroundColor = '#9B84CD';

    var status_menu_element_g = document.createElement('a');
    status_menu_element_g.setAttribute('href', 'javascript:void(0);');
    status_menu_element_g.setAttribute('class', 'status_m');
    status_menu_element_g.setAttribute('onclick', "change_status('g')");
    status_menu_element_g.style.backgroundColor = '#9FFF7D';

    status_menu.appendChild(status_menu_element_y);
    status_menu.appendChild(status_menu_element_p);
    status_menu.appendChild(status_menu_element_g);

    contn.appendChild(status_menu);


    function render_todos () {
        list_element.innerHTML = '';
        todos.forEach((todo, pos) => {
            var border_style = document.createElement('div');
            border_style.setAttribute('class', 'border_style');

            var todo_element = document.createElement('li');
            todo_element.setAttribute('class', 'todo');

            var todo_text_span = document.createElement('p');
            todo_text_span.setAttribute('class', 'content');
            var todo_text = document.createTextNode(todo);
            todo_text_span.appendChild(todo_text);

            var creation_element = document.createElement('p');
            creation_element.setAttribute('class', 'creation');
            var creation_text = document.createTextNode('criado em ' + creation[pos]);
            creation_element.appendChild(creation_text);

            var link_element = document.createElement('a');
            link_element.setAttribute('href', 'javascript:void(0);');
            link_element.setAttribute('onclick', 'delete_todos(' + pos + ')');
            link_element.setAttribute('class', 'close');
            var link_content = document.createElement('img');
            link_content.setAttribute('src', 'images/close.svg');
            link_element.appendChild(link_content);

            var status_element = document.createElement('a');
            status_element.setAttribute('href', 'javascript:void(0);');
            status_element.setAttribute('class', 'status');
            status_element.setAttribute('onclick', 'change_menu_display(' + pos +')');
            if (all_status[pos] == 'todo') {
                status_element.style.backgroundColor = '#FAEB6B';
            } else if (all_status[pos] == 'doing') {
                status_element.style.backgroundColor = '#9B84CD';
            } else if (all_status[pos] == 'doed') {
                status_element.style.backgroundColor = '#9FFF7D';
            }

            todo_element.appendChild(todo_text_span);
            todo_element.appendChild(link_element);
            todo_element.appendChild(creation_element);
            todo_element.appendChild(status_element);
            todo_element.appendChild(border_style);
            list_element.appendChild(todo_element);    
        }); 
    }

    function change_status (status) {
        var id = document.querySelector('#todo_id');
        pos = id.value;
        if (status === 'y') {
            all_status[pos] = 'todo';
        } else if (status === 'p') {
            all_status[pos] = 'doing';
        } else if (status === 'g') {
            all_status[pos] = 'doed';
        }
    
        save_to_storage();
        render_todos();

    }

    var id = document.createElement('input');
    id.setAttribute('type', 'text');
    id.setAttribute('id', 'todo_id');
    id.style.display = 'none';

    function change_menu_display (pos) {
        id.value = pos;
        body.appendChild(id);
        var menu = document.querySelector('#status_menu');
        if (menu.style.display == 'none') {
            menu.style.display = 'flex';
        } else if (menu.style.display == 'flex') {
            menu.style.display = 'none';
        }
    }
}

render_todos();

function render_user () {
    user_container_element.innerHTML = '';
    var user_name = document.createTextNode(user);
    user_container_element.appendChild(user_name);
}

render_user();

function add_todos () {
    var new_todo_text = input_element.value;
    todos.push(new_todo_text);
    input_element.value = '';

    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var creation_date = dia + '/' + mes;
    creation.push(creation_date);

    var status = 'todo';
    all_status.push(status);

    save_to_storage();
    render_todos();
}

function add_user () {
    user = input_user_element.value;

    save_user_to_storage();
    render_user();
}

btn_element.onclick = add_todos;

btn_user_element.onclick = add_user;

delete_all.onclick = delete_all_todos;

input_element.onkeypress = function (event) {
    if (event.keyCode === 13) {
        add_todos();
    }
}

input_user_element.onkeypress = function (event) {
    if (event.keyCode === 13) {
        add_user();
    }
}

function delete_todos(pos){
    todos.splice(pos, 1);
    creation.splice(pos, 1);
    all_status.splice(pos, 1);

    save_to_storage();
    render_todos();
}

function delete_all_todos(){
    todos = [];
    creation = [];
    all_status = [];
    save_to_storage();
    render_todos();
}

function save_to_storage(){
    localStorage.setItem('list_todos', JSON.stringify(todos));
    localStorage.setItem('creation', JSON.stringify(creation));
    localStorage.setItem('all_status', JSON.stringify(all_status));
}

function save_user_to_storage(){
    localStorage.setItem('user', user);
}
