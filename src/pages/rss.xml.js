// RSS feed for the Log (CLAUDE.md §4) — /rss.xml, from day one.
// Only published log entries, newest first, sorted by web-pub-date.
import rss from '@astrojs/rss';
import { getPublishedLog } from '../lib/content.ts';

export async function GET(context) {
  const entries = await getPublishedLog();
  return rss({
    title: 'Deadlink Labs — Log',
    description: 'Build logs, research, and experiments from the Deadlink Labs notebook by Marcelo Brouard.',
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.snippet,
      link: `/log/${entry.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
