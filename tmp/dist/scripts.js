/* global $ */

$(function() {
  FastClick.attach(document.body)
});

$('.teaser').on('click', function () {
  $('body').addClass('lock')
  $('.controls').show()
  $('.stories').addClass('is-active')
  $('.story.is-active').removeClass('is-active')
  var index = $(this).index() + 1
  var story = $('.story:nth-child(' + index + ')')
  story.addClass('is-active')
})

$('.controls-all').on('click', function () {
  $('body').removeClass('lock')
  $('.controls').hide()
  $('.stories.is-active').removeClass('is-active')
})

$('.controls-next').on('click', function () {
  var index = $('.story.is-active').index() + 2
  $('.story.is-active').removeClass('is-active')
  var story = $('.story:nth-child(' + index + ')')
  story.addClass('is-active')
})
