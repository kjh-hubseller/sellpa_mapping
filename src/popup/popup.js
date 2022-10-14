chrome.storage.sync.get('api_key', item => {
    console.log(item['api_key'])
})
$(document).on('click', '#login__btn', () => {
    const site_value = $('input[name=login_site]:checked')[0].value
    const site_url = 'https://www.sellpazg.co.kr/api/sm/smAuthApi.php'
    const site_type = site_value === 'sellpa' ? 1 : 2
                // 'http://www.hubseller.co.kr/?menuType=member&mode=json&act=login' :
                // 'https://www.sellpazg.co.kr/?menuType=member&mode=json&act=login'

    curData = {
        memberId: document.getElementById('login_id').value,
        memberPw: document.getElementById('login_pw').value,
        mode: 'list',
        memberTp: site_type,
        apiTime: cur_datetime()
    }
    login(curData, site_url)
})