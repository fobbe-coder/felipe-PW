
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const errorMessage = document.getElementById('error-message');


let users = [];


function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        // Usuário padrão para demonstração
        users = [
            { username: 'admin', password: '123456' },
            { username: 'user', password: 'user123' }
        ];
        saveUsers();
    }
}


function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}


function checkLoggedUser() {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
        window.location.href = 'index.html';
    }
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}


toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.textContent = 'Entrar';
        formSubtitle.textContent = 'Faça login para acessar o sistema';
        toggleText.innerHTML = 'Não tem conta? <a href="#" id="toggle-link">Cadastre-se</a>';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.textContent = 'Cadastrar';
        formSubtitle.textContent = 'Crie sua conta para acessar';
        toggleText.innerHTML = 'Já tem conta? <a href="#" id="toggle-link">Faça login</a>';
    }
    
    // Atualizar referência ao link
    document.getElementById('toggle-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms();
    });
});


function toggleForms() {
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.textContent = 'Entrar';
        formSubtitle.textContent = 'Faça login para acessar o sistema';
        toggleText.innerHTML = 'Não tem conta? <a href="#" id="toggle-link">Cadastre-se</a>';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.textContent = 'Cadastrar';
        formSubtitle.textContent = 'Crie sua conta para acessar';
        toggleText.innerHTML = 'Já tem conta? <a href="#" id="toggle-link">Faça login</a>';
    }
    
   
    const newToggleLink = document.getElementById('toggle-link');
    if (newToggleLink) {
        newToggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms();
        });
    }
}


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const remember = document.getElementById('remember').checked;
    
    
    const userFound = users.find(u => u.username === username && u.password === password);
    
    if (userFound) {
       
        localStorage.setItem('loggedUser', username);
        
        if (remember) {
            localStorage.setItem('rememberUser', username);
        }
        
        
        window.location.href = 'index.html';
    } else {
        showError('Usuário ou senha incorretos!');
    }
});


registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const regUsername = document.getElementById('reg-username').value.trim();
    const regPassword = document.getElementById('reg-password').value.trim();
    const regConfirmPassword = document.getElementById('reg-confirm-password').value.trim();
    
    
    if (regUsername.length < 3) {
        showError('O usuário deve ter pelo menos 3 caracteres!');
        return;
    }
    
    if (regPassword.length < 4) {
        showError('A senha deve ter pelo menos 4 caracteres!');
        return;
    }
    
    if (regPassword !== regConfirmPassword) {
        showError('As senhas não conferem!');
        return;
    }
    
    
    const userExists = users.find(u => u.username === regUsername);
    if (userExists) {
        showError('Este usuário já existe!');
        return;
    }
    
    
    users.push({ username: regUsername, password: regPassword });
    saveUsers();
    
    
    alert('Usuário cadastrado com sucesso! Faça login.');
    toggleForms();
    
    
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm-password').value = '';
});


function fillRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}


loadUsers();
checkLoggedUser();
fillRememberedUser();
