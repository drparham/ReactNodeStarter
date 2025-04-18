'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface DisqusCommentsProps {
  identifier: string;
  title: string;
}

export default function DisqusComments({ identifier, title }: DisqusCommentsProps) {
  useEffect(() => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = identifier;
          this.page.url = window.location.href;
          this.page.title = title;
        },
      });
    }
  }, [identifier, title]);

  return (
    <>
      <div id="disqus_thread" />
      <Script
        id="disqus-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var disqus_config = function () {
              this.page.url = window.location.href;
              this.page.identifier = '${identifier}';
              this.page.title = '${title}';
            };
            (function() {
              var d = document, s = d.createElement('script');
              s.src = 'https://${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
            })();
          `,
        }}
      />
    </>
  );
} 