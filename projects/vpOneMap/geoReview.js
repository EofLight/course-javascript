import InteractiveMap from './interactiveMap.js';
import myLocalStorage from './localStorage.js';

export default class GeoReview {
  constructor() {
    this.formTemplate = document.querySelector('#addFormTemplate').innerHTML;
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
    this.storage = new myLocalStorage();
  }

  async onInit() {
    const allreviews = JSON.parse(localStorage.getItem(`data`));
    for (const item of allreviews) {
      this.map.createPlacemark(item.coords);
    }

    document.body.addEventListener('click', this.onDocumentClick.bind(this));
  }

  createForm(coords, reviews) {
    const root = document.createElement('div');
    root.innerHTML = this.formTemplate;
    const reviewList = root.querySelector('.review-list');
    const reviewForm = root.querySelector('[data-role=review-form]');
    reviewForm.dataset.coords = JSON.stringify(coords);

    for (const item of reviews) {
      const div = document.createElement('div');
      div.classList.add('review-item');
      div.innerHTML = `
    <div>
      <b>${item.name}</b> [${item.place}]
    </div>
    <div>${item.text}</div>
    `;
      reviewList.appendChild(div);
    }

    return root;
  }

  onClick(coords) {
    this.map.openBalloon(coords, 'Загрузка...');
    const list = this.storage.getReviewsByCoords(coords);
    const form = this.createForm(coords, list);
    this.map.openBalloon(coords, form.innerHTML);
  }

  async onDocumentClick(e) {
    if (e.target.dataset.role === 'review-add') {
      const reviewForm = document.querySelector('[data-role=review-form]');
      const coords = JSON.parse(reviewForm.dataset.coords);
      const data = {
        coords,
        review: {
          name: document.querySelector('[data-role=review-name]').value,
          place: document.querySelector('[data-role=review-place]').value,
          text: document.querySelector('[data-role=review-text]').value,
        },
      };
      //console.log(JSON.stringify(data));
      try {
        await this.storage.saveReview(data);
        this.map.createPlacemark(coords);
        this.map.closeBalloon();
      } catch (e) {
        const formError = document.querySelector('.form-error');
        formError.innerText = e.message;
      }
    }
  }
}
