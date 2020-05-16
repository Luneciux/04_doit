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
        link_content.setAttribute('src', '../images/close.svg');
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
        status_element_menu_y.style.backgroundColor = '#FAEB6B';

        var status_element_menu_p = document.createElement('a');
        status_element_menu_p.setAttribute('href', 'javascript:void(0);');
        status_element_menu_p.setAttribute('class', 'status_element');
        status_element_menu_p.setAttribute('onclick', 'change_status(' + pos + ", 'p'" + ')');
        status_element_menu_p.style.backgroundColor = '#9B84CD';

        var status_element_menu_g = document.createElement('a');
        status_element_menu_g.setAttribute('href', 'javascript:void(0);');
        status_element_menu_g.setAttribute('class', 'status_element');
        status_element_menu_g.setAttribute('onclick', 'change_status(' + pos + ", 'g'" + ')');
        status_element_menu_g.style.backgroundColor = '#9FFF7D';

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

btn_element.onclick = add_todos;

btn_user_element.onclick = add_user;

delete_all.onclick = delete_all_todos;

tooltip.style.display = 'none';

delete_all.onmouseover = function () {
    tooltip.style.display = 'block';
}

delete_all.onmouseout = function () {
        tooltip.style.display = 'none';  
}

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

app.style.display = 'none';

act_button_add.onclick = function () {
    input_element.value = '';
    if (app.style.display == 'none') {
        app.style.display = 'grid';
    } else if (app.style.display == 'grid') {
        app.style.display = 'none';  
    }
}


input_user_element.onblur = function () {
    config.style.display = 'none';
}

config.style.display = 'none';

act_button_add_user.onclick = function () {
    if (config.style.display == 'none') {
        config.style.display = 'grid';
    } else if (config.style.display == 'grid') {
        config.style.display = 'none';  
    }
}

function change_menu_display (pos) {
    var menu = document.querySelector('#status_menu_' + pos);
    
    if (menu.style.display == 'none') {
        menu.style.display = 'flex';
    } else if (menu.style.display == 'flex') {
        menu.style.display = 'none';
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
