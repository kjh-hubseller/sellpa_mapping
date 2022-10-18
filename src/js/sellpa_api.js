const login = (curData, site_url) => {
    $.ajax({
        method: "POST",
        url: site_url,
        dataType: "json",
        crossDomain: true,
        data: curData,
        success: function(res) {
            const {
                RET_ALL:isSuccess = "N",
                MEMBER_SM_AUTH_CODE: memberCode = ""
            } = res

            if (isSuccess !== "N"){
                chrome.storage.sync.set({
                    'isLoggined': "Y",
                    'site_url': site_url,
                    'user_id': curData.memberId,
                    'api_key': memberCode.trim(),
                    'login_time': cur_datetime()
                }, _ => {
                    alert('로그인이 완료되었습니다.')
                    window.close()
                })
            }else{
                alert('아이디 또는 패스워드를 확인해 주세요.')
            }
        },
        error: function(xhr, status) {
            console.log(xhr)
            console.log(status)
        }
    })
}
/**
 * category search method
 * @param searchField code or name
 * @param categoryCN cateCode(3 ~ 12) or cateName(티셔츠)
 */
const getHubsellerCategory = (categoryCN = '', searchField = 'name') => {
    chrome.storage.sync.get(['api_key', 'user_id'], item => {
        const curData = {
            'memberId': item['user_id'],
            'apiKeySig': item['api_key'],
            'apiTime': cur_datetime(),
            'mode': 'list',
            'searchField' : searchField,
            'searchKey': categoryCN
        }
        $.ajax({
            method: "POST",
            url: 'https://www.sellpazg.co.kr/api/sm/smCateStdSchApi.php',
            dataType: "json",
            crossDomain: true,
            data: curData,
            success: function(res) {
                if(res["RET_ALL"] !== "Y"){
                    alert('조회에 실패하였습니다.')
                    return
                }
                const s__category__list = document.getElementById('s__category__list')
                s__category__list.innerHTML = ''

                for(let item of res["CATE_LIST"]){
                    let opt = document.createElement('option')
                    opt.value = item['CODE']
                    // opt.value = item['NAME']
                    opt.innerText = item['NAME']
                    s__category__list.appendChild(opt)
                }
            },
            error: function(xhr, status) {
                console.log(xhr)
                console.log(status)
                alert('조회에 실패하였습니다.')
            }
        })
    })
}
const getShoppingMallCategory = () => {
    const categoryCode = document.getElementById('s__category__list').value
    let categoryNames = []
    let categoryNumber = []
    if(categoryCode === ''){
        alert('허브셀러 카테고리를 정해주세요')
        return
    }

    chrome.storage.sync.get(['api_key', 'user_id'], item => {
        const curData = {
            'memberId': item['user_id'],
            'apiKeySig': item['api_key'],
            'apiTime': cur_datetime(),
            'mode': 'list',
            'cateCode' : categoryCode
        }
        $.ajax({
            method: "POST",
            url: 'https://www.sellpazg.co.kr/api/sm/smCateExtlApi.php',
            dataType: "json",
            crossDomain: true,
            data: curData,
            success: function(res) {
                const ret_data = {}
                if(res['RET_ALL'] !== 'Y'){
                    return;
                }

                for(let data of res['CATE_EXTL_LIST']){
                    ret_data[data['SITE']] = {'CODE': data['CODE'], 'NAME': data['NAME']}
                }

                categoryList = [...document.getElementsByClassName('mBoard')[0].
                getElementsByTagName('table')[0].
                getElementsByTagName('tr')].slice(1)

                categoryList.forEach((elem) => {
                    // 각 쇼핑몰 셀렉트 박스
                    const shopName = elem.childNodes[1].childNodes[1].childNodes[0].childNodes[0].alt
                    const elements = [...elem.childNodes[5].children].filter(node => node.tagName === "SELECT")
                    if(shop_code.hasOwnProperty(shopName)) {
                        let data = ret_data[shop_code[shopName]['CODE']]
                        categoryNumber = data['CODE'].split(',')
                        categoryNames = data['NAME'].split('>')
                        for(const element of elements){
                            // 생성한 MutationObserver Object를 Select 태그에 할당
                            test(element, config, categoryNumber)
                            observer.observe(element, config);
                        }
                        if(elements.length > 0){
                            idx = 1;
                            elements[0].value = categoryNumber[0]
                            elements[0].dispatchEvent(new Event('change'))
                        }
                    }
                })
            },
            error: function(xhr, status) {
                console.log(xhr)
                console.log(status)
                alert('조회에 실패하였습니다.')
            }
        })
        function test(elem, conf, value){
            // 2. 옵저버 인스턴스 생성
            const observer = new MutationObserver(function(mutations) {
                if(mutations.length > 0){
                    if(idx >= categoryNumber.length)
                        idx = 1;

                    const mutation = mutations[0]
                    mutation.target.value = categoryNumber[idx]
                    console.log(categoryNames, categoryNames[idx], categoryNumber, categoryNumber[idx], idx++)
                    mutation.target.dispatchEvent(new Event('change'))
                    // for(let child of mutation.target.childNodes){
                    //     mutation.target.value = child.value
                    // if(child.innerText == categoryNames[idx]){
                    //     mutation.target.value = child.value
                    //     isExist = true;
                    //     break;
                    // }
                    // }
                    // if(isExist){
                    //
                    //
                    // }
                }
            });

            // 3. 옵션 설정
            const config = {
                attributes: true
            };
        }
    })
}
