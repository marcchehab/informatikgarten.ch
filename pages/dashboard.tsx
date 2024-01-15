import React from 'react';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
// import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const Dashboard = () => {
  const { data: sessionData, status } = useSession();

  return status === 'authenticated' ? (
    <div style={{ textAlign: 'center' }}>
      <h1>Dashboard</h1>
      {sessionData && (
        <>
          <div>{`Name : ${sessionData.user?.name}`}</div>
          <div>{`Email : ${sessionData.user?.email}`}</div>
        </>
      )}
      <button
        // className={styles.actionButton}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Log out
      </button>
    </div>
  ) : (
    <Link href="/">Log in</Link>
  );
};

export default Dashboard;