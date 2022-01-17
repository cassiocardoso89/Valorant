(function () {
    'use strict';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './source/data.json');
    xhr.onload = function () {
        var resposta = JSON.parse(xhr.responseText);
        var mapasJson = resposta.data.maps;
        
        //lista inicial
        var container = document.querySelector('.containerMapas');
        container.innerHTML = '';
        mapasJson.forEach(function (mapa) {
            var mapaHTML = `
            <img class="mapaImg" src="${mapa}"></img> 
            `;
            container.innerHTML += mapaHTML;
        });
        
        //modal
        var modelBg = document.querySelector('.modalMapaBG');
        var mapas = document.querySelectorAll('.mapaImg'); //equivalente ao modal-btn dele
        mapas.forEach(function (mapa) {
            mapa.addEventListener('click', function () {
                modelBg.classList.add('bg-active');
                var imagemMapaHTML = document.querySelector('.imagemMapa');
                imagemMapaHTML.src = mapa.src;
            });
        });
        
        //fechar modal
        var closeBtn = document.querySelector('.btnFecharMapas');
        closeBtn.addEventListener('click', function () {
            modelBg.classList.remove('bg-active');
        });
        
    };
    xhr.send();
})();