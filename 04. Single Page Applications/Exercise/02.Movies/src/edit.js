/*
VS will aoutomatically import it once we start typing the function bellow and then press Tab
it's important to use single quotes and to add the .js extention at the end
*/
import { showView } from './dom.js';

const section = document.getElementById('edit-movie');
section.remove();

//showView has to be public to other modules, thus we use "export" in front of the funtion
export function showEdit(){
    showView(section);
}