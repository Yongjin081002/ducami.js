const writeBtn = document.getElementById("writeBtn");//html에 있는 id가 writeBtn인 객체를 가져온다.
const writeForm = document.getElementById("writeForm");//html에 있는 id가writeForm인 객체를 가져온다.
const overlay = document.getElementById("overlay");//html에 있는 id가 overlay인 객체를 가져온다.
const btnCloseModal = document.getElementById("closeModal");//html에 있는 id가 closeModal인 객체를 가져온다.
const readForm = document.getElementById("readForm");//html에 있는 readForm이 id인 객체를 가져온다.
const btnCloseRead = document.getElementById("closeRead");// html에 closeRead가 id인 객체를 가져온다.
let check = -1;

// 모달 열고 닫기
const openModal = () => {
    writeForm.classList.remove("hidden");//html에 /writeForm에 hidden으로 지정해놓은 것을 지운다.
    overlay.classList.remove("hidden");//html에 hidden으로 지정해놓은 것을 지운다.
};

const closeModal = () => {
    writeForm.classList.add("hidden");//writeForm에 지웠던 hidden을 다시 추가한다.
    overlay.classList.add("hidden");//지웠던 hidden을 다시 추가한다.
    readForm.classList.add('hidden');//읽기 폼도 closeModal이 실행되면 같이 close 함.
    resetForm();
};

const openRead = () => {
    readForm.classList.remove("hidden");//html에 hidden으로 지정해놓은 것을 지운다.
    overlay.classList.remove("hidden");//html에 hidden으로 지정해놓은 것을 지운다.
};

const closeRead = () => {
    readForm.classList.add("hidden");//지웠던 hidden을 다시 추가한다.
    overlay.classList.add("hidden");//지웠던 hidden을 다시 추가한다.
};

// 글 생성 함수
const createLi = (title, writer, text, i) => { // 매개변수를 title, writer, text, i 로 받음.
    const tr = document.createElement("tr");
    tr.setAttribute("tr", "textItem");//모르겠다.
    tr.setAttribute("class", "text-item");//모르겠다.
    let time = new Date(); // time변수가 new Date() 함수를 사용 할 수 있게 함.

    //tr에 title값을 추가하고, td에 writer, text 그리고 time.getHours(시) time.getMonutes(분)을 추가.
    //그리고 수정과 삭제 버튼을 추가한다.
    tr.innerHTML = `<td class="title" onclick="readPost(this)">${title}</td>
    <td class="writer">${writer}</td> <td class="text" hidden>${text}</td> <td>${time.getHours()}:${time.getMinutes()}</td>`;
    const btns = document.createElement("td");
    btns.innerHTML = `<button class="btn edit" id="editBtn" onClick="onEdit(this)">수정</button>
                      <button class="btn delete" id="deleteBtn">삭제</button>`;

    btns.querySelector('.delete').addEventListener('click',function () {// class가 delete인 객체를 클릭 했을 때 조건문이 돌아감.
        if(confirm('정말 삭제 하시겠습니까?')){
            onDelete(this)
        }
    });
    if(i != -1){// -1이라면 게시물안에 글이 없다는 것이기 때문에 -1이 아니라면 그 인덱스값의 게시글을 지운다.
        onDelete(i);
        check = -1//수정 모드가 종료됐다.
    }

    tr.appendChild(btns);
    document.getElementById("textList").appendChild(tr);
};

const savePost = () => {
    const title = document.getElementById("postTitle").value;//title 변수에 html에 postTitle이라는 id를 가진 객체의 값을 대입.
    const writer = document.getElementById("postWriter").value;//writer 변수에 html에 postWriter이라는 id를 가진 객체의 값을 대입.
    const text = document.getElementById("postText").value;//text 변수에 html에 postText이라는 id를 가진 객체의 값을 대입.

    createLi(title, writer, text, check);//모르겠다.
    closeModal();//Modal을 닫음.
};

// 글 읽기
const readPost = (i) => {
    document.getElementById("readTitle").textContent = i.parentElement.children[0].textContent;//readTitle이라는 id를 가진 객체의 i의부모요소 0 번째의 내용을 넣음.
    document.getElementById("readWriter").textContent = i.parentElement.children[1].textContent;//readWriter이라는 id를 가진 객체의 i의부모요소 1 번째의 내용을 넣음.
    document.getElementById("readText").textContent = i.parentElement.children[2].textContent;//readText이라는 id를 가진 객체의 i의부모요소 2 번째의 내용을 넣음.
    openRead();//openRead 함수를 호출.
}
//글 수정
const onEdit = (i) => {
    const tr = i.parentElement.parentElement;
    document.getElementById("postTitle").value = tr.children[0].textContent; //postTitle이 id인 객체의 값에 tr변수의 0번쨰 값의 내용을 대입.
    document.getElementById("postWriter").value = tr.children[1].textContent;//postWriter id인 객체의 값에 tr변수의 1번쨰 값의 내용을 대입.
    document.getElementById("postText").value = tr.children[2].textContent;//postText id인 객체의 값에 tr변수의 2번쨰 값의 내용을 대입.
    check = i;//함수를 호출 했을 때 인덱스
    openModal();// openModal함수를 호출
}
//글 삭제
const onDelete = (i) => {
    document.getElementById("textList").removeChild(i.parentElement.parentElement);//textList가 id인 객체의 자식값을 지움.

}
const resetForm = () => {// 입력했던 값들을 reset하기 위한 함수.
    document.getElementById("postTitle").value = ""; // postTitle이라는 id를 가진 객체의 값을 ""로 바꿈.
    document.getElementById("postWriter").value = ""; // postWriter라는 id를 가진 객체의 값을 ""로 바꿈.
    document.getElementById("postText").value = ""; // postText이라는 id를 가진 객체의 값을 ""로 바꿈.
};

writeBtn.addEventListener("click", openModal);//writeBtn을 클릭했을 때, openModal을 호출한다.

const countLength = (cnt, i) => {//html에서 정해놓은 제목의 최대길이를 넘겼을경우 제목의 최대길이름 알려줌.
    if(i.value.length > cnt) {
        alert(`제목의 길이는 최대 ${cnt}자 입니다!`);
    }
};

btnCloseModal.addEventListener("click", closeModal);//btnCloseModal을 클릭했을 때 closeModal을 호출.
overlay.addEventListener("click", closeModal);//overlay를 클릭했을 때 closeModal을 호출.
btnCloseRead.addEventListener("click",closeRead);//btnCloseRead를 클릭했을 때 closeRead를 호출.
