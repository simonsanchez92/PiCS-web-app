const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const form = document.getElementById('form');
const resultsContainer = document.getElementById('results-container');

const header = document.querySelector('header');
const resultMessage = document.querySelector('#searched-text');

const loading = document.querySelector('.loader');

const apiKey = '17171939-b41177b1959a63aaafc621289';



let page = 1;
let searchText;

async function getPictures() {

    searchBar.value = '';


    const res = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchText}&per_page=12&page=${page}`);
    const data = await res.json();

    if (data.total === 0) {
        resultMessage.innerText = `No results for '${searchText}'... try again!`;
    } else {
        resultMessage.innerText = `Results for '${searchText}':`;
    }

    return data;


}

async function showPictures() {

    if (searchText) {

        const pictures = await getPictures();

        pictures.hits.forEach(picture => {
            let pictureElement = document.createElement('div');
            pictureElement.classList.add('photo-container');
            pictureElement.innerHTML = `
    
                <img src='${picture.largeImageURL} alt='${picture.tags}'></img>
    
                <div class='image-detail'>
                <span>${picture.user}</span>
                <div class='image-icons'>
                <i class="far fa-thumbs-up"></i>${picture.likes}
                <i class="far fa-star"></i>${picture.favorites}
                <i class="far fa-comment"></i>${picture.comments}
                </div>
                </div>
                 `
            resultsContainer.appendChild(pictureElement);

        });
        console.log(pictures);

    } else {
        return;
    }





}


//show loader and fetch more posts
function showLoading() {

    if (searchText !== undefined) {
        loading.classList.add('show');
        setTimeout(() => {
            loading.classList.remove('show');
            setTimeout(() => {

                page++;
                showPictures();


            }, 300);
        }, 1000);
    }

}



//Event listeners

// searchBtn.addEventListener('click', showPictures);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultsContainer.innerHTML = '';

    if (searchBar.value !== '') {
        searchText = searchBar.value;
    }

    showPictures();

});


window.addEventListener('scroll', e => {
    const scrollY = e.path[1].scrollY;

    if (scrollY === 0) {
        header.style.backgroundColor = 'transparent';
    } else if (scrollY > 150) {
        header.style.backgroundColor = '#070707f6';
    }
});


window.addEventListener('scroll', (e) => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    };
});
