// --------------------------
// CARRINHO
// --------------------------

function addToCart(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let lista = document.getElementById("listaCarrinho");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((item, idx) => {
        total += item.preco;

        lista.innerHTML += `
            <div>
                <strong>${item.nome}</strong> — R$ ${item.preco.toFixed(2)}
                <button onclick="remover(${idx})">Remover</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function remover(i) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    carrinho.splice(i, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

// --------------------------
// LOGIN
// --------------------------

function cadastrar() {
    let email = document.getElementById("cad-email").value;
    let senha = document.getElementById("cad-senha").value;

    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    alert("Cadastro concluído!");
    window.location.href = "login.html";
}

function login() {
    let email = document.getElementById("login-email").value;
    let senha = document.getElementById("login-senha").value;

    if (email === localStorage.getItem("email") &&
        senha === localStorage.getItem("senha")) {

        localStorage.setItem("logado", "sim");
        window.location.href = "index.html";
    } else {
        alert("Email ou senha incorretos!");
    }
}

// --------------------------
// FINALIZAR COMPRA
// --------------------------

function finalizarCompra() {
    let endereco = document.getElementById("endereco").value;
    if (!endereco) {
        alert("Digite o endereço!");
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({
        data: new Date().toLocaleString(),
        endereco: endereco,
        itens: carrinho
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.removeItem("carrinho");

    alert("Compra finalizada!");
    window.location.href = "pedidos.html";
}

// --------------------------
// EXIBIR PEDIDOS
// --------------------------

function carregarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let box = document.getElementById("listaPedidos");

    pedidos.forEach(p => {
        box.innerHTML += `
            <div>
                <h3>Pedido em ${p.data}</h3>
                <p><strong>Endereço:</strong> ${p.endereco}</p>
                <ul>
                    ${p.itens.map(i => `<li>${i.nome} — R$ ${i.preco}</li>`).join("")}
                </ul>
            </div>
            <hr>
        `;
    });
}
