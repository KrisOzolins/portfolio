'use client';
import Link from 'next/link';
import React, { useState, useEffect, use } from 'react';
import useFeatureFlag from '@/lib/hooks/useFeatureFlag';

// Slots are available as props in the layout:
// export default function Layout({
//   children,
//   team,
//   analytics,
// }: {
//   children: React.ReactNode
//   analytics: React.ReactNode
//   team: React.ReactNode
// }) {
//   return (
//     <>
//       {children}
//       {team}
//       {analytics}
//     </>
//   )
// }

export default function SettingsLayout({
  children,
  analytics,
  featureflags,
  general,
  // notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  featureflags: React.ReactNode;
  general: React.ReactNode;
  // notifications: React.ReactNode,
}) {
  const [activeSection, setActiveSection] = useState('general');
  const exampleFeatureFlag = useFeatureFlag('example-feature');
  const exampleABVariant = useFeatureFlag('example-ab');

  useEffect(() => {
    // const buttons = document.querySelectorAll('.menu button');
    // buttons.forEach((button) => {
    //   button.classList.remove('active');
    // });

    // const activeButton = document.querySelector(`.menu button:nth-child(${buttons.length})`);
    // activeButton?.classList.add('active');

    document.querySelectorAll('.menu button').forEach((button) => {
      // button.classList.remove('active');
      // @ts-ignore
      button.dataset.active = 'false';
    });
    // document.querySelector(`.${activeSection}`)?.classList.add('active');
    const btn = document.querySelector(`.${activeSection}`) as HTMLButtonElement;
    btn.dataset.active = 'true';
  }, [activeSection]);

  return (
    <div className="text-gray-800 dark:text-white">
      <nav className="menu flex items-center gap-3 mb-3 border-b border-b-gray-800 dark:border-b-white">
        {/* <Link href="/admin/settings">Settings</Link>
        <Link href="/admin/settings/analytics">Analytics</Link>
        <Link href="/admin/settings/featureflags">Feature Flags</Link>
        <Link href="/admin/settings/general">General</Link> */}
        {/* <Link href="/admin/settings/notifications">Notifications</Link */}
        <button className="general data-[active=true]:font-bold" onClick={() => setActiveSection('general')}>
          General
        </button>
        <button className="analytics data-[active=true]:font-bold" onClick={() => setActiveSection('analytics')}>
          Analytics
        </button>
        <button className="feature-flags data-[active=true]:font-bold" onClick={() => setActiveSection('feature-flags')}>
          Feature Flags
        </button>
        {/* <button onClick={() => setActiveSection('notifications')}>Notifications</button> */}
      </nav>
      <div>
        {/* {general && <div>{general}</div>} */}
        {/* {analytics && <div>{analytics}</div>} */}
        {/* {feature-flags && <div>{featureflags}</div>} */}
        {/* {notifications && <div>{notifications}</div>} */}
        {activeSection === 'analytics' ? analytics : activeSection === 'feature-flags' ? featureflags : general}
        {children && <div>{children}</div>}
      </div>
      <div className="mt-3">
        <p>
          <strong>Feature-flag and A/B test examples:</strong>
        </p>
        {exampleFeatureFlag ? <p>New Feature is Enabled!</p> : <p>New Feature is Disabled</p>}
        {exampleABVariant === 'A' ? <p>Variant A</p> : <p>Variant B</p>}
      </div>
    </div>
  );
}
