const post_container = document.querySelector('.post-container');

const loader = document.querySelector('.loader');
const filter = document.querySelector('.filter');

let limit = 3;
let page = 1;

const getPosts = async () => {
   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
   if(res.status !== 200) {
      throw new Error('cannot fetch the data');
   }
   const data = await res.json();
   return data;
}

const showPosts = async () => {
   const posts = await getPosts();
   posts.forEach(post => {
      const post_el = document.createElement('div');
      post_el.classList.add('post');
      post_el.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>`
        post_container.appendChild(post_el);
   });
}

showPosts();

const showLoading = () => {
   loader.classList.add('show');
   setTimeout(() => {
      loader.classList.remove('show');
      setTimeout(() => {
         page++;
         showPosts();
      }, 300);
   }, 1000);
}
const filterPosts = (e) => {
   const term = e.target.value.toUpperCase();
   const posts = document.querySelectorAll('.post');
   posts.forEach(post => {
      const title = post.querySelector('.post-title').innerText.toUpperCase();
      const body = post.querySelector('.post-body').innerText.toUpperCase();
      if(title.indexOf(term) != -1 || body.indexOf(term) != -1) {
         post.style.display = 'flex';
      } else {
         post.style.display = 'none';
      }
   });
};
window.addEventListener('scroll', () => {
   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
   
   if(scrollTop + clientHeight >= scrollHeight - 5) {
      showLoading();
   }
});

filter.addEventListener('input', filterPosts);