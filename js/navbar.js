const loadNewsCategory = () => {
    fetch(' https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
}
const displayNewsCategory = newsCategory => {
    const newsCategoryField = document.getElementById('news-category')
    newsCategory.forEach(category => {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
                    <a class="navbar-brand" href="#">${category.category_name}</a>
        `
        newsCategoryField.appendChild(categoryDiv)
    })
}
loadNewsCategory()

const loadNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/category/01')
        .then(res => res.json())
        .then(data => displayNews(data.data))
}
const displayNews = news => {


    const newsField = document.getElementById('news-container')

    news.forEach(n => {
        console.log(n)
        const newsDiv = document.createElement('div')
        newsDiv.classList.add("col");
        newsDiv.innerHTML = `
    <div class="card h-100">
        <img src="${n.thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${n.title}</h5>
          <p class="card-text">${n.details}</p>
        </div>
        <div class=" d-flex justify-content-between align-items-center ms-4 my-4">
            

            <div class="d-flex  align-items-center ms-3 ">
            <img src="${n.author.img}" class="img-fluid  rounded-circle" alt="..." width="50" height="50" >
               
                <div class="ms-2 ">
                <h6 >${n.author.name}</h6>
                </div>
            </div>
            <div class="ms-3 ">
                <h5 >${n.total_view}</h5>
               
            </div>
            <div class="me-3 ">
            <button class="btn btn-primary">More</button>
                
            </div>
        </div>
    </div>
        `
        newsField.appendChild(newsDiv)
    })
}
loadNews()
/* 
 
 <div class="col">
    <div class="card ">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      
    </div>
  </div>
    
  
*/
