// news category load
const loadNewsCategory = () => {
    fetch(' https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(error))
}
// news category display
const displayNewsCategory = newsCategory => {
    const newsCategoryField = document.getElementById('news-category')
    newsCategory.forEach(category => {
        const categoryName = document.createElement('li')
        categoryName.classList.add('nav-item')
        categoryName.innerHTML = `
                    <a onclick="searchNews('${category.category_id}')" class="nav-link  me-lg-4 me-xxl-5 fw-semibold" aria-current="page" href="#">${category.category_name}</a>
        `
        newsCategoryField.appendChild(categoryName)
    })
}

loadNewsCategory()

// load news
const loadNews = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}
// display news
const displayNews = news => {
    console.log(news)
    news.sort((a, b) => b.total_view - a.total_view);
    const newsField = document.getElementById('news-container')
    newsField.innerHTML = ''
    news.forEach(n => {

        const newsDiv = document.createElement('div')
        newsDiv.classList.add("col");
        newsDiv.innerHTML = `
    <div class="card h-100">
        <img src="${n.thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-semibold">${n.title}</h5>
          <p class="card-text">${n.details.slice(0, 200)}...</p>
        </div>
        <div class=" d-flex justify-content-between align-items-center ms-4 my-4">
            <div class="d-flex  align-items-center ms-3 ">
            <img src="${n.author.img}" class="img-fluid  rounded-circle" alt="..." width="50" height="50" >
                <div class="ms-2 ">
                <h6 >${n.author.name ? n.author.name : ''}</h6>
                </div>
            </div>
            <div class="ms-3 ">
                <h5 >${n.total_view ? n.total_view : ''}</h5>
            </div>
            <div class="me-3 ">
            <button onclick="loadNewsDetails('${n._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">More</button>
            </div>
        </div>
    </div>
        `
        newsField.appendChild(newsDiv)
    })
    toggleSpinner(false)
    const newsCount = document.getElementById('news-count')
    newsCount.innerText = news.length
}
// search news category

const searchNews = (id) => {
    loadNews(id)
    toggleSpinner(true)
}
// loading spinner
const toggleSpinner = isLoading => {
    const newsLoading = document.getElementById('news-loading')
    if (isLoading) {
        newsLoading.classList.remove('d-none')
    }
    else {
        newsLoading.classList.add('d-none')
    }
}
loadNews('01')
// load news details
const loadNewsDetails = id => {
    fetch(` https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error))
}
// display news details
const displayNewsDetails = news => {
    const newsTitle = document.getElementById('newsDetailsModalLabel')

    newsTitle.innerText = `${news.title}`;
    const newsDetailsBody = document.getElementById('newsDetailsBody')
    newsDetailsBody.innerHTML = `
    <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
    <h6 >Author Name: ${news.author.name ? news.author.name : 'No author name'}</h6>
    <h6 >Total View: ${news.total_view ? news.total_view : 'No view count'}</h6>
    <h6 >Rating: ${news.rating.number ? news.rating.number : 'No rating'}</h6>
    <p >Details: ${news.details ? news.details : 'No Details'}</p>
    <p >Published Details: ${news.author.published_date ? news.author.published_date : 'No Details'}</p>
    `
}
