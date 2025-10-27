const quiz = [
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: [
      { text: "String", isCorrect: false },
      { text: "Boolean", isCorrect: false },
      { text: "Float", isCorrect: true },
      { text: "Undefined", isCorrect: false }
    ]
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: [
      { text: "let", isCorrect: false },
      { text: "var", isCorrect: false },
      { text: "const", isCorrect: true },
      { text: "static", isCorrect: false }
    ]
  },
  {
    question: "What does DOM stand for?",
    options: [
      { text: "Document Object Model", isCorrect: true },
      { text: "Data Object Method", isCorrect: false },
      { text: "Document Oriented Module", isCorrect: false },
      { text: "Data Oriented Model", isCorrect: false }
    ]
  },
  {
    question: "Which function is used to parse a string to integer in JavaScript?",
    options: [
      { text: "parseInt()", isCorrect: true },
      { text: "toInteger()", isCorrect: false },
      { text: "intParse()", isCorrect: false },
      { text: "parse()", isCorrect: false }
    ]
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: [
      { text: "//", isCorrect: true },
      { text: "/* */", isCorrect: false },
      { text: "<!-- -->", isCorrect: false },
      { text: "#", isCorrect: false }
    ]
  }
];

const ques = document.getElementById('question');
const ans = document.getElementById('ans-btn');
const next = document.getElementById('next');
let currentindex = 0;
let score = 0;
function startquiz(){
    currentindex = 0;
    score = 0;
    next.innerHTML="Next";
    showq();
}
function showq(){
    Resetq();
    let currentq = quiz[currentindex];
    let qno = currentindex+1;
    ques.innerHTML=qno + "." + currentq.question;
    currentq.options.forEach(answer=>{
        const btnn = document.createElement('button');
        btnn.innerHTML = answer.text;
        btnn.classList.add('btn');
        ans.appendChild(btnn);
        if(answer.isCorrect){
            btnn.dataset.correct = answer.isCorrect;
        }
        btnn.addEventListener('click', selectans);
    })
}
function Resetq(){
    next.style.display="none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild);
    }
}
function selectans(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add('correct');
        score++;
    }
    else{
        selectedbtn.classList.add('incorrect');
    } 
    Array.from(ans.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    next.style.display="block"; 
}
next.addEventListener('click', ()=>{
    if(currentindex < quiz.length ){
        handlenext();
    }
    else{
        startquiz();
    } 
    
  });
  function handlenext(){
    currentindex++;   
    if(currentindex < quiz.length){
        showq();
    }
    else{
        showScore();
    }
  }
  function showScore(){
    Resetq();
    ques.innerHTML = `You scored ${score} out of ${quiz.length}!`;
    next.innerHTML = "Play Again";
    next.style.display = "block";
  }   
  
startquiz()