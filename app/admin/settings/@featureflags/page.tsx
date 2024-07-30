import Link from 'next/link';

export default function FeatureFlagsPage({}) {
  return (
    <>
      <nav>
        <Link href="/admin/settings/posts">Posts</Link>
      </nav>
      <p>
        Feature flags are a powerful tool for controlling the visibility of features in your application. You can use them to gradually roll out new
        features, run A/B tests, and more.
      </p>
    </>
  );
}
