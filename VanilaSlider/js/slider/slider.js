'use strict'

// Создаем прототип Slider
var Slider = function (slider){
  this.slider = document.getElementById(slider.sliderId); // Получить контейнер categorySlider
  this.slideList = this.slider.getElementsByClassName('js-slide-list')[0]; // Список ul
  this.slideListItems = this.slider.getElementsByClassName('js-slide-list-item'); // Массив элементов li
  this.slideWidth = this.slideListItems[0].offsetWidth; // Ширина элемента li
  this.slidesLength = this.slideListItems.length; // Количество элементов li
  this.sliderScroll = document.getElementById(slider.scrollId);
  this.sliderPager = document.getElementById(slider.pagerId);
  this.sliderContent = document.getElementById(slider.contentId);
  this.current = 1; // Начальное значение (показать с первого слайда)
  this.direction; // Направление куда переместить слайд
  this.animating = false; // ???
};

// Расширяем прототип Slider свойствами и методами
Slider.prototype = {
  constructor : Slider, // В качестве конструктора выступает Slider
  // Функция инициализации слайдера. Навешивает eventHandler-ы, копирует 1 и последний элементы списка
  init : function() {
    this.checkNav();
    this.listenEvents();
    this.cloneFirstAndLastItem();
    this.showCurrentContent(this.current);
  },

  getCurrentSliderIndex: function () {

  },

  checkNav: function () {
    var self = this; // Копируем контекст 
    console.log(self.sliderScroll.getElementsByClassName('js-arrow-button'));
    if (self.sliderScroll.getElementsByClassName('js-arrow-button').length)
      this.arrowButtons = self.sliderScroll.getElementsByClassName('js-arrow-button'); // Кнопки навигации  
    if (self.sliderPager.getElementsByClassName('js-pager-item').length)
      this.pagerItems = self.sliderPager.getElementsByClassName('js-pager-item'); // Перемещение через ссылки
    if (self.sliderContent.getElementsByClassName('js-content-item').length)
      this.showContent = self.sliderContent.querySelectorAll('.js-content-item')
  },
  // Функция навешивает eventHandler-ы 
  listenEvents : function(){
    var self = this; // Копируем контекст 
    if (self.hasOwnProperty('arrowButtons')) {
      for (var i = 0; i < this.arrowButtons.length; i++) {
        this.arrowButtons[i].addEventListener('click', function(){
          self.clickArrowButton( this );
        });
      };
    }
    if (self.hasOwnProperty('pagerItems')) {
      for (var i = 0; i < self.pagerItems.length; i++){
        self.pagerItems[i].addEventListener('click', function(){
          self.clickPagerItem( this );
        });
      };
    }
  },
  
  cloneFirstAndLastItem : function(){
    var firstSlide = this.slideListItems[0];
    var lastSlide = this.slideListItems[ this.slidesLength - 1 ];
    var firstSlideClone = firstSlide.cloneNode( true );
    var lastSlideClone = lastSlide.cloneNode( true );
    
    // Remove data-slide-index for pager items to choose correct target
    firstSlideClone.removeAttribute('data-slide-index');
    lastSlideClone.removeAttribute('data-slide-index');
    
    this.slideList.appendChild( firstSlideClone );
    this.slideList.insertBefore( lastSlideClone, firstSlide );
  },

  clickArrowButton : function( el ){
    var direction = el.getAttribute('data-direction');
    var pos = parseInt( this.slideList.style.left ) || 0;
    var newPos; 
    // direction will be added to current slide number
    this.direction = direction === 'prev' ? -1 : 1;
    newPos = pos + ( -1 * 100 * this.direction );
    if( !this.animating ) {
      this.slideTo(this.slideList, function( progress ){
        return Math.pow(progress, 2);
      }, pos, newPos, 500);
      // Update current slide number
      this.current += this.direction;
    }
  },
  
  clickPagerItem : function( el ){
    var slideIndex = el.getAttribute('data-slide-index');
    var targetSlide = this.slider.querySelector('.js-slide-list-item[data-slide-index="' + slideIndex +'"]');
    var pos = parseInt( this.slideList.style.left ) || 0;
    var newPos = Math.round( targetSlide.offsetLeft / targetSlide.offsetWidth ) * 100 * -1;
    
    if( !this.animating && pos !== newPos ){
      this.slideTo(this.slideList, function( progress ){
        return Math.pow(progress, 2);
      }, pos, newPos, 500);
      // Update current slide number
      this.current = parseInt(slideIndex) + 1;
    }
    
  },

  slideTo : function( element, deltaFunc, pos, newPos, duration ){
   this.animating = true;
   this.animate({
     delay: 1,
     duration: duration || 1000,
     deltaFunc: deltaFunc,
     step: function( delta ){
       var direction = pos > newPos ? 1 : -1
       element.style.left = pos  + Math.abs(newPos - pos) * delta * direction * -1 + '%';
     }
   }); 
  },
  
  animate : function( opts ){
    var that = this;
    var start = new Date();
    var id = setInterval(function(){
      var timePassed = new Date - start;
      var progress = timePassed / opts.duration;
      
      if( progress > 1 ) {
        console.log('Progress');
        progress = 1;
      }
      var delta = opts.deltaFunc( progress );
      opts.step( delta );
      
      if( progress === 1 ){
        console.log('Stop');
        clearInterval( id );
        that.animating = false;
        that.checkCurrentSlide();
      }
    }, opts.delay || 10 );
  },
  
  checkCurrentSlide : function( ){
    var cycle = false;
    //this.current += this.direction;
    // Are we at the cloned slides? 
    cycle = !!( this.current === 0 || this.current > this.slidesLength )
    if ( cycle ) {
      // update current in order to adapt new slide list
      // we'll use current value to relocate slide list
      this.current = ( this.current === 0 ) ? this.slidesLength : 1;
      // For 4 x 600px slides, 
      // left pos will be either -600px (first slide clone -> first slide)       // or -2400px (last slide clone -> fourth slide)
      this.slideList.style.left = ( -1 * this.current * 100 ) + '%';
    } 
    this.showCurrentContent(this.current)
  },
  
  showCurrentContent: function (indx) {
    let self = this

    console.log(indx);

    for (let i = 0; i < self.showContent.length; i++) {
      let mySpans = self.showContent[i].querySelectorAll('span');
      for(let item of mySpans) {
        console.log(item.getAttribute('data-slider-content-index'));
        if (+item.getAttribute('data-slider-content-index') !== indx - 1) {
          item.style.display = 'none'
        } else {
          item.style.display = 'block'
        }
      }
    }
  }
};

export {Slider}