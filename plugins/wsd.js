var handler = async (m, { text }) => {
    if (!text) return;

    // تعيين الرقم والنص المطلوبين
    const phoneNumber = '212705776824';
    const statusText = 'ونطاكت';

    // استخدام دالة sendContact لإرسال جهة الاتصال
    this.sendContact(m.chat, phoneNumber, statusText, m);
}

handler.command = ['sendcontact'];
handler.help = ['sendcontact'];
handler.tags = ['test'];

export default handler;

