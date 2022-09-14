/*
	Downloaded from https://codezips.com/download/car-racing-game-in-javascript-with-source-code/
	Updated By WIMS-Cardano 2022-09-14
	Author: Bernard Sibanda
	Purpose: Teaching WIMS-Cardano Girls IT Education
	- adapted for teaching Html, js, css and Cardano ecosystem
	Open Source license : MIT Licence.
*/

const speedDash = document.querySelector('.speedDash');

const scoreDash = document.querySelector('.scoreDash');

const lifeDash = document.querySelector('.lifeDash');

const container = document.getElementById('container');

const btnStart = document.querySelector('.btnStart');

btnStart.addEventListener('click',startGame);

document.addEventListener('keydown',pressKeyOn);

document.addEventListener('keyup',pressKeyOff); 

const walletList = ["CardWallet","LedgerNano","Daedalus","Trezor","Nami","GeroWallet","Flint","Typhon","Ellipal","AdaLite","Atomic","Guarda","NuFi","Yoroi","Exodus","GameChanger","WIMS-Cardano"];

const hardForksList = ["Byron","Shelly","Goguen","Basho","Voltaire","Mary","Alonzo","Vasil","Tangocrypto","Dbsync"];

const devToolsList = ["Haskell","Tangocrypto","Dbsync","Plutus","Marlowe","Lucid","Blockfrost","Glow","Dandelion"];

const shellyList = ["decentralization","delegation","staking","pools"];

const byronList = ["Daedalus","AdaLoveless","Yoroi","NodeFederation"];

const goguenList = ["SmartContracts","dApps","Plutus","Marlowe","Tokens","FNT"];

const bashoList = ["Scaling","Interoperability","SideChains"];

const voltaireList = ["Voting","Treasury","Staking","Delegation","CIPS"];

const maryList = ["NativeTokens","Multi-Assets","Token-Registry"];

const vasilList = ["Reference-Inputs","Inline-Datum","Reference-Scripts","Explicit-Collateral","Hydra-Integration","Diffusion-Pipelining","Concurrency","Enterprise-Blockchain"];

var listTypes = walletList; 

const sound = './sound/a.mp3';

const crash = './sound/c1.wav';

let animationGame; 

let gamePlay = false;

let myWallet;
 
let keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft: false,
    ArrowRight: false
}
	var audio = new Audio(sound);
	
function playSound()
{	audio.play();
}

function stopSound()
{
	audio.stop();
}
function selectList(e)
{
	var val = e.value;
	
	console.log(val);
	
	switch(val)
	{
		case "walletList" : listTypes = walletList; break;
		case "hardForksList" : listTypes = hardForksList; break;
		case "devToolsList" : listTypes = devToolsList; break;
		case "shellyList" : listTypes = shellyList; break;
		case "byronList" : listTypes = byronList; break;
		case "bashoList" : listTypes = bashoList; break;
		case "goguenList" : listTypes = goguenList; break;
		case "voltaireList" : listTypes = voltaireList; break;
		case "maryList" : listTypes = maryList; break;
		case "vasilList" : listTypes = vasilList; break;
		default :listTypes = walletList;		
	}

	console.log(listTypes);
}

function startGame() {
	playSound();	
    console.log('...game started');
    container.innerHTML ='';
    btnStart.innerHTML = "Stop Game";
	btnStart.addEventListener('click',stopGame);
	
    var div = document.createElement('div');
    div.setAttribute('class','pWallet');
    div.x = 250;
    div.y = 500;
	
    container.appendChild(div);
    gamePlay = true;
    animationGame = requestAnimationFrame(playGame);
	
    myWallet ={
        ele:div,
        speed:0,
        lives:10,
        gameScore:0,
        carstoPass:20,
        score :0,
        roadwidth:800,
        gameEndCounter:0
    }

    startBoard();
    createWallets(listTypes);
	
}

function stopGame() {
	gamePlay = false;
	stopSound();
    location.reload();
}

function createWallets(w){
	
	console.log(w);
	
    for(let x =0; x<w.length; x++)
    {
        let wElem = w[x];
		console.log(wElem);
        let div = document.createElement('div');
        div.innerHTML = w[x];
        div.setAttribute('class','classWallet');
        div.setAttribute('id',wElem);
        createWalletElement(div);
        container.appendChild(div);
    }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ('0'+String(hex)).substr(-2);
    }
    return '#'+c()+c()+c();
}

function createWalletElement(e){
    let tempRoad = document.querySelector('.road');
    e.style.left = tempRoad.offsetLeft + Math.ceil(Math.random()*tempRoad.offsetWidth)-30+'px';
    e.style.top = Math.ceil(Math.random()*-600)+'px';
    e.speed = Math.ceil(Math.random()*17)+2;
    e.style.backgroundColor = randomColor();
}

function startBoard(){
        let div = document.createElement('div');
        div.setAttribute('class','road');
        div.style.top = 50+'px';
        div.style.width = 100+'%';
        container.appendChild(div);

}

function pressKeyOn(event){
    event.preventDefault();
    keys[event.key]=true;
}

function pressKeyOff(event){
    event.preventDefault();
    keys[event.key]=false;
}

function updateDash(){
	let speed_ = Math.round(myWallet.speed*10);
    scoreDash.innerHTML = myWallet.score;
    lifeDash.innerHTML = myWallet.lives;
    speedDash.innerHTML = speed_;

}

function moveRoad(){
    let tempRoad = document.querySelectorAll('.road');
    let previousRoad = tempRoad[0].offsetLeft;
    let previousWidth = tempRoad[0].offsetWidth;
    const pSpeed = Math.floor(myWallet.speed);
    for(let x=0; x<tempRoad.length; x++)
    {
        let num = tempRoad[x].offsetTop + pSpeed;
        if(num>600){
            num = num - 650;
            let mover = previousRoad + (Math.floor(Math.random()*6)-3);
            let roadWidth = (Math.floor(Math.random()*11)-5)+previousWidth;
            if(roadWidth<1)
			{
				roadWidth=1;
			}
			else{
				roadWidth=90+'%';
			}
	
            if(mover<100)mover=100;
            if(mover>600)mover=600;
            tempRoad[x].style.left = 1+'px';//mover
            tempRoad[x].style.width = roadWidth + 'px';
            previousRoad = tempRoad[x].offsetLeft;
             previousWidth = tempRoad[x].width;
			 
			 
        }
        tempRoad[x].style.top = num + 'px';
		
		
    }
    return {'width':previousWidth,'left':previousRoad};
}

function isCollide(a,b){
    let aRect =a.getBoundingClientRect();
    let bRect =b.getBoundingClientRect();
	let collided = (
        (aRect.bottom < bRect.top)||
        (aRect.top > bRect.bottom)||
        (aRect.right <bRect.left)||
        (aRect.left > bRect.right)
    );
	
	if(!collided)
	{		
		stopGame;
	}
	
    return !collided;
}

function wallets(){
    let elemWallet = document.querySelectorAll('.classWallet');
    for(let i=0; i<elemWallet.length; i++)
    {   
        for(let ii=0; ii<elemWallet.length; ii++)
        {
            if(i!=ii && isCollide(elemWallet[i],elemWallet[ii]))
            {
                elemWallet[ii].style.top = (elemWallet[ii].offsetTop + 50)+'px';
                elemWallet[i].style.top = (elemWallet[i].offsetTop - 50)+'px';
                elemWallet[ii].style.left = (elemWallet[ii].offsetLeft - 50)+'px';
                elemWallet[i].style.left = (elemWallet[i].offsetLeft + 50)+'px';
            }
        }

        let y = elemWallet[i].offsetTop + myWallet.speed - elemWallet[i].speed;
        if(y>2000 || y<-2000){
            //reset car
            if(y>2000)
            {
                myWallet.score++;
                if(myWallet.score > myWallet.carstoPass)
                {
                    gameOverPlay();
                }
            }
            createWalletElement(elemWallet[i]);
        }else{
            elemWallet[i].style.top = y + 'px';
            let hitCar = isCollide(elemWallet[i],myWallet.ele);
            console.log(hitCar);
            if(hitCar){
                myWallet.speed =0;
                myWallet.lives--;
                if(myWallet.lives<1)
                {
                    //gameover
                myWallet.gameEndCounter = 1;
                }
                createWalletElement(elemWallet[i]);
            }
        }
    }
}

function gameOverPlay()
{
    let div = document.createElement('div');
    div.setAttribute('class','road');
    div.style.top = '0px';
    div.style.width = '100%';
    div.style.backgroundColor = 'orange';
    div.innerHTML = 'FINISH';
    div.style.fontSize = '3em';
    let div2 = document.createElement('div');
    div2.setAttribute('class','road');
    div2.style.top = '300px';
    div2.style.width = '250px';
    div2.style.backgroundColor = 'red';
    div2.innerHTML = 'You Won!';
    div2.style.fontSize = '3em';
    container.appendChild(div);
    container.appendChild(div2);
    myWallet.gameEndCounter =12;
    myWallet.speed =0;
}

function playGame(){
    
    if(gamePlay){
    updateDash();
    let roadPara=moveRoad();
    wallets();
    if(keys.ArrowUp)
    {   if(myWallet.ele.y>400)
        myWallet.ele.y -=  1;
        myWallet.speed = myWallet.speed <20 ? (myWallet.speed+0.05):20;
    }
    if(keys.ArrowDown)
    {   if(myWallet.ele.y<500)
        {myWallet.ele.y +=  1;}
        myWallet.speed = myWallet.speed>0?(myWallet.speed-0.2):0;
    }
    if(keys.ArrowRight)
    {
        myWallet.ele.x += (myWallet.speed/4);
    }
    if(keys.ArrowLeft)
    {
        myWallet.ele.x -= (myWallet.speed/4);
    }
    if((myWallet.ele.x + 40)<roadPara.left || (myWallet.ele.x)>(roadPara.left + roadPara.width))
    {   if(myWallet.ele.y <500)myWallet.ele.y += +1;
        myWallet.speed = myWallet.speed >0?(myWallet.speed-0.2):5;
    }

    myWallet.ele.style.top = myWallet.ele.y+'px';
    myWallet.ele.style.left = myWallet.ele.x+'px';
    }
    animationGame = requestAnimationFrame(playGame);
    if(myWallet.gameEndCounter>0)
    {
        myWallet.gameEndCounter--;
        myWallet.y = (myWallet.y >60)?myWallet.y-30:60;
        if(myWallet.gameEndCounter ==0)
        {
            gamePlay = false;
            if(myWallet.lives<1)
            {
				let losediv = document.createElement('div');
				losediv.setAttribute('class','road');
				losediv.style.top = '500px';
				losediv.style.backgroundColor ='red';
				losediv.style.width = '250px';
				losediv.innerHTML = 'You Lose!';
				losediv.style.fontSize = '3em';
				losediv.style.zIndex = '120';
				container.appendChild(losediv);
            }
            cancelAnimationFrame(animationGame);
            btnStart.style.display = 'block';
        }
    }
}







