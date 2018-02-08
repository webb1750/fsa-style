import _ from 'lodash';
import './styles/index.scss';


function component(){
  
  let holder = document.createElement('div',[{'class':'fake'}]);
  let content = document.createTextNode('I like turtles.')
  
  return holder.appendChild(content);
}

document.body.appendChild(component);
