const makeSearchHubsellerCategory = () => {
    const htmlCode = `<span id="n__category" style="width:15%; padding-right: 20px">카테고리 : </span>
                      <input type="text" id="searchText" class="fText" style="width:70%">
                      <input type="button" id="searchBtn" value="검색" style="width:20%" class="btnToggle selected">
                      <select name="s__category__list" id="s__category__list" style="width:100%; margin-top: 5px;" class="fSelect">
                      </select>
                      
    `
    const modal_body = document.getElementsByClassName('modal-body')[0]
    const c_div = document.createElement('div')
    c_div.innerHTML = htmlCode
    modal_body.insertBefore(c_div, modal_body.childNodes[3])

    document.getElementById('searchBtn').addEventListener('click', (e) => {
        e.preventDefault()
        getCategory()
    })
    document.getElementById('searchText').addEventListener('keydown', (e) => {
        if(e.key === "Enter"){
            e.preventDefault()
            getCategory()
        }
    })
}

const getCategory = () => {
    const searchText = document.getElementById('searchText').value

    if(searchText !== '')
        getHubsellerCategory(searchText)
    else
        alert('검색어가 비어있습니다.')
}