import settings from '@/settings';

const title = settings.title || '系统';

export default function getPageTitle(pageTitle: string | undefined = '') {
  if (pageTitle) {
    return `${title} - ${pageTitle}`;
  }
  return `${title}`;
}
