chrome.storage.sync.get('isLoggined', item => {
    console.log(item['isLoggined'])
    if (item['isLoggined']){
        chrome.storage.sync.set({'isLoggined': false, 'site_url': '', 'user_id': ''}, () => {})
    }


})