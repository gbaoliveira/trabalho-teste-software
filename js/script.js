function login(){
    const email = document.querySelector('.email').value;
    const senha = document.querySelector('.senha').value;
    const login = "aluno@estudante.sesisenai.org.br"
    const senhalogin = "123"

    if(login == email && senha == senhalogin){
        location.href = "home.html"
    }else{
        alert("Login desconhecido!")
    }
}

function EsconderSenha() {
    var x = document.getElementById("senha");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

