// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가 된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 가게된다
// 1. check 버튼을 클릭하는 순간 true <= false
// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝난탭은 끝난 아이템만, 진행중ㄷ 탭은 진행중 아이템만
// 전체ㅐㅂ을 누르면 다시 전체아이템으로 돌아옴
let
 underLine = document.getElementById("under-line");
let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let tabsMode = 'all';
let filterList = [];


tabs.forEach(menu=>menu.addEventListener("click", (e)=>moveBar(e)));

function moveBar(e){
    underLine.style.left = e.currentTarget.offsetLeft+"px";
    underLine.style.width = e.currentTarget.offsetWidth+"px";
    underLine.style.top = e.currentTarget.offsetTop+ e.currentTarget.offsetHeight+ -20+"px";
}



for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(e) {
        filter(e)})
}



addBtn.addEventListener("click", addTask);


// + 버튼을 눌렀을때 값을 추가!
function addTask(e) {
    
    e.preventDefault();

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
        
        taskInput.value='';
    }
    filter(e);
    
}




// 플러스 버튼을 눌렀을때 보여지는 곳
function render(){
    let list = [];
    // 내가 선택한 탭에 따라서 리스트를 다르게 보여준다.
    if(tabsMode ==="all"){
        // all taskList
        list = taskList;
    }else if(tabsMode === "ongoing" ){
        list = filterList;
    } else if (tabsMode === "done"){
        list = filterList;
    }
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
       if(tabsMode === "all"){
         if(list[i].isComplete == true ){
            resultHTML += `<div class="task-return">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button class="returnBtn" onclick="returnBtn('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                    <button class="deleteBtn" onclick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`
         } else if(list[i].isComplete == false){
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button class="checkBtn" onclick="checkBtn('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button class="deleteBtn" onclick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
         }
       }
        
       else if(tabsMode === "ongoing" || tabsMode === "all"){
            if(list[i].isComplete == false){
                resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button class="checkBtn" onclick="checkBtn('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button class="deleteBtn" onclick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
            }
        }

        else if(tabsMode === "done" || tabsMode === "all"){
            
            if(list[i].isComplete == true || tabsMode === "all"){
                resultHTML += `<div class="task-return">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button class="returnBtn" onclick="returnBtn('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                    <button class="deleteBtn" onclick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`
            }  
        } 

        
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
    
}



function deleteBtn(id) {
    for(let i=0; i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(e){
    
     tabsMode = e.target.id;
     filterList = [];
     
        if(tabsMode === "all" ){
            
        render();
    } else if (tabsMode ==="ongoing"){
        // 진행중인 아이템
        // task.isComplete = false
        for(let i=0; i<taskList.length; i++){
            if (taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
            render();
        }
        
    } else if(tabsMode === "done"){
        for(let i=0; i<taskList.length; i++){
            if (taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
            
            
            render();
        }
    }
}

function returnBtn(id){
    
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = false;
            break;
        }
    }
    
    render();
    
}

function checkBtn(id){
    
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = true;
            break;
        }
        
    }
    
    render();
    
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}