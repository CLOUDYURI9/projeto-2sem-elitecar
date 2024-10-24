function enviarDados(){

    const carroDTO = {
        "nome": document.getElementById('nome-carro').value,
        "modelo": document.getElementById('modelo').value,
        "ano": document.getElementById('ano-de-fabricacao').value,
        "cor": document.getElementById('cor').value
    }

    fetch('http://localhost:3333/enviar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carroDTO),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Dados enviados com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}
