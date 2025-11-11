import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" className="nav-link bold" data-active={isActive('/')}>
          Feed
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        .nav-link {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left [data-active='true'] {
          color: gray;
        }

        .nav-link + .nav-link {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/" className="bold nav-link" data-active={isActive('/')}>
            Feed
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          .nav-link {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .nav-link[data-active='true'] {
            color: gray;
          }

          .nav-link + .nav-link {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link className="nav-link" href="/api/auth/signin" data-active={isActive('/signup')}>
          Log in
        </Link>
        <style jsx>{`
          .nav-link {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .nav-link + .nav-link {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right .nav-link {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" className="nav-link bold" data-active={isActive('/')}>
            Feed
        </Link>
        <Link className="nav-link" href="/drafts" data-active={isActive('/drafts')}>
          My draft
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          .nav-link {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .nav-link[data-active='true'] {
            color: gray;
          }

          .nav-link + .nav-link {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            New post
          </button>
        </Link>
        <button onClick={() => signOut()}>
          Log out
        </button>
        <style jsx>{`
          button {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
            background: none;
            color: var(--geist-foreground);
            cursor: pointer;
          }    
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;