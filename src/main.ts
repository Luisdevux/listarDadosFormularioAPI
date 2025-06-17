import './style.css'

const listagemDiv = document.querySelector<HTMLSelectElement>('.form-conteudo > div')!;

const api = 'http://localhost:3000/usuarios';

// Script para dark mode da página
function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("dark");
};

(window as any).toggleMode = toggleMode;

// Obter dados do formulário de cadastro
async function obterUsuarios() {
  const resposta = await fetch(api);

  if(!resposta.ok){
    throw new Error('Erro ao listar usuários.')
  }

  return resposta.json();
};

// Listagem
function listarDados(dados: any) {
  listagemDiv.innerHTML = `
    <ul class="usuarios-lista">
      ${dados.map(usuario => `
          <li class="usuario-item">
          <p><strong>Nome:</strong> ${usuario.nome}</p>
          <p><strong>Email:</strong> ${usuario.email}</p>
          <p><strong>Sexo:</strong> ${usuario.sexo}</p>
          <p><strong>Endereço:</strong> ${usuario.logradouro}, ${usuario.numero}, ${usuario.bairro}</p>
          <p><strong>Cidade/UF:</strong> ${usuario.cidade} - ${usuario.estado}</p>
          <p><strong>CEP:</strong> ${usuario.cep}</p>
          <p><strong>Curso:</strong> ${usuario.curso}</p>
          ${usuario.observacoes ? `<p><strong>Observações:</strong> ${usuario.observacoes}</p>` : ''}
        </li>
      `).join('')}
    </ul>
  `;
};

obterUsuarios()
  .then(listarDados)
  .catch(erro => {
    if(listagemDiv) listagemDiv.textContent = `Erro: ${erro.message}`
});