import { For, createEffect, createSignal } from "solid-js";
import groupBy from 'lodash.groupby';
import { styled } from "solid-styled-components";
import { Input } from "../../components/elements/atoms";

const splitUrl = (url: string) => {
  const split = url.split('/');
  const domain = split[2];
  const path = split.slice(3).join('/');
  const pathSegments = path.split('/');
  return { domain, path, pathSegments, depth: pathSegments.length };
}

interface SiteMapURLData {
  url: string;
  domain: string;
  path: string;
  pathSegments: string[];
  depth: number;
}

const sanatizePath = (path: string) => {
  // Remove leading, trailing slashes
  return path.replace(/^\/|\/$/g, '');
}

export const MapSite = () => {
  const [sitemap, setSitemap] = createSignal('https://www.xypnox.com/sitemap-0.xml');
  const [siteMapData, setSiteMapData] = createSignal<SiteMapURLData[]>();
  const [sError, setSError] = createSignal<string | undefined>(undefined);

  const grouped = () => {
    return groupBy(siteMapData(), 'domain')
  }


  createEffect(() => {
    console.log({
      sitemap: sitemap(),
    })
    fetch(sitemap())
      .then(async (resp) => {
        try {
          const data = await resp.text();
          if (resp.status !== 200) {
            console.error('Error in fetch', resp);
            setSError(`Error in fetching sitemap: ${resp.status}`);
            return;
          }

          const xmlDataDom = new DOMParser()
          // Check if the data is xml
          // const contentType = resp.headers.get('content-type');
          const isXML = xmlDataDom.parseFromString(data, "text/xml").querySelector('parsererror') === null;
          // console.log({ contentType, isXML });
          if (!isXML) {
            setSError('Not a valid XML');
            return;
          }
          const xmlData = xmlDataDom.parseFromString(data, "text/xml");
          // Query url tags that have loc inside them and make a string array of the contents of the loc tag
          //
          const urls = [
            ...Array.from(xmlData.querySelectorAll('sitemap')),
            ...Array.from(xmlData.querySelectorAll('url'))
          ].map((url) => url.querySelector('loc')?.textContent);

          console.log({ data, xmlData, urls });

          const urlData = urls
            .filter((url) => typeof url === 'string')
            .map((url) => {
              return ({
                url: url as string,
                ...splitUrl(url as string)
              })
            })

          setSError(undefined);
          setSiteMapData(urlData)
        }
        catch (e: any) {
          console.error('Error in parse', e);
          setSError(e.message ?? 'Error in parsing');
        }
      }).catch((e) => {
        console.error('Error in fetch', e, e.toString());
        setSError(e.toString());
      });
  });

  return <div>
    <Input
      style={{
        width: '100%'
      }}
      type="text" value={sitemap()}
      onInput={(e) => setSitemap(e.currentTarget.value)}
    />
    <div>{sError()}</div>
    <For each={Object.entries(grouped())}>
      {([key, value], i) =>
        <div>
          <h2>{key}</h2>
          <div>
            <For each={value}>
              {(site, i) =>
                <ListItem style={{
                  '--depth': (site.depth) * 2 - 1 + 'rem'
                }}>
                  <iconify-icon icon="ph:file-text-duotone"></iconify-icon>
                  <a href={site.url} target="_blank">
                    {site.depth === 1 ? site.url : sanatizePath(site.path)}
                  </a>
                </ListItem>
              }
            </For>
          </div>
        </div>
      }
    </For>

  </div>;
}

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25em;
  margin-left: var(--depth, 0rem);
  padding: 0.5em;
  a {
    color: inherit;
  }
  iconify-icon {
    color: var(--primary-color);
  }
`
