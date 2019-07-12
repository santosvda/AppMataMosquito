//Definindo a dimensão do palco do jogo - width e height!!
var altura = 0 
var largura = 0
var vidas = 1
var tempo = 10

	//RECUPERA O NIVEL DE DIFICULDADE PASSADO COMO PARAMETRO
	var criaMosquitoTempo = 1500
	//search retorna tudo após o ?
	var nivel = window.location.search
	//substiui o caracter por outro no caso vai substituir ? por um caracter vazio
	nivel.replace('?','')

	if (nivel == 'normal') {
		criaMosquitoTempo = 1500
	}
	else if (nivel == 'dificil') {
		criaMosquitoTempo = 1000
	}
	else if (nivel == 'jonhwick') {
		criaMosquitoTempo = 750
	}

//Ajusta altura e largura sempre que o tamanho do disply é alterado
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//ADICIONANDO CRONOMETRO
var cronometro = setInterval(function(){

	tempo -=1
	if (tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = "vencer.html"
	}
	else{
		//innerHTML = valor contido entre as TAGS
		document.getElementById('cronometro').innerHTML = tempo
	}
	
},1000)

//CRIANDO POSIÇÕES RANDOMICAS PARA AS MOSCAS
function posicaoRandomica(){

	//remover o mosquito anterio caso exista
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//Controlando os pontos de vida
		if (vidas<3) {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
			vidas++
		}
		else{
			window.location.href = "fim_jogo.html"
		}
	}

	var posicaox = Math.floor(Math.random() * largura) - 90
	var posicaoy = Math.floor(Math.random() * altura) - 90

	posicaox = posicaox < 0 ? 0 : posicaox
	posicaoy = posicaoy < 0 ? 0 : posicaoy

	console.log(posicaox,posicaoy)

	//cria o elemente html
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaox + 'px'
	mosquito.style.top = posicaoy + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'

	//Remove o mosquito ao clicar
	mosquito.onclick = function(){
		this.remove()
	}

	document.body.appendChild(mosquito)
}

//CRIANDO TAMANHOS RANDOMICOS
function tamanhoAleatorio(){
	var classe = Math.floor(Math.random()*3) + 1
	//console.log(classe)
	return 'mosquito' + classe.toString()
}

//LADOS RANDOMICOS
function ladoAleatorio(){
	var classe = Math.floor(Math.random()*2)
	
	switch(classe){
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
	}
}

