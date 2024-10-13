import { For, Show, createEffect, createMemo, createResource, createSignal } from "solid-js";
import styles from './style.module.css';
import { Button } from "../elements/atoms";

const instance = 'https://fosstodon.org';
const fetchComments = async (id: string) => {
  const url = instance + '/api/v1/statuses/' + id + '/context';

  const response = await fetch(url);

  return (await response.json()) as {
    ancestors: CommentRaw[];
    descendants: CommentRaw[];
  };
}

/*
 * {
  "0": {
    "id": "113300194331339696",
    "created_at": "2024-10-13T12:49:26.043Z",
    "in_reply_to_id": "113300164654141011",
    "in_reply_to_account_id": "106397694356569392",
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "language": "en",
    "uri": "https://fosstodon.org/users/xypnox/statuses/113300194331339696",
    "url": "https://fosstodon.org/@xypnox/113300194331339696",
    "replies_count": 0,
    "reblogs_count": 0,
    "favourites_count": 0,
    "edited_at": null,
    "content": "<p>Very nice very nice.</p><p>GG <span class=\"h-card\" translate=\"no\"><a href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\">@<span>Mastodon</span></a></span></p>",
    "reblog": null,
    "application": {
      "name": "Elk",
      "website": "https://elk.zone"
    },
    "account": {
      "id": "106397694356569392",
      "username": "xypnox",
      "acct": "xypnox",
      "display_name": "xypnox",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "indexable": true,
      "group": false,
      "created_at": "2021-06-12T00:00:00.000Z",
      "note": "<p>Dev, Design, Literature, Philosophy</p><p>Dabbling with interfaces and design systems.</p>",
      "url": "https://fosstodon.org/@xypnox",
      "uri": "https://fosstodon.org/users/xypnox",
      "avatar": "https://cdn.fosstodon.org/accounts/avatars/106/397/694/356/569/392/original/a7cd8aef1361b657.png",
      "avatar_static": "https://cdn.fosstodon.org/accounts/avatars/106/397/694/356/569/392/original/a7cd8aef1361b657.png",
      "header": "https://cdn.fosstodon.org/accounts/headers/106/397/694/356/569/392/original/075182ac8604332a.png",
      "header_static": "https://cdn.fosstodon.org/accounts/headers/106/397/694/356/569/392/original/075182ac8604332a.png",
      "followers_count": 80,
      "following_count": 416,
      "statuses_count": 2364,
      "last_status_at": "2024-10-13",
      "hide_collections": false,
      "noindex": false,
      "emojis": [],
      "roles": [
        {
          "id": "8",
          "name": "Supporter 💰♥️",
          "color": "#4f7a28"
        }
      ],
      "fields": [
        {
          "name": "Home",
          "value": "<a href=\"https://xypnox.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">xypnox.com/</span><span class=\"invisible\"></span></a>",
          "verified_at": "2023-10-31T15:49:25.420+00:00"
        },
        {
          "name": "Github",
          "value": "<a href=\"https://github.com/xypnox\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">github.com/xypnox</span><span class=\"invisible\"></span></a>",
          "verified_at": "2023-03-13T11:14:19.847+00:00"
        },
        {
          "name": "Blog",
          "value": "<a href=\"https://www.xypnox.com/rss.xml\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://www.</span><span class=\"\">xypnox.com/rss.xml</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        }
      ]
    },
    "media_attachments": [],
    "mentions": [
      {
        "id": "1462",
        "username": "Mastodon",
        "url": "https://mastodon.social/@Mastodon",
        "acct": "Mastodon@mastodon.social"
      }
    ],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  }
}*/
interface CommentRaw {
  account: {
    display_name: string;
    avatar_static: string;
    url: string;
  };
  id: string;
  content: string;
  created_at: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  in_reply_to_id: string;
}

/** This is nested as replies */
interface Comment extends CommentRaw {
  replies: Comment[];
}

const generateNestedComments = (
  comments: CommentRaw[],
  rootId: string | null = null
): Comment[] => {
  const commentMap = new Map<string, Comment>();

  // Initialize Comment objects with 'replies' array and map them by their id
  comments.forEach(commentRaw => {
    const comment: Comment = { ...commentRaw, replies: [] };
    commentMap.set(comment.id, comment);
  });

  const nestedComments: Comment[] = [];

  // Build the nested comment structure
  comments.forEach(commentRaw => {
    const comment = commentMap.get(commentRaw.id)!;
    if (comment.in_reply_to_id === rootId) {
      // Comment is a direct reply to the root
      nestedComments.push(comment);
    } else {
      const parentComment = commentMap.get(comment.in_reply_to_id);
      if (parentComment) {
        // Add to parent's replies
        parentComment.replies.push(comment);
      } else {
        // Parent not found, treat as direct reply to root
        if (comment.in_reply_to_id === null && rootId === null) {
          nestedComments.push(comment);
        }
        // Optionally handle comments with missing parents
      }
    }
  });

  return nestedComments;
};

const childCount = (comment: Comment): number => {
  let count = comment.replies.length;
  comment.replies.forEach(c => {
    count += childCount(c);
  });
  return count;
}

const Comment = (props: { comment: Comment, root?: boolean }) => {
  const [showReplies, setShowReplies] = createSignal(true);
  return (
    <article class={styles.comment} classList={{
      [styles.rootComment]: props.root,
      "theme-card": props.root,
    }} id={"comment_" + props.comment.id}>
      <header>
        <div>
          <img src={props.comment.account.avatar_static} alt="" width="32" height="32" />
          <h3>
            <a href={props.comment.account.url}>
              {props.comment.account.display_name}
            </a>
          </h3>
        </div>
        {props.comment.created_at &&
          <p>
            <a href={props.comment.url}>
              {(new Date(props.comment.created_at)).toDateString()}
            </a>
          </p>
        }
      </header>
      <div>
        <div class={styles.ccontent} innerHTML={props.comment.content} />
        <div class={styles.meta}>
          <div>
            <Show when={props.comment.replies.length > 0}>
              <button class="small" onClick={() => setShowReplies(s => !s)}>
                {showReplies() ? 'Hide' : 'Show'} Replies ({childCount(props.comment)})
              </button>
            </Show>
          </div>
          <a href={props.comment.url}>
            {childCount(props.comment)} Replies, {' '}
            {props.comment.reblogs_count} Reblogs, {' '}
            {props.comment.favourites_count} Favourites
          </a>
        </div>
      </div>
      <Show when={showReplies() && props.comment.replies.length > 0}>
        <div class={styles.replies}>
          <For each={props.comment.replies}>
            {c => <Comment comment={c} />}
          </For>
        </div>
      </Show>
    </article>
  );
}

export const Commint = (props: { tootId: string }) => {
  // console.log('COMMINT');

  const [data, setData] = createSignal<Comment[] | null>();

  createEffect(() => {
    fetchComments(props.tootId).then((d) => {
      console.log(d)
      const nested = generateNestedComments(d?.descendants ?? [], props.tootId);
      console.log({ nested });
      setData(nested);
    })
      .catch(console.error);
  });

  return (
    <div>
      <Show when={data()}>
        <h2>Comments</h2>
        <p>
          <a href={instance + '/web/statuses/' + props.tootId}>Comment on Mastodon</a>
        </p>
        <br />
        <div class={styles.comments}>
          <For each={data()}>
            {(comment) => (<Comment comment={comment} root />)}
          </For>
        </div>
      </Show>
    </div>
  );
}
