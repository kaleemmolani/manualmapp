let ullist = document.getElementById('ullist');
let fixedlist = document.getElementById('fixedlist');
let focusbar = document.getElementById('focusbar');
let outputarray = [];
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
$('#makelist').click(function (e) { 
  $('#ullist').empty();
  $('#fixedlist').empty();
    e.preventDefault();
  let array= document.getElementById('staticlistinput').value.trim().split('\n');
  array.forEach(element => {
    let li = document.createElement('li');
    li.innerHTML = element;
    fixedlist.appendChild(li);
  });
  let movingarray = document.getElementById('movinglistinput').value.trim().split('\n');
  console.log(array.length-movingarray.length);
  movingarray.forEach((element,i) => {
    let li = document.createElement('li');
    li.innerHTML = element;
    li.tabIndex = i;
    li.id = i;
    ullist.appendChild(li);
  });
  let diff = array.length-movingarray.length;
  if(diff>0){
  for (let index = 0; index < diff; index++) {
    let li = document.createElement('li');
    li.innerHTML = 'blank';
    li.tabIndex = movingarray.length+index;
    li.id = movingarray.length+index;
    ullist.appendChild(li);
  }
  }

$('li').click(function (e) {
  e.preventDefault() 
  let element = $(this);
  var position = $(`#${e.target.id}`).position();
  var top = position.top;
  var left = position.left;
  focusbar.style.top = top-10 + 'px';
  focusbar.dataset.id = e.target.id;
  focusbar.style.visibility = 'visible';
  console.log(top, left);
  document.getElementById(e.target.id).focus();
});
$('li').keydown(function (e) {
  e.preventDefault()
  if (e.which == 38) {
    ullist.insertBefore(document.getElementById(e.target.id), document.getElementById(e.target.id).previousElementSibling);
    document.getElementById(e.target.id).focus();
    var position = $(`#${e.target.id}`).position();
    var top = position.top;
    var left = position.left;
    focusbar.style.top = top-10 + 'px';
    focusbar.dataset.id = e.target.id;
  console.log(top, left);
    return false;
  }
  if (e.which == 40) {
    ullist.insertBefore(document.getElementById(e.target.id).nextElementSibling,document.getElementById(e.target.id));
    document.getElementById(e.target.id).focus();
    var position = $(`#${e.target.id}`).position();
    var top = position.top;
    var left = position.left;
    if(top>window.innerHeight-100){
      window.scrollTo(0,top-window.innerHeight+100);
    }
    focusbar.style.top = top-10 + 'px';
    focusbar.dataset.id = e.target.id;
  console.log(top, left);
    return false;
  }
  if (e.which == 13) {
    var nodes = Array.prototype.slice.call( document.getElementById('ullist').children )
    let idOfFocusedListElement = focusbar.dataset.id;
    let index=nodes.indexOf( document.getElementById(idOfFocusedListElement) )
    console.log(document.getElementById(idOfFocusedListElement).innerText,fixedlist.children[index].innerText);
    outputarray.push(document.getElementById(idOfFocusedListElement).innerText+'|'+fixedlist.children[index].innerText);
    //reomve from fixedlist
    fixedlist.removeChild(fixedlist.children[index]); 
    //remove from ullist
    ullist.removeChild(document.getElementById(idOfFocusedListElement) );
    console.log(fixedlist[index],index,document.getElementById(idOfFocusedListElement) );
  }
})
$('#focusbutton').click(function (e) { 
  e.preventDefault();
  var nodes = Array.prototype.slice.call( document.getElementById('ullist').children )
  let index=nodes.indexOf( document.getElementById(focusbar.dataset.id) )
  console.log(fixedlist[index],index,document.getElementById(focusbar.dataset.id) );
});

$('#showresultarray').click(function (e) { 
  e.preventDefault();
  download('mappedresult.txt', outputarray.join('\n'));
});
});