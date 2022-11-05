import Link from 'next/link';
import styles from './Notes.module.css';
// import PocketBase from 'pocketbase';
import CreateNote from './CreateNote';

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto';

async function getData() {
  const res = await fetch(
    'http://127.0.0.1:8090/api/collections/my_database/records?page=1&perPage=30',
    { cache: 'no-store' }
  );

  // const db = new PocketBase('http://127.0.0.1:8090');
  // const data = await db.records.getList('my_database');
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getData();
  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h4>{content}</h4>
        <p>{created}</p>
      </div>
    </Link>
  );
}
