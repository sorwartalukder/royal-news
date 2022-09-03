const loadNewsCategory = () => {
    fetch(' https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
}
const displayNewsCategory = newsCategory => {
    const newsCategoryField = document.getElementById('news-category')
    newsCategory.forEach(category => {
        console.log(category)
        const categoryDiv = document.createElement('nav')
        // categoryDiv.classList.add('navbar')
        categoryDiv.innerHTML = `
                <div class="d-flex">
                    <a class="navbar-brand" href="#">${category.category_name}</a>
                </div>
        `
        newsCategoryField.appendChild(categoryDiv)
    })
}
loadNewsCategory()