$(document).on('click', '#login__btn', () => {
    const site_value = $('input[name=login_site]:checked')[0].value
    const site_url = site_value === 'sellpa' ? 
                'http://www.hubseller.co.kr/?menuType=member&mode=json&act=login' :
                'https://www.sellpazg.co.kr/?menuType=member&mode=json&act=login'

    curData = {
        login_id: document.getElementById('login_id').value,
        login_pwd: document.getElementById('login_pw').value
    }

    $.ajax({
        method: "POST",
        url: site_url,
        dataType: "json",
        crossDomain: true,
        data: curData,
        success: function(res) {
            const {
                success:isSuccess = false
            } = res
            if (isSuccess){
                chrome.storage.sync.set({
                    'isLoggined': true,
                    'site_url': site_url,
                    'user_id': curData['login_id']
                }, () => {})
                chrome.storage.sync.get(['isLoggined', 'site_url', 'user_id'], item => {
                    alert('로그인이 완료되었습니다.')
                    window.close()
                })
            }
        },
        error: function(xhr, status) {
            console.log(xhr)
            console.log(status)
        }
    })
})