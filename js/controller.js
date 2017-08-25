$(document).ready(function () {
	
var questionNumber=0;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
 

 		$.getJSON('quiz.json', function(data) {

		for(i=0;i<data.quizlist.length;i++){ 
			questionBank[i]=new Array;
			questionBank[i][0]=data.quizlist[i].question;
			questionBank[i][1]=data.quizlist[i].option1;
			questionBank[i][2]=data.quizlist[i].option2;
			questionBank[i][3]=data.quizlist[i].option3;
			questionBank[i][4]=data.quizlist[i].option4;
			questionBank[i][5]=data.quizlist[i].type;
			questionBank[i][6]=data.quizlist[i].photo;
			questionBank[i][7]=data.quizlist[i].justify;

		}
		 numberOfQuestions=questionBank.length; 

		 
		displayQuestion();
		})//gtjson
 
 
function displayQuestion(){
 var rnd=0;
 var q1;
 var q2;
 var q3;
 var q4;
 var ty=0;
 var ph;

ty=questionBank[questionNumber][5];
ph=questionBank[questionNumber][6];
ju=questionBank[questionNumber][7];

if(ty==0){
//multiple options
rnd=Math.random()*3;
rnd=Math.ceil(rnd);
if(rnd==1){q1=questionBank[questionNumber][1];q2=questionBank[questionNumber][2];q3=questionBank[questionNumber][3];q4=questionBank[questionNumber][4];}
if(rnd==2){q2=questionBank[questionNumber][1];q3=questionBank[questionNumber][2];q4=questionBank[questionNumber][3];q1=questionBank[questionNumber][4];}
if(rnd==3){q3=questionBank[questionNumber][1];q4=questionBank[questionNumber][3];q1=questionBank[questionNumber][2];q2=questionBank[questionNumber][4];}

$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div><div id="4" class="option">'+q4+'</div>');
}
if(ty==1){
//true,false
rnd=Math.random()*2;
rnd=Math.ceil(rnd);
if(rnd==1){q1=questionBank[questionNumber][1];q2=questionBank[questionNumber][2];}
if(rnd==2){q2=questionBank[questionNumber][1];q1=questionBank[questionNumber][2];}
$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div>');
}
if(ty==2){
//multiple options photo
rnd=Math.random()*3;
rnd=Math.ceil(rnd);
if(rnd==1){q1=questionBank[questionNumber][1];q2=questionBank[questionNumber][2];q3=questionBank[questionNumber][3];q4=questionBank[questionNumber][4];}
if(rnd==2){q2=questionBank[questionNumber][1];q3=questionBank[questionNumber][2];q4=questionBank[questionNumber][3];q1=questionBank[questionNumber][4];}
if(rnd==3){q3=questionBank[questionNumber][1];q4=questionBank[questionNumber][3];q1=questionBank[questionNumber][2];q2=questionBank[questionNumber][4];}

$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div class="questionPhoto"><p class="w3-center"><img class="w3-center" style="width:400px" src="'+ph+'"></p></div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div><div id="4" class="option">'+q4+'</div>');
}

 $('.option').click(function(){
  if(questionLock==false){questionLock=true;	
  //correct answer
  if(this.id==rnd){
   $(stage).append('<div class="feedback1">CORRECTO</div><div class="w3-row w3-text-white w3-marginTop"><br>'+ju+'</div><audio autoplay><source src="audios/correcto.mp3" type="audio/mpeg"></audio>');
   score++;
   }
  //wrong answer	
  if(this.id!=rnd){
   $(stage).append('<div class="feedback2">FALLASTE</div><div class="w3-row w3-text-white w3-marginTop"><br>'+ju+'</div><audio autoplay><source src="audios/fallaste.mp3" type="audio/mpeg"></audio>');
  }
  if(ju!=" "){
	setTimeout(function(){changeQuestion()},10000);
  }else{
    setTimeout(function(){changeQuestion()},1000);
  }
 }})
}//display question

	
	
	
	
	
	function changeQuestion(){
		
		questionNumber++;
	
	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}
	
	if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}
	
	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question
	

	
	
	function displayFinalSlide(){
		
		$(stage).append('<div class="questionText">Has terminado tu evaluación!<br><br>Total preguntas: '+numberOfQuestions+'<br>Respuestas correctas: '+score+'</div>');
		
	}//display final slide
	
	
	
	
	
	
	
	});//doc ready