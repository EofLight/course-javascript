export default class myLocalStorage {
  constructor() {}

  getReviewsByCoords(coords) {
    const result = [];
    //console.log(localStorage.getItem('data'));
    const allreviews = JSON.parse(localStorage.getItem(`data`));

    if (allreviews === null) return result;
    console.log(allreviews);
    for (const item of allreviews) {
      //   console.log(item.coords);
      //   console.log(coords);
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
    //console.log(data);
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
      //console.log('dont first');
      //console.log(allreviews);
      //console.log('first');
    } catch (e) {
      console.log(e.message);
    }
    //console.log(JSON.stringify(result));
    localStorage.setItem(`data`, JSON.stringify(result));
  }
}

/*export default class myLocalStorage {
  constructor() {
  }

  getReviewsByCoords(coords) {
    let result = [];
    //console.log(localStorage.getItem('data'));
    const allreviews = localStorage.getItem(`${coords}`);
    //console.log(allreviews)
    if (!allreviews) return new Array();
    for (const item in allreviews) {
        result.push(JSON.parse(item).review);
    }
    //console.log(result);
    return result;
  }

  saveReview(coords, review) {
    //console.log(data);
    let result = [];
    try {
      const allreviews = JSON.parse(localStorage.getItem(`${coords}`));
      if (allreviews === null) result.push(JSON.stringify(review));
      else {
        result.push(JSON.stringify(allreviews));
        result.push(JSON.stringify(review));
      }
      //console.log('dont first');
      //console.log(allreviews);
      //console.log('first');
    } catch (e) {
      console.log(e.message);
    }
    console.log(result);
    localStorage.setItem(`${coords}`, result);
  }

  getPlacemark()
  {   
    let result=[];
    
    return Object.keys(localStorage);
  }
}
*/
