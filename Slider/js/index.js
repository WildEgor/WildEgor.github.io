import { Slider } from './slider.js';

document.addEventListener('DOMContentLoaded', function(){
  new Slider({
    sliderId: 'categorySlider',
    scrollId: 'categorySliderScroll',
    pagerId: 'categorySliderPager',
    contentId: 'categorySliderContent'
  }).init();
})