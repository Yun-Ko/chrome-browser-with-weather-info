const quotes =Array(
  {quote: "Life is much better when you are living in the present moment", author:"unknown"},
  {quote: "Not in doing what you like, but in liking what you do is the secret of happiness", author:"J.M.BARRIE"},
  {quote: "If you change the way you look at things, the things you look at change.", author:"WAYNE DYER"}
)

const quote =document.querySelector('#quote span:first-child')
const author =document.querySelector('#quote span:last-child')

const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)]


quote.innerText=todaysQuote.quote;
author.innerText=todaysQuote.author;
