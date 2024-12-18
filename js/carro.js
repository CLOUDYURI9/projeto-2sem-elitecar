async function enviaFormulario() {
    const carroDTO = {
        "marca": document.querySelectorAll("input")[0].value,
        "modelo": document.querySelectorAll("input")[1].value,
        "ano": Number(document.querySelectorAll("input")[2].value),
        "cor": document.querySelectorAll("input")[3].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/carro", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(carroDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o respostaServidor. Contate o administrador do sistema");
        }
    
        alert("Carro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaCarros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/carros");

        if(!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeCarros = await respostaServidor.json();

        criarTabelaCarros(listaDeCarros)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaCarros(carros) {
    const tabela = document.getElementById('corpoCarro');

    carros.forEach(carro => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = carro.idCarro; // Preenche com o ID do carro
        

        const marca = document.createElement('td');
        marca.textContent = carro.marca; // Preenche com a Marca do carro
       

        const modelo = document.createElement('td');
        modelo.textContent = carro.modelo; // Preenche com o Modelo do carro
        
        const ano = document.createElement('td');
        ano.textContent = carro.ano; // Preenche com o Ano do carro
       

        const cor = document.createElement('td');
        cor.textContent = carro.cor; // Preenche com a Cor do carro
        

        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade
        
        
        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade
        iconExcluir.addEventListener('click', () => excluirCarro(carro.idCarro));
        


        //chamando
        linha.appendChild(id);
        linha.appendChild(marca);
        linha.appendChild(modelo);
        linha.appendChild(ano);
        linha.appendChild(cor);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        linha.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);
        
    });
    
    async function excluirCarro(idCarro) {
        const url = `http://localhost:3333/delete/carro/${idCarro}`;
    
        try {
            const response = await fetch(url, { method: 'DELETE' });
    
            if (response.ok) {
                alert('Carro removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o carro.');
        }
    }
    
}