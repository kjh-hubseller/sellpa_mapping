const makeSearchBtn = () => {
    const gRightDiv = document.getElementsByClassName('gRight')[0]
    let idx = 1;
    if(gRightDiv !== undefined){
        gRightDiv.innerHTML = ''
    }

// 2. 옵저버 인스턴스 생성
    const observer = new MutationObserver(function(mutations) {
        if(mutations.length > 0){
            const mutation = mutations[0]
            let isExist = false
            for(let child of mutation.target.childNodes){
                if(child.innerText == categoryNames[idx]){
                    mutation.target.value = child.value
                    isExist = true;
                    break;
                }
            }
            if(isExist){
                idx++;
                mutation.target.dispatchEvent(new Event('change'))
            }
        }
        console.log("==========================")
    });

// 3. 옵션 설정
    const config = {
        attributes: true
    };


// JSON 요청이 왔다는 전제
//     const categoryNumber = jsonTargetWords['Number'].split('>');
//     const categoryNames = jsonTargetWords['Name'].split('>');
    const addButtonElement = document.createElement('button');
    addButtonElement.classList = 'btnToggle selected';
    addButtonElement.innerText = '카테고리 찾기';

    addButtonElement.addEventListener('click', (event) => {
        event.preventDefault()
        const category_list = document.getElementById('s__category__list')
        if(category_list.value === ''){
            alert('허브셀러 카테고리를 정해주세요')
            return
        }
        console.log("HELLO", getShoppingMallCategory(document.getElementById('s__category__list').innerText))
        categoryList = [...document.getElementsByClassName('mBoard')[0].
        getElementsByTagName('table')[0].
        getElementsByTagName('tr')].slice(1)

        categoryList.forEach((elem) => {
            const elements = [...elem.childNodes[5].children].filter(node => node.tagName === "SELECT")
            for(const element of elements){
                // 생성한 MutationObserver Object를 Select 태그에 할당
                observer.observe(element, config);
            }
            if(elements.length > 0){
                idx = 1;
                elements[0].value = categoryNumber[0]
                elements[0].dispatchEvent(new Event('change'))
            }
        })
    })

    gRightDiv.appendChild(addButtonElement)
}