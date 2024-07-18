document.addEventListener('DOMContentLoaded', function() {
    // 現在の日付と時間を取得して表示
    const currentDateTimeElement = document.getElementById('currentDateTime');
    if (currentDateTimeElement) {
        const now = new Date();
        const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        currentDateTimeElement.textContent = `${formattedDateTime}`;
    }

    // Navigatorオブジェクトのプロパティ名リスト
    const properties = [
        'appName', 'appVersion', 'userAgent', 'platform', 'language',
        'languages', 'cookieEnabled', 'onLine', 'vendor', 'product',
        'productSub', 'vendorSub', 'hardwareConcurrency', 'deviceMemory'
    ];

    properties.forEach(property => {
        // IDと一致する要素を取得
        const element = document.getElementById(property);
        if (element) {
            // navigatorオブジェクトからプロパティの値を取得
            const value = navigator[property];
            // 値を挿入
            // element.textContent = `${property}: ${value}`;
            element.textContent = `${value}`;
        }
    });

    // Fetch IP address using an external API
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip-address').textContent = `${data.ip}`;
    })
    .catch(error => {
        document.getElementById('ip-address').textContent = `IP Address: Error fetching IP address`;
        console.error('Error fetching IP address:', error);
    });
});