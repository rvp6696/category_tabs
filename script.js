
let catTabs = document.querySelectorAll('.tab')

function changeTab(clickedTab) {
    catTabs.forEach(tab => tab.classList.remove('active'))
    clickedTab.classList.add('active')
}


let fetchData = async (category) => {
    let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    let temp = ""
    let loader = `<div class="loader"></div>`
    
    document.getElementById("resultContainer").innerHTML = loader

    await fetch(url)
        .then(response => response.json())
        .then((data) => {
            const categoryData = data.categories.filter(product => product.category_name === category)

            categoryData.map((productData, index) => {
                let details = productData.category_products

                details.map((productInfo, index) => {
                    const badgeText = badgeName(productInfo.badge_text)
                    const badgeDataClass = badgeText === null ? 'hidden' : 'badgeData'

                    temp +=
                        `<div class="cards">
                            <label class="imgData"> <img loading="lazy" src="${productInfo.image}" alt="${productInfo.title}"/> <p class="${badgeDataClass}"> ${badgeText} </p> <label>
                    
                            <h3><label> ${productInfo.title} </label> <ul><li>${productInfo.vendor}</li></ul></h3>

                            <h4> Rs ${productInfo.price} <label>  &nbsp &nbsp <del>${productInfo.compare_at_price}</del> </label> &nbsp &nbsp 
                    
                            <label> ${discountValue(productInfo.price, productInfo.compare_at_price)}% Off</label> </h4>

                            <button class="cartBtn"> Add to Cart </button>
                        </div>`
                })
                document.getElementById("resultContainer").innerHTML = temp
            })
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })
}


let discountValue = (price, compareAtPrice) => {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100
    const discountPercentage = Math.round(discount * 100) / 100
    return discountPercentage
}

let badgeName = (badgeinfo) => {
    if (badgeinfo == null) {
        return null
    } else {
        return badgeinfo

    }
}


