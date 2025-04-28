const notices = [
    { date: '13 JAN', year: '2025', text: 'এপ্রিল – সেপ্টেম্বর, ২০২৫ (Summer Semester) সিএসইটিএস এম.এস. কোর্স ভর্তি তারিখ' },
    { date: '22 FEB', year: '2025', text: 'ভর্তি পরীক্ষা – মার্চ ২০২৫ (Spring Session) সিএসইটি বিএসসি প্রোগ্রাম' },
    { date: '10 MAR', year: '2025', text: 'ফলাফল প্রকাশ – ২০২৫ (CSE Final Year)' },
    { date: '01 APR', year: '2025', text: 'নতুন কোর্স রেজিস্ট্রেশন শুরু – AI & Data Science' },
    { date: '25 MAY', year: '2025', text: 'ইন্ডাস্ট্রি ইন্টার্নশিপ – ২০২৫ ব্যাচ নোটিশ' },
    { date: '08 JUN', year: '2025', text: 'পুনঃনিরীক্ষণ আবেদন ফরম জমা – সিএসই ৬ষ্ঠ সেমিস্টার' },
    { date: '30 JUN', year: '2025', text: 'লাইব্রেরি ফাইন পেমেন্ট শেষ তারিখ – সকল শিক্ষার্থী' },
    { date: '15 JUL', year: '2025', text: 'গ্র্যাজুয়েশন অ্যাপ্লিকেশন জমা – ২০২৫ ব্যাচ' }
  ];

  function createCalendarSVG(date, year) {
    return `
      <svg class="calendar-svg" viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect x="0" y="8" width="64" height="64" rx="8" fill="#00844a"/>
        <!-- Binder Rings -->
        <circle cx="12" cy="8" r="3" fill="#00844a" stroke="#4a4a4a" stroke-width="1"/>
        <circle cx="32" cy="8" r="3" fill="#00844a" stroke="#4a4a4a" stroke-width="1"/>
        <circle cx="52" cy="8" r="3" fill="#00844a" stroke="#4a4a4a" stroke-width="1"/>
        <!-- Date Text -->
        <text x="32" y="34" text-anchor="middle" fill="#FFFFFF" font-size="10" font-family="Arial" font-weight="600">${date}</text>
        <!-- Year Text -->
        <text x="32" y="52" text-anchor="middle" fill="#FFFFFF" font-size="14" font-family="Arial" font-weight="bold">${year}</text>
      </svg>
    `;
  }

  const container = document.getElementById("notice-container");

  notices.forEach(notice => {
    const html = `
      <div class="col-12 col-md-6">
        <div class="notice-card">
          ${createCalendarSVG(notice.date, notice.year)}
          <div class="notice-text">
            ${notice.text}
            <div class="category">Category</div>
          </div>
        </div>
      </div>`;
    container.insertAdjacentHTML('beforeend', html);
  });