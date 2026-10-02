import { Model } from '../models/Model';
import { HasId } from '../models/ApiSync';

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((e) => {
        e.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    //   {
    //   userShow: '.user-show',
    //   userForm: '.user-form',
    // };

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateElment = document.createElement('template');
    templateElment.innerHTML = this.template();

    this.bindEvents(templateElment.content);
    this.mapRegions(templateElment.content);
    // console.log(this.regions);

    this.onRender();

    this.parent.append(templateElment.content);
  }
}
