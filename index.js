const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const nextgamebtn=document.querySelector(".btn");

let currentplayer;
let gamegrid;

const winningposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initgame(){
    currentplayer="X";
    gamegrid=["","","","","","","","",""];
    // UI pr empty krna h
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // green clr ko hatao --> intialize box with css property again
        box.classList =`box box${index+1}`;

    })
    nextgamebtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currentplayer}`;
}

initgame();

function swapturn(){
    if(currentplayer=="X")
     currentplayer="O";
    else
     currentplayer="X";

     // UI update
     gameinfo.innertext=`Current Player - ${currentplayer}`;
} 

function checkgameover()
{
    let answer="";

    winningposition.forEach((position)=>{
        if((gamegrid[position[0]]=="X"&&gamegrid[position[1]]=="X"&&gamegrid[position[2]]=="X")||(gamegrid[position[0]]=="O"&&gamegrid[position[1]]=="O"&&gamegrid[position[2]]=="O"))
           {
              // check who is winner
              if(gamegrid[position[0]]=="X")
                 answer="X";
               else
                  answer="O";
                
               

                boxes[position[0]].classList.add("win");  
                boxes[position[1]].classList.add("win");  
                boxes[position[2]].classList.add("win");  
           }
    });

    if(answer!==""){
        gameinfo.innerText=`Winner player - ${answer}`;
        nextgamebtn.classList.add("active");
        return;
    }

    //check whether there is a tie
    let filledcount=0;
    gamegrid.forEach((box)=>{
        if(box!=="")
        filledcount++;
    });

    if(filledcount===9){
    gameinfo.innerText="Game Tied !";
    nextgamebtn.classList.add("active");
    }

}

function handleclick(index){
    if(gamegrid[index]==="")
    {
        boxes[index].innerText=currentplayer;
        gamegrid[index]=currentplayer;
         boxes[index].style.pointerEvents="none"; 
        //swap turn
        swapturn();
        // check koi jeet to nhi gya
          checkgameover(); 
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
});

nextgamebtn.addEventListener("click",initgame);