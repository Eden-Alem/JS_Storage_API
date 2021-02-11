/*  
Here is the exercise on working on the remaining bom method 
Location , Navigator , screen , Window 
Follow the Instruction on the comments 
1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 
Adding Extra is Possible if you want to explore more ...
Good Luck !!! 
*/

// Define UI Variables  here 
const loc = document.querySelectorAll('.locationCollection');
const browser = document.querySelectorAll('.browserCollection');
const scr = document.querySelectorAll('.screenCollection');
const his = document.querySelectorAll('.historyCollection');

// Display the BOM Information on the innerHTML of the elements

loc[0].getElementsByTagName('span')[0].innerHTML = location.href;
loc[0].getElementsByTagName('span')[1].innerHTML = location.protocol;
loc[0].getElementsByTagName('span')[2].innerHTML = location.host;
loc[0].getElementsByTagName('span')[3].innerHTML = location.port;
loc[0].getElementsByTagName('span')[4].innerHTML = location.hostname;

browser[0].getElementsByTagName('span')[0].innerHTML = navigator.appName;
browser[0].getElementsByTagName('span')[1].innerHTML = navigator.appVersion;
browser[0].getElementsByTagName('span')[2].innerHTML = navigator.platform;
browser[0].getElementsByTagName('span')[3].innerHTML = navigator.language;
browser[0].getElementsByTagName('span')[4].innerHTML = navigator.cookieEnabled;

scr[0].getElementsByTagName('span')[0].innerHTML = screen.height;
scr[0].getElementsByTagName('span')[1].innerHTML = screen.width;
scr[0].getElementsByTagName('span')[2].innerHTML = screen.pixelDepth;

his[0].getElementsByTagName('span')[0].innerHTML = history.length;
his[0].getElementsByTagName('span')[1].innerHTML = history.state;


