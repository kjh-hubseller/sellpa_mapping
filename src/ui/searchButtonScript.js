const makeSearchBtn = () => {
    const gRightDiv = document.getElementsByClassName('gRight')[0]
    let idx = 1;
    if(gRightDiv !== undefined){
        gRightDiv.innerHTML = ''
    }

    // JSON 요청이 왔다는 전제
    const addButtonElement = document.createElement('button');
    addButtonElement.classList = 'btnToggle selected';
    addButtonElement.innerText = '카테고리 찾기';
    addButtonElement.id = 'search__category__button'

    addButtonElement.addEventListener('click', (event) => {
        event.preventDefault()
        getShoppingMallCategory()
    })

    gRightDiv.appendChild(addButtonElement)
}