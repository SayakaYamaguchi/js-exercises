document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // フォームのデフォルト動作を無効にする

    // アクセストークンとファイルの取得
    const accessToken = document.getElementById('accessToken').value;
    const fileInput = document.getElementById('fileInput').files[0];

    if (!accessToken || !fileInput) {
        document.getElementById('status').textContent = 'Please provide an access token and select a file.';
        return;
    }

    // OneDrive のアップロード URL（ユーザーのルートディレクトリにアップロード）
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileInput.name}:/content`;

    try {
        // ファイルを OneDrive にアップロードする API リクエスト
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': fileInput.type
            },
            body: fileInput
        });

        if (response.ok) {
            document.getElementById('status').textContent = `File uploaded successfully: ${fileInput.name}`;
        } else {
            const errorData = await response.json();
            document.getElementById('status').textContent = `Upload failed: ${errorData.error.message}`;
        }
    } catch (error) {
        document.getElementById('status').textContent = `An error occurred: ${error.message}`;
    }
});

