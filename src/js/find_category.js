/**
 * ssg(종합몰 x)
네이버쇼핑
쿠팡
위메프
인터파크
옥션
g마켓
티몬
롯데온
11번가
카카오톡
하프클럽
쇼피 싱가포르
 */
/*
document.getElementById('eMarketCategory1_auction_b2bhub').value=27000000
document.getElementById('eMarketCategory1_auction_b2bhub').dispatchEvent(new  Event('change'))
*/
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
            console.log(child)
            console.log(categoryNames[idx])
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
const jsonTargetWords = { 
    // Number : '100000048>200002959>300029805',
    Number : '86000000>86210000>86210100',
    // Name : 'e쿠폰>교육/어학이용권>온라인교육/외국어'
    Name : 'e쿠폰/모바일상품권>교육/어학이용권>온라인교육/외국어'
}

const categoryNumber = jsonTargetWords['Number'].split('>');
const categoryNames = jsonTargetWords['Name'].split('>');
const addButtonElement = document.createElement('button');
addButtonElement.classList = 'btnToggle selected';
addButtonElement.innerText = '카테고리 찾기';

addButtonElement.addEventListener('click', (event) => {
    event.preventDefault()

    categoryList = [...document.getElementsByClassName('mBoard')[0].
                    getElementsByTagName('table')[0].
                    getElementsByTagName('tr')].slice(1)
    const elements_ary = []
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
    }
)
})
gRightDiv.appendChild(addButtonElement)