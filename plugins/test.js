const fs = require('fs');
const { exec } = require('child_process');

// إنشاء المجلد
function createFolder() {
    fs.mkdir('tmp', (err) => {
        if (err) {
            console.error('Failed to create folder:', err);
        } else {
            console.log('Folder created successfully.');
            // جدولة حذف المجلد بعد 10 دقائق
            setTimeout(deleteFolder, 10 * 60 * 1000);
        }
    });
}

// حذف المجلد
function deleteFolder() {
    fs.rmdir('tmp', { recursive: true }, (err) => {
        if (err) {
            console.error('Failed to delete folder:', err);
        } else {
            console.log('Folder deleted successfully.');
        }
        // إنشاء المجلد من جديد بعد حذفه
        createFolder();
    });
}

// بدء عملية إنشاء المجلد والجدولة الدورية
createFolder();

// جدولة إنشاء المجلد كل 10 دقائق باستخدام cron job
const cronJob = '* */10 * * * *'; // ينفذ كل 10 دقائق
exec(`echo "${cronJob} node create_delete_folder.js" | crontab`, (err, stdout, stderr) => {
    if (err) {
        console.error('Failed to schedule cron job:', err);
    } else {
        console.log('Cron job scheduled successfully.');
    }
});
