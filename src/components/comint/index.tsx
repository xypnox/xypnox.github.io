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
  media_attachments: {
    preview_url: string;
    description: string;
  }[]
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
        <Show when={props.comment.media_attachments.length > 0}>
          <img class={styles.media} src={props.comment.media_attachments[0].preview_url} alt={props.comment.media_attachments[0].description} />
        </Show>
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
