/* global $ */

var clickOrTouch = (('ontouchend' in window)) ? 'touchend' : 'click';

$('.teaser').on(clickOrTouch, function () {
  $('body').addClass('lock')
  $('.controls').show()
  var index = $(this).index() + 1
  var story = $('.story:nth-child(' + index + ')')
  story.addClass('is-active')
})

$('.controls-all').on(clickOrTouch, function () {
  $('body').removeClass('lock')
  $('.controls').hide()
  $('.is-active').removeClass('is-active')
})

$('.controls-next').on(clickOrTouch, function () {
  var index = $('.is-active').index() + 2
  $('.is-active').removeClass('is-active')
  var story = $('.story:nth-child(' + index + ')')
  console.log('foo', index)
  story.addClass('is-active')
})
