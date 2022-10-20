const makeSearchBtn = () => {
    const gRightDiv = document.getElementsByClassName('gRight')[0]
    if(gRightDiv !== undefined){
        gRightDiv.innerHTML = ''
    }

    // JSON 요청이 왔다는 전제
    const addButtonElement = document.createElement('button');
    addButtonElement.classList = 'btnToggle';
    addButtonElement.innerText = '카테고리 찾기';
    addButtonElement.id = 'search__category__button'
    addButtonElement.setAttribute('style', 'background-color: #336666; color: white;')

    addButtonElement.addEventListener('click', (event) => {
        event.preventDefault()
        getShoppingMallCategory()
    })

    gRightDiv.appendChild(addButtonElement)
}

const makeSearchESMBtn = () => {
    const gRightDiv = document.getElementsByClassName('gRight')[0]
    if(gRightDiv === undefined)
        return false;

    // JSON 요청이 왔다는 전제
    const addButtonElement = document.createElement('button');
    addButtonElement.classList = 'btnToggle';
    addButtonElement.innerText = 'ESM 찾기';
    addButtonElement.id = 'search__ESM__button'
    addButtonElement.setAttribute('style', 'background-color: #336666; color: white;')

    addButtonElement.addEventListener('click', (event) => {
        event.preventDefault()
        $('td div div.mBox.typeBg.gScroll.gDoubleBreak ul').each((idx, item) => {
            item.childNodes[0].childNodes[2].click()
        })
    })

    gRightDiv.appendChild(addButtonElement)
}