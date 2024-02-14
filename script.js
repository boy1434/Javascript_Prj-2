// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가 된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 가게된다
// 1. check 버튼을 클릭하는 순간 true <= false
// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝난탭은 끝난 아이템만, 진행중ㄷ 탭은 진행중 아이템만
// 전체ㅐㅂ을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];


addBtn.addEventListener("click", addTask);


// + 버튼을 눌렀을때 값이 저장??? 되는 곳?!
function addTask() {
    
    

    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    }
    if(task.taskContent == ""){
        alert("내용을 입력해주세요");
        // 경고창 띄운 후 커서를 input 창으로 이동
        taskInput.focus();
    } else{

        taskList.push(task);
        console.log(taskList);
        render();
        taskInput.value='';
    }
    
}



// 플러스 버튼을 눌렀을때 보여지는 곳
function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){

        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button class="returnBtn" onclick="returnBtn('${taskList[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                <button class="deleteBtn" onclick="deleteBtn('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
        } else if(taskList[i].isComplete == false){ 
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button class="checkBtn" onclick="checkBtn('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button class="deleteBtn" onclick="deleteBtn('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
        }

        
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
    
}

function deleteBtn(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}


function returnBtn(id){
    console.log('id:,',id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = false;
            break;
        }
    }
    
    render();
    console.log(taskList);
}

function checkBtn(id){
    console.log('id:,',id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = true;
            break;
        }
    }
    
    render();
    console.log(taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}