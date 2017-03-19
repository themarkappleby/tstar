/* global $ */

$(function() {
  FastClick.attach(document.body)
});

$('.teaser').on('click', function () {
  $('body').addClass('lock')
  $('.controls').show()
  var index = $(this).index() + 1
  var story = $('.story:nth-child(' + index + ')')
  story.addClass('is-active')
})

$('.controls-all').on('click', function () {
  $('body').removeClass('lock')
  $('.controls').hide()
  $('.is-active').removeClass('is-active')
})

$('.controls-next').on('click', function () {
  var index = $('.is-active').index() + 2
  $('.is-active').removeClass('is-active')
  var story = $('.story:nth-child(' + index + ')')
  story.addClass('is-active')
})
