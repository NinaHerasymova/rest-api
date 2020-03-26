let createBtn = document.getElementById('add-tweet');
let formTweet = document.querySelectorAll('.tweet-form');
let searchInput = document.getElementById('search')
let roots = document.getElementById('root');
let time = new Date();
let search = false;

function tweet() {
  if (formTweet[0].value === '') {
    alert('Write text!');
  } else {
    const newTable = document.createElement('div');
    newTable.className =
      'flex-tweet row container col-lg-9 border-dar tweet mt-3 pb-2';
    roots.insertBefore(newTable, roots.firstChild);

    const newId = document.createElement('div');
    newId.className = 'h2 text-dark font-weight-normal pt-3';
    newId.innerHTML = document.querySelectorAll('.tweet-form')[0].value;
    newTable.appendChild(newId);

    const timeTweet = document.createElement('div');
    timeTweet.className = 'pt-3';
    timeTweet.innerHTML = time.getHours() + ':' + time.getMinutes();
    newTable.insertBefore(timeTweet, newTable.firstChild);

    const btn = document.createElement('div');
    btn.className = 'btn__new-tweet';
    newTable.appendChild(btn);

    const share = document.createElement('button');
    share.className = 'fas fa-share flip-icon pr-2 p icon btn';
    btn.appendChild(share);

    const retweet = document.createElement('button');
    retweet.className = 'fas fa-retweet pr-2 icon btn';
    btn.appendChild(retweet);

    const star = document.createElement('button');
    star.className = 'fas fa-star pr-2 icon btn ';
    btn.appendChild(star);

    formTweet[0].value = '';
  }
}


searchInput.addEventListener('keypress', e =>{
  if(e.keyCode === 13){
      if(search === false){
          search = searchInput.value;  
          // client.innerHTML = `Your nickname ${user}`;
          searchInput.value = '';
          console.log(keyCode)
          return
      }
      // if(input.value === ''){
      //   e.preventDefault()
      // }
      // input.value = ''
  }
})

createBtn.addEventListener('click', tweet);
