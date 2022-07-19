// General Functions

var Coin = function(){
    return Math.floor(Math.random() * 2);
};

var $ = function(ElementId){
    return document.getElementById(ElementId);
};

var $$ = function(QuerySlc){
    return document.querySelectorAll(QuerySlc);
};

var ServerList = function(){
    return $$("#server-list-id li img");
};
var SequencerList = function(){ 

    let list =  $$("#sequencer-list-id li img");
    var list2ret = [];
    for(let i = 0 ; i < list.length ; i++)
    {
        if(list[i].className != "token")
        {
            list2ret.push(list[i]);
        }
    }
    return list2ret;
};
var Token = function(){
    let list =  $$("#sequencer-list-id li img");
    for(let i = 0 ; i < list.length ; i++)
    {
        if(list[i].className == "token")
        {
            return list[i];
        }
    }
};

var TokenHTML = document.createElement('img');
TokenHTML.src   = "./images/token.png" 
TokenHTML.classList = "token" 
TokenHTML.id    = "token";

var TokenIndex = function(){

    var items = $$("#sequencer-list-id li");
    var i = -1;

    for( i = 0 ; i < items.length ; i++ )
    {
        if(items[i].children.length > 1)
        {
            return i;
        }
    }
    
    return -1;
}

var ClientList = function(){
    return $$("#client-list-id li img");
};

// Posição no doc
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}

// Delay
function delay_ms(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}

// Pegar item com maior ocorrencia
function MostOc(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

/* -------------------------------------------------------- */
/* ------------------------Client-------------------------- */
/* -------------------------------------------------------- */

ClientError = false

// Processo do cliente
function ClientProcess( val1, val2 ){

    if(Coin() && ClientError)
    {
        return val1 + val1;
    }

    return val1 + val2;
}

function newClient(ID){
    return {
        Id : ID,
        value0 : 0,
        value1 : 0,
        resp : 0
    }
};

// Criação inicial dos clientes
var ClientsInfo = []
for(let i = 0 ; i < ClientList().length ; i++)
{
    ClientsInfo.push(newClient(i));
}

/* -------------------------------------------------------- */
/* ------------------------Server-------------------------- */
/* -------------------------------------------------------- */

function newServer(ID){
    return {
        Id : ID,
        msg : 
        {
            value0 : 0,
            value1 : 0
        },
        resp : 0
    }   
};

// Criação inicial dos servidores
var ServersInfo = []
for(let i = 0 ; i < ServerList().length ; i++)
{
    ServersInfo.push(newServer(i));
}

/* -------------------------------------------------------- */
/* -----------------------Sequencer------------------------ */
/* -------------------------------------------------------- */

function newSeq(ID){
    return {
        Id : ID,
        msg : 
        {
            value0 : 0,
            value1 : 0
        },
        resp : 0
    }
};

// Criação inicial dos sequenciadores
var SeqsInfo = []
for(let i = 0 ; i < SequencerList().length ; i++)
{
    SeqsInfo.push(newSeq(i));
}

/* -------------------------------------------------------- */
/* ------------------------Client-------------------------- */
/* -------------------------------------------------------- */

$("client-n-slider").oninput = function(){
    hndl_client($("client-n-slider").value);
};

function hndl_client(NumberOfClients)
{

    if($$("#client-list-id li").length >= NumberOfClients)
    {
        rm_client(NumberOfClients);
    }
    else
    {
        add_client(NumberOfClients);
    }
}
// Adiciona cliente (Slider)
function add_client(NumberOfClients)
{
    var src = Coin() == 1 ? "./images/client-f.png" : "./images/client-m.png";
    var id = "Client_" + NumberOfClients;

    var item = document.createElement('li');
    item.innerHTML = "<img src=\"" + src + "\" id=\"" + id + "\">";
    $("client-list-id").appendChild(item);

    $("client-qty-id").innerText = NumberOfClients;

    ClientsInfo.push(newClient(NumberOfClients));
};
// Remove cliente (Slider)
function rm_client(Client)
{
    var items = $$("#client-list-id li");
    $("client-list-id").removeChild(items[Client]);

    $("client-qty-id").innerText = Client;
    
    ClientsInfo.pop();
}

/* -------------------------------------------------------- */
/* ------------------------Server-------------------------- */
/* -------------------------------------------------------- */

$("server-n-slider").oninput = function(){
    hndl_server($("server-n-slider").value);
};

function hndl_server(NumberOfservers)
{
    if($$("#server-list-id li").length >= NumberOfservers)
    {
        rm_server(NumberOfservers);
    }
    else
    {
        add_server(NumberOfservers);
    }
}
// Adiciona server (Slider)
function add_server(NumberOfservers)
{
    var src = "./images/data-server.png";
    var id = "Server_" + NumberOfservers;

    var item = document.createElement('li');
    item.innerHTML = "<img src=\"" + src + "\" id=\"" + id + "\">";
    $("server-list-id").appendChild(item);

    $("server-qty-id").innerText = NumberOfservers;
    
    ServersInfo.push(newServer(NumberOfservers));
};
// Remove server (Slider)
function rm_server(server)
{
    var items = $$("#server-list-id li");
    $("server-list-id").removeChild(items[server]);

    $("server-qty-id").innerText = server;

    ServersInfo.pop();
}

/* -------------------------------------------------------- */
/* -----------------------Sequencer------------------------ */
/* -------------------------------------------------------- */

$("sequencer-n-slider").oninput = function(){
    hndl_sequencer($("sequencer-n-slider").value);
};

function hndl_sequencer(NumberOfsequencers)
{
    if($$("#sequencer-list-id li").length >= NumberOfsequencers)
    {
        rm_sequencer(NumberOfsequencers);
    }
    else
    {
        add_sequencer(NumberOfsequencers);
    }
}
// Adiciona sequenciador (Slider)
function add_sequencer(NumberOfsequencers)
{
    var src = "./images/sequencer.png";
    var id = "Sequencer_" + NumberOfsequencers;

    var item = document.createElement('li');
    item.innerHTML = "<img src=\"" + src + "\" id=\"" + id + "\">";
    $("sequencer-list-id").appendChild(item);

    $("sequencer-qty-id").innerText = NumberOfsequencers;

    SeqsInfo.push(newSeq(NumberOfsequencers));
};
// Remove sequenciador (Slider)
function rm_sequencer(sequencer)
{
    var items = $$("#sequencer-list-id li");
    if(items[sequencer].children.length > 1)
    {
        RotateToken("L")
    }
    $("sequencer-list-id").removeChild(items[sequencer]);

    $("sequencer-qty-id").innerText = sequencer;

    SeqsInfo.pop();
}

/* -------------------------------------------------------- */
/* -----------------------Animation------------------------ */
/* -------------------------------------------------------- */

Activate = false;
AlertVar = true;
TokenWay = "R";

document.addEventListener ('keypress', (event) => {
    const keyName = event.key;
    if(keyName == "Q" || keyName == "q")
    {   // Para a animação
        Activate = false;
    }
    else if(keyName == "A" || keyName == "a")
    {   // Desativa alertas
        AlertVar = !AlertVar;
        alert("Modo com alertas : " + AlertVar);
    }
    else if(keyName == "E" || keyName == "e")
    {   // Habilita erros aleatórios no cliente
        ClientError = !ClientError;
        alert("Alguns clientes irão dar um resultado errado com 50% : " + ClientError);
    }
    else if(keyName == "T" || keyName == "t")
    {   // Inverte a rotação do token
        TokenWay = TokenWay == "R" ? "L" : "R";
        alert("Invertido o sentido de rotação do token.");
    }
    else
    {   // HELP!!!!
        alert("Q : Finaliza animação\nA : Desativa alertas dos clientes e sequenciador\nE : Ativa modo de erro de cliente.\nT : Inverte o sentido de rotação do toke.")
    }

});

// Iniciar a animação
$("send").onclick = async function(){

    Activate = true;

    while(Activate){
        // Percorre todos os servidores, o que tirar um valor 1 da função "Coin()" irá enviar uma requisição
        for(let i = 0 ; i < ServerList().length ; i++)
        {
            if(Coin())
            {  

                ServerList()[i].style.opacity = "100%";
                await delay_ms( ($("anim-n-slider").value * 10) );

                // Escolhe valores entre 0 e 9 para uma soma
                ServersInfo[i]["msg"]["value0"] = Math.floor(Math.random() * 10);
                ServersInfo[i]["msg"]["value1"] = Math.floor(Math.random() * 10);

                alert("O servidor ["+i+"] escolheu os números : "+ServersInfo[i]["msg"]["value0"]+" + "+ServersInfo[i]["msg"]["value1"]+"\nO servidor enviará na ordem dada pela soma.");

                // Decide a ordem que será enviado os valores.
                let ordem = Math.floor(Math.random() * 2);
                for(var k = 0 ; k < 2 ; k++){
                    ordem = ordem == 0 ? 1 : 0;
                    for( var j = 0 ; j < SequencerList().length ; j++ )
                    {
                        SeqsInfo[j]["resps"] = [];
                        SeqsInfo[j]["msg"]["value"+k] = ServersInfo[i]["msg"]["value"+ordem];
                        PkgAnimationSS(i, j);
                        
                    }
                    await delay_ms( ($("anim-n-slider").value * 1000) + 100 );

                    // Mostrar ordem em que foi recebido
                    if(AlertVar)
                    alert((k+1)+"ª mensagem recebida com o valor : "+SeqsInfo[TokenIndex()]["msg"]["value"+k]);
                }
                
                if(!Activate) return ResetOp(i);

                // Sequenciador que possui o token vai enviar os valores para todos os clientes 
                for( var j = 0 ; j < ClientList().length ; j++ )
                {

                    ClientsInfo[j]["value0"] = SeqsInfo[TokenIndex()]["msg"]["value0"];
                    ClientsInfo[j]["value1"] = SeqsInfo[TokenIndex()]["msg"]["value1"];
                    
                    PkgAnimationSC(j);

                }
                
                await delay_ms( ($("anim-n-slider").value * 1000) + 500 );
                if(!Activate) return ResetOp(i);

                for( var j = 0 ; j < ClientList().length ; j++ )
                {
                    // Clientes estão calculando a soma com os valores recebidos
                    ClientsInfo[j]["resp"] = ClientProcess(ClientsInfo[j]["value0"] , ClientsInfo[j]["value1"]);
                    
                    for( var k = 0 ; k < SequencerList().length ; k++)
                    {
                        // Sequenciadores recebendo a resposta dos clientes e salvando em um array
                        SeqsInfo[k]["resps"].push( ClientsInfo[j]["resp"] );
                        PkgAnimationCS( j, k);    
                    }

                    if(AlertVar)
                    alert("O cliente ["+j+"] respondeu : "+ClientsInfo[j]["resp"]);
                    
                    await delay_ms( ($("anim-n-slider").value * 1000) );
                    if(!Activate) return ResetOp(i);

                }

                // Sequenciador com o token pega a resposta que aparece mais vezes para enviar ao servidor
                SeqsInfo[TokenIndex()]["resp"] = MostOc(SeqsInfo[TokenIndex()]["resps"]);
                if(AlertVar)
                alert("O Sequenciador escolheu a resposta : " + SeqsInfo[TokenIndex()]["resp"]);

                await delay_ms( 100 );
                if(!Activate) return ResetOp(i);

                // Sequenciador com o token envia o resultado ao servidor
                ServersInfo[i]["resp"] = SeqsInfo[TokenIndex()]["resp"];                
                PkgAnimationSSInv(i);

                await delay_ms( ($("anim-n-slider").value * 1000) + 500 );
                
                // Alerta para mostrar o resultado que o servidor recebeu
                alert("O Servidor recebeu : "+ServersInfo[i]["resp"]);

                ServerList()[i].style.opacity = "20%";

                if(!Activate) return ResetOp(i);

                RotateToken(TokenWay);

            }
        }

        await delay_ms( 500 );

        RotateToken(TokenWay);
    
    }

};

function ResetOp( index ){

    ServerList()[index].style.opacity = "20%"

    return true;

}

// Pacote Servidor --> Sequenciador
function PkgAnimationSS(Server, Sequencer){

    let MsgStyle = $("msg"+Sequencer).style;
    
    $("msg"+Sequencer).classList.remove("send-animation");
    
    MsgStyle.setProperty('--duration', $("anim-n-slider").value );
    MsgStyle.setProperty('--repeate', 1 );
    MsgStyle.setProperty('--start-x', getOffset(ServerList()[Server]).left - (32 * Sequencer));
    MsgStyle.setProperty('--start-y', getOffset(ServerList()[Server]).top);
    MsgStyle.setProperty('--finish-x', getOffset(SequencerList()[Sequencer]).left - (32 * Sequencer) );
    MsgStyle.setProperty('--finish-y', getOffset(SequencerList()[Sequencer]).top );

    $("msg"+Sequencer).classList.add("send-animation");

}

// Pacote Sequenciador com o Token --> Cliente
function PkgAnimationSC(Client){

    let MsgStyle = $("msg"+Client).style;
    
    $("msg"+Client).classList.remove("send-animation");
    
    MsgStyle.setProperty('--duration', $("anim-n-slider").value );
    MsgStyle.setProperty('--repeate', 1 );
    MsgStyle.setProperty('--start-x', getOffset(Token()).left - (32 * Client));
    MsgStyle.setProperty('--start-y', getOffset(Token()).top);
    MsgStyle.setProperty('--finish-x', getOffset(ClientList()[Client]).left - (34 * Client) );
    MsgStyle.setProperty('--finish-y', getOffset(ClientList()[Client]).top );

    $("msg"+Client).classList.add("send-animation");

}

// Pacote Cliente --> Sequenciador
function PkgAnimationCS(Client, Sequencer){

    let MsgStyle = $("msg"+Sequencer).style;
    
    $("msg"+Sequencer).classList.remove("send-animation");
    
    MsgStyle.setProperty('--duration', $("anim-n-slider").value );
    MsgStyle.setProperty('--repeate', 1 );
    MsgStyle.setProperty('--start-x', getOffset(ClientList()[Client]).left - (32 * Sequencer));
    MsgStyle.setProperty('--start-y', getOffset(ClientList()[Client]).top);
    MsgStyle.setProperty('--finish-x', getOffset(SequencerList()[Sequencer]).left - (32 * Sequencer) );
    MsgStyle.setProperty('--finish-y', getOffset(SequencerList()[Sequencer]).top );

    $("msg"+Sequencer).classList.add("send-animation");

}

// Pacote Sequenciador com o Token --> Servidor
function PkgAnimationSSInv(Server){

    let MsgStyle = $("msg"+Server).style;
    
    $("msg"+Server).classList.remove("send-animation");
    
    MsgStyle.setProperty('--duration', $("anim-n-slider").value );
    MsgStyle.setProperty('--repeate', 1 );
    MsgStyle.setProperty('--start-x', getOffset(Token()).left - (32 * Server));
    MsgStyle.setProperty('--start-y', getOffset(Token()).top);
    MsgStyle.setProperty('--finish-x', getOffset(ServerList()[Server]).left - (34 * Server) );
    MsgStyle.setProperty('--finish-y', getOffset(ServerList()[Server]).top );

    $("msg"+Server).classList.add("send-animation");

}

function RemoveToken()
{
    var items = $$("#sequencer-list-id li");
    var i = -1;

    for( i = 0 ; i < items.length ; i++ )
    {
        if(items[i].children.length > 1)
        {
            items[i].removeChild(items[i].children[1]);
            
            break;
        }
    }
    
    return i;
}

function RotateToken(Direction)
{
    if(Direction == "L")
    {
        var items = $$("#sequencer-list-id li");
        var Pos = RemoveToken();
        
        if(Pos == 0 )
        {
            items[items.length - 1].appendChild(TokenHTML);
        }
        else
        {
            items[Pos - 1].appendChild(TokenHTML);
        }

    }
    else if(Direction == "R")
    {
        var items = $$("#sequencer-list-id li");
        var Pos = RemoveToken();
        
        if(Pos == (items.length - 1) )
        {
            items[0].appendChild(TokenHTML);
        }
        else
        {
            items[Pos + 1].appendChild(TokenHTML);
        }

    }
}

$("rotate-rigth").onclick = function(){
    RotateToken("R");
}

$("rotate-left").onclick = function(){
    RotateToken("L");
}