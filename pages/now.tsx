import Icon from '@/components/common/Icon';

function Now() {
  return (
    <section className="now content container mx-auto min-h-screen w-1/2 max-w-[920px] py-10 text-light-white dark:text-white" id="now">
      <a href="/">
        <Icon name="arrow-left" /> krisozolins.com
      </a>
      <header className="my-10">
        <h1 className="text-4xl font-bold text-left mb-1">Now</h1>
        <p className="text-left text-sm">
          (This is a{' '}
          <a href="https://nownownow.com/about" className="underline" target="_blank">
            now page
          </a>
          , and if you have your own site, you should make one, too.)
        </p>
      </header>
      <h2 className="text-xl font-bold">Work</h2>
      <p className="mb-5">
        {/* Currently getting ready to start looking for work in May. */}
        In June I started to work at an awesome company as a full-stack contractor -{' '}
        <a href="https://www.planetargon.com" className="underline" target="_blank">
          Planet Argon
        </a>
        , which is a web development agency in Portland, Oregon.
      </p>
      <h2 className="text-xl font-bold">Life</h2>
      <p className="mb-5">
        Have decided to stick to our nice little apartment in{' '}
        <a href="https://maps.app.goo.gl/fkFzrypNPb9y4RAF8" className="underline" target="_blank">
          Adazi
        </a>{' '}
        and ride out the insane financial markets and overall craziness going on in the world. As soon as things start to show a sign of stability we
        will be on the move.
      </p>
      <h2 className="text-xl font-bold">Doing</h2>
      <p className="mb-10">
        {/* I took a few months off from work to reflect and learn, and currently still continuing to try and stay on the exponential learning curve and
        working on the following things: */}
        Doing lots of work and learning, working on my personal projects, and trying to stay healthy and sane. Also, preparing for a new chapter in my
        life starting around November.
      </p>
      {/* <ul className="mb-10 list-disc ms-5">
        <li>Sharpening all my most essential developer skills</li>
        <li>Self-improvement and health</li>
        <li>Reflecting and deciding the path I want to take further</li>
      </ul> */}
      {/* <p>Last Updated: 23rd April 2024</p> */}
      <p>Last Updated: 31st July 2024</p>
    </section>
  );
}

export default Now;
