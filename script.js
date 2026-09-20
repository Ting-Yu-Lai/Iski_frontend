const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const page = document.body.dataset.page;
const activeLink = document.querySelector(`[data-nav="${page}"]`);
if (activeLink) {
  activeLink.classList.add('active');
  activeLink.setAttribute('aria-current', 'page');
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-category]').forEach((item) => {
      item.classList.toggle('filtered-out', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

const status = document.querySelector('.copy-status');
const showStatus = (message) => {
  if (!status) return;
  status.textContent = message;
  window.setTimeout(() => { status.textContent = ''; }, 3000);
};

document.querySelector('[data-copy]')?.addEventListener('click', async (event) => {
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
    showStatus('已複製 Discord 帳號：iski_i');
  } catch {
    showStatus('請手動複製：iski_i');
  }
});

const form = document.querySelector('#commission-form');
const output = document.querySelector('#brief-output');
const copyBrief = document.querySelector('[data-copy-brief]');
const emailBrief = document.querySelector('#email-brief');

const planNames = { custom: '正比客製化', mystery: '正比驚喜包', chibi: 'Q版人物' };
const requestedPlan = new URLSearchParams(window.location.search).get('plan');
if (requestedPlan && planNames[requestedPlan]) {
  const planSelect = document.querySelector('#plan');
  if (planSelect) planSelect.value = planNames[requestedPlan];
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const brief = [
    '【Iskï 插畫委託需求】',
    `委託人稱呼：${data.get('name')}`,
    `希望聯絡方式：${data.get('contact')}`,
    `委託方案：${data.get('plan')}`,
    `委託範圍：${data.get('scope')}`,
    `使用目的：${data.get('usage')}`,
    `角色與畫面描述：${data.get('description')}`,
    `參考資料：${data.get('reference') || '無'}`,
    `期限與其他備註：${data.get('notes') || '無'}`
  ].join('\n');
  output.textContent = brief;
  copyBrief.disabled = false;
  emailBrief.classList.remove('disabled');
  emailBrief.removeAttribute('aria-disabled');
  emailBrief.href = `mailto:iskinanatw777@gmail.com?subject=${encodeURIComponent('Illustration Commission Inquiry')}&body=${encodeURIComponent(brief)}`;
  output.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

copyBrief?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    showStatus('委託摘要已複製。');
  } catch {
    showStatus('瀏覽器未允許複製，請手動選取摘要。');
  }
});
