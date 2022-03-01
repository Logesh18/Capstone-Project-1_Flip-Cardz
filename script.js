var images=['super-1','super-2','super-3','super-4','super-5','super-6','super-7','super-8','super-9','super-10','super-11','super-12','super-13','super-14','super-15'];
var img=[];
var n,k,pair_count,count,score;
var prev_id='';
var dict={};

function flip(id){
  let classes=document.getElementById(id).classList;
	  if (classes[0] === "card") {
      document.getElementById(id).style.transform = "rotateY(180deg)";
      if(pair_count==1){
        prev_id=id;
        pair_count++;
      }
      else if(prev_id!=id && dict[classes[1]].indexOf(parseInt(prev_id))!=-1 && dict[classes[1]].indexOf(parseInt(id))!=-1){
        document.getElementById(prev_id).disabled = true;
        document.getElementById(id).disabled = true;
        document.getElementById(id).removeAttribute("onclick");
        document.getElementById(prev_id).removeAttribute("onclick");
        count++;
        pair_count--;
      }
      else{
          if(prev_id!=id){
              setTimeout(()=>{ 
              document.getElementById(prev_id).style.transform = "rotateY(0deg)";
              document.getElementById(id).style.transform = "rotateY(0deg)"; }, 2000);
              pair_count--;
              score-=2;
          }
          else{
              document.getElementById(id).style.transform = "rotateY(0deg)";
          }
      }
    }
    if(count*2==n){
      level++;
      setTimeout(() => {congrats();}, 1800);
    }
}

function congrats(){
    document.getElementById("child-content").style.width="0vw";
    document.getElementById("child-content").style.paddingRight="0vw";
    document.getElementById("child-content").style.paddingTop="17vh";
    document.getElementById("child").style.marginTop="0vh";
    document.getElementById("child").style.minHeight="87vh";
    document.documentElement.style.setProperty("--colNum", 0); 
    const child_content = document.querySelector('#child-content');
    document.getElementById("round").innerHTML='';
    document.getElementById('child-content').innerHTML = '';
    if(window.matchMedia("(max-width: 768px)")){
      document.getElementById("child-content").style.minWidth="35.5vw";
    }
    else if(window.matchMedia("(max-width: 425px)")){
      document.getElementById("child-content").style.minWidth="47.5vw";
    }
    let div = document.createElement('div');
    div.id = 'success';
    div.innerHTML = `<div id="congrats">
          <div id="col">
              <img src="images/pooper.png" id="pooper-1" alt="pooper">
          </div>
          <div id="col">
              <h1 id="congrats-text">CONGRATS YOU HAVE WON</h1><br>
              <h1>Score : `+score+`/`+((n/2)*5)+`</h1>
          </div>
          <div id="col">
              <img id="pooper-2" style="transform: scaleX(-1);" src="images/pooper.png" alt="pooper">
          </div></div><br>`
    let div1 = document.createElement('div');
    if(level<=3){
          div1.innerHTML =`<center><div id="buttons">
          <button id="play-again" onclick="again();">Try Again</button><button id="next" onclick="next();">Next</button>
          </div></center>`;
    }
    else{
          div1.innerHTML = `<center><div id="buttons">
          <div ><button id="play-again" onclick="again();">Try Again</button><button id="next" onclick="restart();">Restart</button></div>
          </div></center>`;
    }
    div.appendChild(div1);
    child_content.appendChild(div);
}

function restart(){
  level=1;
  document.getElementById("round").innerHTML="Level-"+level;
  document.getElementById('child-content').innerHTML = '';
  createLevels(level);
}

function next(){
  document.getElementById("round").innerHTML="Level-"+level;
  document.getElementById('child-content').innerHTML = '';
  createLevels(level);
}

function again(){
  level=level-1;
  document.getElementById("round").innerHTML="Level-"+level;
  document.getElementById('child-content').innerHTML = '';
  createLevels(level);
}

function createDict(random_image,i){
  if (!dict[random_image]) {
      dict[random_image] = [];
  }
  dict[random_image].push(i);
}

function unique(){
  
  let random_image;
  for(let j=0;j<n/2;j++){
    random_image=images[Math.floor(Math.random()*images.length)];
    if(img.indexOf(random_image)==-1){
       img[k]=random_image;
       k++;
       break;
    }
  }
  return random_image;
}
function pickRandomImage(){
   let random_image;
   if(k<n/2){
     random_image=unique();
   }
   else{
     random_image=img[Math.floor(Math.random()*img.length)];
     img.splice(img.indexOf(random_image),1);
   }
   return random_image;
}

function createCards(level){
    let i;
    const child_content = document.querySelector('#child-content');
    document.getElementById("round").innerHTML="LEVEL-"+level;
    for(i=0;i<n;i++)
    {   
        let div = document.createElement('div');
        div.id = 'container';
        let random_image=pickRandomImage();
        createDict(random_image,i);
        div.innerHTML = `
        <div class="card `+random_image+`" id="`+i+`" onclick="flip(this.id)">
          <div class="front">
              <img class="images" src="images/think.png" alt="image">
          </div>
          <div class="back">
            <img class="images" src="images/`+random_image+`.png" alt="image">
          </div> 
        </div>`;
        child_content.appendChild(div);
    }

}

function createLevels(level)
{
      dict={}; 
      k=0,pair_count=1,count=0,score=0;
      prev_id=''; 
      document.getElementById("child-content").style.minWidth="0vw";
      document.getElementById("child").style.minHeight="80vh";
      if(level==1){  
          document.getElementById("child-content").style.paddingTop="14vh";
          document.getElementById("child-content").style.width="25.5vw";
          document.documentElement.style.setProperty("--colNum", 3); 
          n=12;
          createCards(level);
      }
      else if(level==2){
          document.documentElement.style.setProperty("--colNum", 4); 
          document.getElementById("child-content").style.paddingTop="14vh";
          document.getElementById("child-content").style.width="25.5vw";
          document.getElementById("child-content").style.paddingRight="9vw";
          n=16;
          createCards(level);
      }  
      else if(level==3){
          document.documentElement.style.setProperty("--colNum", 4); 
          document.getElementById("child-content").style.paddingTop="8vh";
          document.getElementById("child-content").style.paddingRight="8vw";
          n=20;
          createCards(level);
      }
}

function game(){
   let level=1;
   createLevels(level);
}
