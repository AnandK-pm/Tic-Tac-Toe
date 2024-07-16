document.addEventListener("DOMContentLoaded",()=>{
    const dialog = document.querySelector("dialog")
    const playbut = document.querySelector("#submit")    
    const gameb = document.querySelector(".gameboard");
    const newgamebtn = document.querySelector("#newgame");

    dialog.showModal(); 
    gameb.classList.add("invisible");
    newgamebtn.classList.add("invisible");
    let p1name, p2name;
    playbut.addEventListener("click",(e)=>{
        e.preventDefault();
        p1nameInput = document.querySelector("#p1name")
        p2nameInput = document.querySelector("#p2name")
        p1name = p1nameInput.value;
        p2name = p2nameInput.value;
        if(p1name==='' || p2name === '')
        {
            alert("Please enter the names!")
        }
        else
        {
            gameb.classList.remove("invisible");
            newgamebtn.classList.remove("invisible")
            const player1 = new Player(p1name, 'X');
            const player2 = new Player(p2name, 'O');
            dialog.close();
            initializeGame(player1, player2);
        }
    
   
    })

    
    function initializeGame(player1, player2)
    {
        let p1div = document.querySelector(".player1")
        let p2div = document.querySelector(".player2")

        p1div.textContent = "Player 1 : " + player1.name;
        p2div.textContent = "Player 2 : " + player2.name;
        const game = Gameboard();
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell=>{
            cell.addEventListener("click",function(){
                if(game.gameactive)
                {
                    pos =this.id;
                    const row = parseInt(pos[0], 10);
                    const col = parseInt(pos[1], 10);
                    if (game.turn % 2 === 0){
                    play(player1, row, col, game);}
                    else
                    {play(player2, row, col, game)}
                    display(game.board);
                    console.log(board);
                }
            });
        })
    // player1 is X
    // player2 is O
    
        newgame = document.querySelector("#newgame");
        newgame.addEventListener("click",()=>{
            reset(game);
            result = document.querySelector(".result");
            result.textContent = '';
            game.gameactive = true;

        })
    }
})
function Gameboard()  
{
    board = [["","",""],["","",""],["","",""]]
    turn = 0
    gameactive = true;
    return{
        board,
        turn,
        gameactive
    }
}
function Player(name, mark)
{
    this.name = name;
    this.mark = mark;
}
function equal(board,b, c, d, e, f, g)
{
    if((board[b][c]!='' && board[d][e]!='' && board[f][g]!=''))
    {
        if(board[b][c] === board[d][e] && board[b][c] === board[f][g]) 
        {
            return true;
        }
    }
    return false
}
function check(board)
{
    return(
    equal(board,0,0,1,1,2,2) ||
    equal(board,0,0,0,1,0,2) ||
    equal(board,0,0,1,0,2,0) ||
    equal(board,0,2,1,1,2,0) ||
    equal(board,0,2,1,2,2,2) ||
    equal(board,2,0,2,1,2,2) ||
    equal(board,1,0,1,1,1,2) || 
    equal(board,0,1,1,1,2,1) );
}
function poscheck(board, row, col)
{
    if(board[row][col]==='O' || board[row][col]==='X')
    {
        return false;
    }
    return true;

}
function display(board) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col];
    });
}
function play(player, row, col, game) {
    if (poscheck(game.board, row, col)) {
        if (player.mark === 'X') {
            game.board[row][col] = 'X';
        } else {
            game.board[row][col] = 'O';
        }
        display(game.board); // Update display after game.board is modified
        game.turn++;
        setTimeout(() => {
            result = document.querySelector(".result");
            if (check(game.board)) {
                
                result.textContent = player.name + " wins !";
                game.gameactive = false;
            }
            if(isTie(game.board))
            {
                result.textContent = "its a Tie !";
                game.gameactive = false;
            }
        }, 100); // Adjust delay as needed
    } else {
        alert("Position already filled");
    }
}
function reset(game)
{
    for(let i =0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            game.board[i][j] = "";
        }
    }
    game.turn = 0;
    display(game.board);
}
function isTie(board)
{
    for(let i = 0;i<3;i++)
    {
        for(let j = 0;j<3;j++)
        {
            if (board[i][j] ==='')
            {
                return false
            }
        }
    }
    if (!check(board))
    {
        return true;
    }
}