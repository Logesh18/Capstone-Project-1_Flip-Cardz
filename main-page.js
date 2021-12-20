function show_instruction(){
    document.getElementById("game-name").style.display="none";
    document.getElementById("game-link").style.display="none";
    document.getElementById("instruction").style.display="none";
    document.getElementById("how-to-play").style.display="block";
    const how_to_play = document.querySelector('#how-to-play');
    let div = document.createElement('div');
    div.id = 'game-instructions';
    div.innerHTML = `
    <div>
    <center><h1 id="instruction-heading">HOW TO PLAY....</h1>
    <ul id="steps">
    <li>There are three levels in this game. The object of the game is to collect the most matching pair of cards in all the three levels.</li>
    <li>Concentration is important while playing this game. Because every time while clicking the cards it will be flipped back if the chosen card is not matched. So remember the position of the cards that you want to match.</li>
    <li>For each levels, number of cards will get increased and it becomes tough for the player to make pair all the cards.</li>
    <li>Once completing each level scores will be shown. You can play it again based on the score you got or you can move to the next level.</li>
    <li>After completing the last level you can restart the game from level one. You cannot move backward to the previous level while playing the game.</li>
    </ul>
    <button id="back" name="back" role="button" onclick="back();"><h3>Back to the Game</h3></button>
    </div>`;
    how_to_play.appendChild(div);
}
function back(){
    document.getElementById('how-to-play').innerHTML = '';
    document.getElementById("how-to-play").style.display="none";
    document.getElementById("game-name").style.display="block";
    document.getElementById("game-link").style.display="block";
    document.getElementById("instruction").style.display="block";
}
function instruction(){
    show_instruction();
}