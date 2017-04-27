function showGallery(){
	pics = new Array(7);
	win = document.getElementById('main');
	btn = document.getElementById('start');
	btn.counter = 1;
	
	for(i = 1; i <= pics.length; i++){
		pics[i-1] = 'pics/' + i + '.JPG';
		addPics(pics[i-1]);
	}
	
	makeStatus(null, pics.length);
}

function addPics(name){
	tmp = document.createElement('img');
	tmp.style.width = '196px';
	tmp.src = name;
	tmp.style.margin = '1px';
	tmp.style.width = '196px';
	tmp.style.border = '1px groove silver';
	tmp.style.float = 'left';
	win.appendChild(tmp);
}

function makeStatus(num, numAll){
	var win = document.getElementById('top');
	if (!num) 
		 win.innerHTML = 'Pictures is gallery -' + numAll; 
	else win.innerHTML = num + ' / ' + numAll;
}	
//--------------------------------------------

function loading(){
	h = document.createElement('span');
	h.innerText = 'Loading...';
	h.style.lineHeight = '500px';
	h.style.textAlign = 'center';
	h.style.position = 'absolute';
	h.style.fontSize = '30px';
	h.style.width = '800px';
	h.style.display = 'inline';
	win.appendChild(h);
}

function go(){
	sel2 = document.getElementById('delay');
	delay = sel2.options[sel2.selectedIndex].value * 1000;
	sel2.disabled = 'dis';

	if (btn.counter == 1){
		btn.disabled = 'dis';
		setTimeout(function(){btn.disabled = null}, delay);
		hide();	
	}else{
		stop();
	}
}

function stop(){
	btn.disabled = '';
	while(tmp){
		win.removeChild(tmp);
		tmp = document.getElementsByTagName('img')[0];
	}
	clearInterval(ID);
	showGallery();
	sel1.disabled = null;
	sel2.disabled = null;
	btn.innerHTML = 'Start slideshow';
	btn.counter = 1;
	h.style.display = 'none';
}

function hide(){
	var maxWid = 800;
	loading();
	
	sel1 = document.getElementById('wid');
	wid = sel1.options[sel1.selectedIndex].value * maxWid;
	sel1.disabled = 'dis';
	btn.innerHTML = 'Stop slideshow';
	btn.counter = 2;
	
	for (i = 0; i < pics.length; i++){
		tmp = document.getElementsByTagName('img')[i];
		tmp.style.display = 'none';
		tmp.style.border = null;
	}
	
	tmp = null;
	
	i = 0;
	ID = setInterval(slide, delay);
}

function slide(){
	if (h.style.display == 'inline') h.style.display = 'none';
	if (tmp) tmp.parentNode.removeChild(tmp);
	if (i == pics.length) {
		clearInterval(ID);
		showGallery();
		sel1.disabled = null;
		sel2.disabled = null;
		btn.disabled = null;
		btn.counter = 1;
	}else{
		tmp = document.getElementsByTagName('img')[0];
		tmp.style.display = 'block';
		tmp.style.outline = '1 px solid black';
		tmp.style.width = wid;
		tmp.style.heigth = parseInt(wid)/1.5;
		var sides = (800 - parseInt(wid))/2;
		var vert = (500 - parseInt(tmp.style.heigth))/2;
		if (wid != 800) tmp.style.margin = vert+'px '+sides+'px';	
		i++;
		//-----------------------
		makeStatus(i, pics.length);
	}
}
