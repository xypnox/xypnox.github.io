import { createEffect, createResource } from "solid-js";
import styles from './style.module.css';

const instance = 'https://fosstodon.org';
const fetchComments = async (id: string) => {
  const url = instance + '/api/v1/statuses/' + id + '/context';

  const response = await fetch(url);
  return (await response.json()) as {
    ancestors: Comment[];
    descendants: Comment[];
  };
}

interface Comment {
  account: {
    display_name: string;
    avatar_static: string;
    url: string;
  };
  content: string;
  created_at: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
}

const Comment = (props: { comment: Comment }) => {
  return (
    <article class={styles.comment + ' theme-card'}>
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
          <a href={props.comment.url}>
            {props.comment.replies_count} Replies, {' '}
            {props.comment.reblogs_count} Reblogs, {' '}
            {props.comment.favourites_count} Favourites
          </a>
        </div>
      </div>
    </article>
  );
}

export const Commint = (props: { tootId: string }) => {
  // console.log('COMMINT');

  const [data, { refetch, }] = createResource(async () => fetchComments(props.tootId));

  createEffect(() => {
    const d = data();
    console.log({ d });
  });
  return (
    <div>
      {data.loading && <p>Loading...</p>}
      {data.error && <p>Error: {data.error}</p>}
      {data() && (
        <>
          <h2>Comments:</h2>
          <p>
            <a href={instance + '/web/statuses/' + props.tootId}>View on Mastodon</a>
          </p>
          <br />
          <div class={styles.comments}>
            {data()!.descendants.map((comment: Comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
