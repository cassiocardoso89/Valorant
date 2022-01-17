(function () {
    'use strict';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './source/data.json');
        xhr.onload = function () {
            var resposta = JSON.parse(xhr.responseText);
            var agentesObj = resposta.data.agents;

            //lista inicial
                var containerAgentesJSON = document.querySelector('.containerAgentesJSON');
                containerAgentesJSON.innerHTML = `
                    <div class="addAgente">
                    <h1>+</h1>
                        fazer aqui o adicionar os agentes
                    </div>`;
                agentesObj.forEach(function (agente) {
                var agenteHTML = `
                <div class="personagem">
                    <div class="personagem-img">
                        <img class="agentesImg" src="${agente.image}" alt="${agente.name}">
                        <div class="agentesNomeBG">
                            <figcaption class="agentesNome">${agente.name}</figcaption>
                        </div>
                    </div>
                </div>
            `;
            containerAgentesJSON.innerHTML += agenteHTML;
        });
        containerAgentesJSON.innerHTML += `
            <div class="addAgente">
                <h1>Ver Todos</h1>
            </div>
        `;

            //modal
            var modelBg = document.querySelector('.modal-bg-json');
            var agentes = document.querySelectorAll('.agentesNome'); //equivalente ao modal-btn dele
            agentes.forEach(function (agente) {
                agente.addEventListener('click', function () {
                    var nome = agente.textContent;
                    console.log(nome);
                    var agenteObj = agentesObj.find(function (agente) {
                        return agente.name == nome;
                    });
                    modelBg.classList.add('bg-active');

                    var nomeHTML = document.querySelector('.nome');
                    nomeHTML.textContent = agenteObj.name;

                    var funcaoHTML = document.querySelector('.function');
                    funcaoHTML.textContent = agenteObj.function;

                    var descriptionHTML = document.querySelector('.description');
                    descriptionHTML.textContent = agenteObj.description;

                    //tabela de skills
                    var skillsHTML = document.querySelector('.skills');
                    skillsHTML.innerHTML = '';
                    var skillName = '';
                    agenteObj.skills.forEach(function (skill) {
                        switch (skill.type) {
                            case 1:
                                skillName = 'Arma Branca';
                                break;
                            case 2:
                                skillName = 'Arma Primaria';
                                break;
                            case 3:
                                skillName = 'Arma Secundaria';
                                break;
                            case 4:
                                skillName = 'Arma Especial';
                                break;
                            default:
                        }
            
                        var skillHTML = `
                        <tr>
                            <td>${skillName}</td>
                            <td class="skillDano">${skill.damage} Dano</td>
                        </tr>
                        `;
                        skillsHTML.innerHTML += skillHTML;
                    });

                    var imagemHTML = document.querySelector('.imagem');
                    imagemHTML.src = agenteObj.image;

                    var btnFechar = document.querySelector('.btnFechar');
                    btnFechar.addEventListener('click', function () {
                        modelBg.classList.remove('bg-active');
                    });
                });
            });
        };
        xhr.send();
})();