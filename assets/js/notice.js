const notices = [
  { date: '13 JAN', year: '2025', text: 'এপ্রিল – সেপ্টেম্বর, ২০২৫ (Summer Semester) সিএসইটিএস এম.এস. কোর্স ভর্তি তারিখ', category: 'Admission' },
  { date: '22 FEB', year: '2025', text: 'ভর্তি পরীক্ষা – মার্চ ২০২৫ (Spring Session) সিএসইটি বিএসসি প্রোগ্রাম', category: 'Examination' },
  { date: '10 MAR', year: '2025', text: 'ফলাফল প্রকাশ – ২০২৫ (CSE Final Year)', category: 'Results' },
  { date: '01 APR', year: '2025', text: 'নতুন কোর্স রেজিস্ট্রেশন শুরু – AI & Data Science', category: 'Registration' },
  { date: '25 MAY', year: '2025', text: 'ইন্ডাস্ট্রি ইন্টার্নশিপ – ২০২৫ ব্যাচ নোটিশ', category: 'Internship' },
  { date: '08 JUN', year: '2025', text: 'পুনঃনিরীক্ষণ আবেদন ফরম জমা – সিএসই ৬ষ্ঠ সেমিস্টার', category: 'Application' },
  { date: '30 JUN', year: '2025', text: 'লাইব্রেরি ফাইন পেমেন্ট শেষ তারিখ – সকল শিক্ষার্থী', category: 'Payment' },
  { date: '15 JUL', year: '2025', text: 'গ্র্যাজুয়েশন অ্যাপ্লিকেশন জমা – ২০২৫ ব্যাচ', category: 'Graduation' }
];

const nocItems = [
  { date: '05 FEB', year: '2025', text: 'সিএসই ডিপার্টমেন্টের পরিবর্তিত ক্লাস রুটিন – ২০২৫', category: 'Schedule' },
  { date: '18 MAR', year: '2025', text: 'সফটওয়্যার ইঞ্জিনিয়ারিং কোর্স কারিকুলাম আপডেট – ২০২৫', category: 'Curriculum' },
  { date: '12 APR', year: '2025', text: 'সাইবার সিকিউরিটি ল্যাব ব্যবহার সময়সূচী পরিবর্তন', category: 'Lab Usage' },
  { date: '30 APR', year: '2025', text: 'ডাটাবেস সিস্টেম ফাইনাল এক্সাম তারিখ পরিবর্তন', category: 'Examination' },
  { date: '14 MAY', year: '2025', text: 'কম্পিউটার নেটওয়ার্কিং কোর্স ইন্সট্রাকটর পরিবর্তন', category: 'Faculty' },
  { date: '22 JUN', year: '2025', text: 'আর্টিফিশিয়াল ইন্টেলিজেন্স সেমিনার স্থান পরিবর্তন', category: 'Event' },
  { date: '07 JUL', year: '2025', text: 'প্রজেক্ট সাবমিশন ডেডলাইন এক্সটেনশন – ফাইনাল ইয়ার', category: 'Deadline' },
  { date: '20 JUL', year: '2025', text: 'অনলাইন কোর্স রেজিস্ট্রেশন সিস্টেম মেইনটেনেন্স নোটিশ', category: 'System' }
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

function populateNotices(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear existing content

  items.forEach(item => {
    const html = `
      <div class="col-12 col-md-6">
        <div class="notice-card">
          ${createCalendarSVG(item.date, item.year)}
          <div class="notice-text">
            ${item.text}
            <div class="category">${item.category}</div>
          </div>
        </div>
      </div>`;
    container.insertAdjacentHTML('beforeend', html);
  });
}

// Initialize both tabs with their respective content
populateNotices(notices, "notice-container");
populateNotices(nocItems, "noc-container");