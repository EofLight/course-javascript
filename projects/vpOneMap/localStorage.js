export default class myLocalStorage {
  constructor() {}

  getReviewsByCoords(coords) {
    const result = [];

    const allreviews = JSON.parse(localStorage.getItem(`data`));

    if (allreviews === null) return result;
    console.log(allreviews);
    for (const item of allreviews) {
      if (
        item.coords.length === coords.length &&
        item.coords.every((el, ix) => el === coords[ix])
      ) {
        console.log('tut');
        result.push(item.review);
      }
    }
    console.log(result);

    return result;
  }

  saveReview(data) {
    const result = [];
    try {
      const allreviews = JSON.parse(localStorage.getItem(`data`));
      if (allreviews === null) result.push(data);
      else {
        for (const item of allreviews) {
          result.push(item);
        }
        result.push(data);
      }
    } catch (e) {
      console.log(e.message);
    }

    localStorage.setItem(`data`, JSON.stringify(result));
  }
}
