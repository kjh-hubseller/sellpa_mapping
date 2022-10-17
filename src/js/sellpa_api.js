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
                    // opt.value = item['CODE']
                    opt.value = item['NAME']
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
const getShoppingMallCategory = (categoryName = '', categoryCode = '') => {
    chrome.storage.sync.get(['api_key', 'user_id'], item => {
        const curData = {
            'memberId': item['user_id'],
            'apiKeySig': item['api_key'],
            'apiTime': cur_datetime(),
            'mode': 'list',
            'cateCode' : categoryCode,
            'cateName': categoryName
        }
        $.ajax({
            method: "POST",
            url: 'https://www.sellpazg.co.kr/api/sm/smCateExtlApi.php',
            dataType: "json",
            crossDomain: true,
            data: curData,
            async: false,
            success: function(res) {
                console.log(res)
                return res
            },
            error: function(xhr, status) {
                console.log(xhr)
                console.log(status)
                alert('조회에 실패하였습니다.')
            }
        })
    })
}