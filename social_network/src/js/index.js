let createBtn = document.getElementById('add-tweet');
let formTweet = document.querySelectorAll('.tweet-form');
let searchInput = document.getElementById('search');
let roots = document.getElementById('root');
const tabArr = document.querySelectorAll('.tabs');
const tabs = document.querySelector('.topnav');
const tabsContent = [document.querySelector('[data-twitts]'), document.querySelector('[data-following]'),
                     document.querySelector('[data-followers]')]

let time = new Date();
let search = false;

function tabsFunc() {
  let tweetsClasses = tabsContent[0];
  let followingClasses = tabsContent[1];
  let followersClasses = tabsContent[2];
  const tabVal = this.firstChild.nextSibling.innerText;
  for(let tab of Object.entries(tabs.children)){
    if(Boolean(tab[1].classList.value.includes('active')) === true){
      tab[1].classList.value = tab[1].classList.value.replace('active', '')
    }
  }
  switch (tabVal) {
    case 'Tweets':
      followersClasses.classList.remove('d-flex');
      followersClasses.classList.add('d-none');
      followingClasses.classList.remove('d-flex');
      followingClasses.classList.add('d-none');
      tweetsClasses.classList.remove('d-none');
      tweetsClasses.classList.add('d-flex'); break;
    case 'Following':
      tweetsClasses.classList.remove('d-flex');
      tweetsClasses.classList.add('d-none');
      followersClasses.classList.remove('d-flex');
      followersClasses.classList.add('d-none');
      followingClasses.classList.remove('d-none');
      followingClasses.classList.add('d-flex'); break;
    case 'Followers':
      tweetsClasses.classList.remove('d-flex');
      tweetsClasses.classList.add('d-none');
      followingClasses.classList.remove('d-flex');
      followingClasses.classList.add('d-none');
      followersClasses.classList.remove('d-none');
      followersClasses.classList.add('d-flex'); break;
  }

  console.log(typeof this.className)
  if(!!this.classList.value.indexOf('active')){
    this.classList.value = this.classList.value.concat(' active');
  }
}

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

// if(searchInput){                               SEARCH!!!!!!
//   searchInput.addEventListener('keypress', e =>{
//     if(e.keyCode === 13){
//       if(search === false){
//         search = searchInput.value;
//         // client.innerHTML = `Your nickname ${user}`;
//         searchInput.value = '';
//         console.log(keyCode)
//         return
//       }
//     }
//   })
// }

$(document).ready(function () {

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

  });


createBtn.addEventListener('click', tweet);

tabArr.forEach(tab =>tab.addEventListener('click', tabsFunc))