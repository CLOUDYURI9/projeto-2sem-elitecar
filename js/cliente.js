async function enviaFormulario() {
    const clienteDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "cpf": document.querySelectorAll("input")[1].value,
        "telefone": document.querySelectorAll("input")[2].value,
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/cliente", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o respostaServidor. Contate o administrador do sistema");
        }
    
        alert("Cliente cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaClientes() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/cliente");

        if(!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeClientes = await respostaServidor.json();
        console.log(listaDeClientes)
        criarTabelaClientes(listaDeClientes)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaClientes(clientes) {
    const tabela = document.getElementById('corpoCliente');

    clientes.forEach(cliente => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = cliente.idCliente; // Preenche com o ID do carro
        

        const nome = document.createElement('td');
        nome.textContent = cliente.nome; // Preenche com a Marca do carro
       

        const cpf = document.createElement('td');
        cpf.textContent = cliente.cpf; // Preenche com o Modelo do carro
        
        const telefone = document.createElement('td');
        telefone.textContent = cliente.telefone; // Preenche com o Ano do carro
       

        

        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade
        
        
        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.addEventListener('click', () => excluirCliente(cliente.idCliente));
        iconExcluir.id = 'excluir';
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade
       
        


        //chamando
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(cpf);
        linha.appendChild(telefone);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        linha.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);
        
    });

    async function excluirCliente(idCliente) {
        const url = `http://localhost:3333/delete/cliente/${idCliente}`;
    
        try {
            const response = await fetch(url, { method: 'DELETE' });
    
            if (response.ok) {
                alert('Cliente removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o cliente.');
        }
    }
    

}