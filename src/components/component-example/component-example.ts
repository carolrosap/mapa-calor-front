import template from './component-example.html';
import axios from 'axios';

export class ComponentExample {

  async render (page: string): Promise<void> {
    const element = document.createElement('div');
    element.classList.add('container-fluid');
    element.insertAdjacentHTML('beforeend', template);

    const content = document.querySelector('#content');
    content?.appendChild(element);

    //const navigation = new Navigation();
    //navigation.render('gridProducts');

    //await this.showGrid(page);
  }

 

  


}
